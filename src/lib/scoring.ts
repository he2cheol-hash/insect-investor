// 스펙 9장 — 채점 엔진: 합산 → 정규화 → dominant 판정 → 동점 → fallback
import type { Axis, AxisScores, InsectKey } from "./types";
import {
  AXES,
  DOMINANT_TIE_PRIORITY,
  FALLBACK_COORDS,
  MAX_RAW,
  PROTOTYPE_AXIS_ORDER,
  THRESHOLDS,
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

/**
 * 9.3/9.4 — 최고 축(dominant) 결정.
 * 우선순위 순서로 순회하며 strict `>` 로 갱신 → 동점 시 우선순위 높은 축 채택.
 */
export function dominantAxis(n: AxisScores): Axis {
  let best: Axis = DOMINANT_TIE_PRIORITY[0];
  let bestVal = -Infinity;
  for (const axis of DOMINANT_TIE_PRIORITY) {
    if (n[axis] > bestVal) {
      bestVal = n[axis];
      best = axis;
    }
  }
  return best;
}

/**
 * 충동성 dominant 분기용 — 주어진 후보 축 중 가장 높은 축.
 * 동점은 9.4 우선순위로 끊고, 전부 0이면 null(→ fallback).
 */
function topAmong(n: AxisScores, candidates: Axis[]): Axis | null {
  let best: Axis | null = null;
  let bestVal = 0;
  for (const axis of DOMINANT_TIE_PRIORITY) {
    if (candidates.includes(axis) && n[axis] > bestVal) {
      bestVal = n[axis];
      best = axis;
    }
  }
  return best;
}

/** 9.5 — 거리 기반 fallback (유클리드 최단거리 곤충) */
export function fallbackByDistance(n: AxisScores): InsectKey {
  const user = PROTOTYPE_AXIS_ORDER.map((axis) => n[axis]);
  let bestKey: InsectKey = "ant";
  let bestDist = Infinity;
  for (const key of Object.keys(FALLBACK_COORDS) as InsectKey[]) {
    const coords = FALLBACK_COORDS[key];
    let sum = 0;
    for (let i = 0; i < coords.length; i++) {
      const d = user[i] - coords[i];
      sum += d * d;
    }
    if (sum < bestDist) {
      bestDist = sum;
      bestKey = key;
    }
  }
  return bestKey;
}

/** 9.3 — 3단계: 정규화 점수 → 곤충 판정 */
export function determineType(n: AxisScores): InsectKey {
  const dom = dominantAxis(n);
  switch (dom) {
    case "crowd":
      return "firefly";
    case "risk":
      return "grasshopper";
    case "lossAversion":
      return n.impulse >= THRESHOLDS.BUTTERFLY_IMPULSE_MIN
        ? "butterfly"
        : "pillbug";
    case "research":
      if (n.longTerm >= THRESHOLDS.SPIDER_LONGTERM_MIN) return "spider";
      if (
        n.impulse <= THRESHOLDS.MANTIS_IMPULSE_MAX &&
        n.longTerm >= THRESHOLDS.MANTIS_LONGTERM_MIN
      )
        return "mantis";
      return "dragonfly";
    case "longTerm":
      return n.research >= THRESHOLDS.SPIDER_RESEARCH_MIN ? "spider" : "ant";
    case "impulse": {
      const second = topAmong(n, ["crowd", "risk", "lossAversion"]);
      if (second === "crowd") return "firefly";
      if (second === "risk") return "grasshopper";
      if (second === "lossAversion") return "butterfly";
      return fallbackByDistance(n);
    }
  }
}

/** 전체 채점 파이프라인 */
export function score(answers: Answers): ScoreResult {
  const raw = computeRawScores(answers);
  const normalized = normalize(raw);
  const type = determineType(normalized);
  return { raw, normalized, type };
}
