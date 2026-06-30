// 스펙 9장 — 채점 엔진: 합산 → 정규화 → z-표준화 → prototype 방향 매칭(분류)
import type { AxisScores, InsectKey } from "./types";
import { INSECTS, INSECT_KEYS } from "./types";
import {
  AXES,
  AXIS_MEAN,
  AXIS_STD,
  MAX_RAW,
  PROTOTYPE_AXIS_ORDER,
} from "./constants";
import { QUESTIONS } from "./questions";

/** 답변: 문항 순서대로 선택한 선택지 index (미응답은 null) */
export type Answers = ReadonlyArray<number | null>;

export type ScoreResult = {
  raw: AxisScores;
  normalized: AxisScores;
  type: InsectKey;
};

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export function emptyScores(): AxisScores {
  return {
    risk: 0,
    impulse: 0,
    lossAversion: 0,
    research: 0,
    longTerm: 0,
    crowd: 0,
  };
}

/** 9.1 — 1단계: 원점수 합산 */
export function computeRawScores(answers: Answers): AxisScores {
  const raw = emptyScores();
  QUESTIONS.forEach((q, i) => {
    const choiceIdx = answers[i];
    if (choiceIdx == null) return;
    const choice = q.choices[choiceIdx];
    if (!choice) return;
    for (const axis of AXES) {
      const delta = choice.axisDeltas[axis];
      if (delta) raw[axis] += delta;
    }
  });
  return raw;
}

/** 9.2 — 2단계: 0~100 정규화 (clamp 하한 0 으로 음수 차단) */
export function normalize(raw: AxisScores): AxisScores {
  const n = emptyScores();
  for (const axis of AXES) {
    n[axis] = clamp((raw[axis] / MAX_RAW[axis]) * 100, 0, 100);
  }
  return n;
}

/** 점수 벡터를 축 평균/표준편차로 z-표준화 (축 순서: PROTOTYPE_AXIS_ORDER) */
function standardize(scores: AxisScores): number[] {
  return PROTOTYPE_AXIS_ORDER.map(
    (axis) => (scores[axis] - AXIS_MEAN[axis]) / AXIS_STD[axis],
  );
}

/**
 * 9.3 — 각 곤충 prototype 의 "방향" 단위벡터(표준화 공간).
 * 분류는 사용자 z-벡터와 이 방향의 내적이 가장 큰 유형을 고른다 = 전체 6축
 * 프로필이 어느 유형의 성향과 가장 일치하는가. (한 축이 단독으로 결과를
 * 결정하지 않도록, 모든 prototype 을 동일 크기로 두고 방향만 비교한다.)
 */
const PROTOTYPE_DIRECTIONS: Record<InsectKey, number[]> = (() => {
  const dirs = {} as Record<InsectKey, number[]>;
  for (const key of INSECT_KEYS) {
    const coords = INSECTS[key].prototype;
    const z = PROTOTYPE_AXIS_ORDER.map(
      (axis, i) => (coords[i] - AXIS_MEAN[axis]) / AXIS_STD[axis],
    );
    const mag = Math.sqrt(z.reduce((s, v) => s + v * v, 0)) || 1;
    dirs[key] = z.map((v) => v / mag);
  }
  return dirs;
})();

/** 9.3 — 3단계: 정규화 점수 → 곤충 판정 (표준화 후 prototype 방향 매칭) */
export function determineType(n: AxisScores): InsectKey {
  const z = standardize(n);
  let best: InsectKey = INSECT_KEYS[0];
  let bestScore = -Infinity;
  for (const key of INSECT_KEYS) {
    const dir = PROTOTYPE_DIRECTIONS[key];
    let dot = 0;
    for (let i = 0; i < dir.length; i++) dot += z[i] * dir[i];
    if (dot > bestScore) {
      bestScore = dot;
      best = key;
    }
  }
  return best;
}

/** 전체 채점 파이프라인 */
export function score(answers: Answers): ScoreResult {
  const raw = computeRawScores(answers);
  const normalized = normalize(raw);
  const type = determineType(normalized);
  return { raw, normalized, type };
}
