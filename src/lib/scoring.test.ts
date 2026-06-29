// 스펙 9.6 검증 — 작업지시서 STEP3 필수 통과 테스트
import { describe, expect, it } from "vitest";
import { MAX_RAW } from "./constants";
import { QUESTIONS } from "./questions";
import { computeRawScores, normalize, score } from "./scoring";
import { AXES } from "./constants";
import type { Answers } from "./scoring";

// 선택지 index: Ⓐ=0, Ⓑ=1, Ⓒ=2 (문항 순서 Q1..Q17)

// 1) 회피형 전부 선택 → 콩벌레(pillbug). 손실회피 dominant, 충동성 < 50.
const PILLBUG_ANSWERS: Answers = [
  0, 1, 0, 0, 2, 1, 0, 1, 0, 1, 0, 1, 2, 0, 2, 1, 2,
];

// 2) 회피 성향 + 충동성 높음(Q5Ⓑ 불타기·Q13Ⓐ 일단 지름) → 나비(butterfly).
const BUTTERFLY_ANSWERS: Answers = [
  0, 1, 1, 0, 1, 1, 0, 2, 0, 0, 1, 1, 0, 0, 2, 0, 2,
];

// 3) Q8Ⓐ(한 번 더 확인)·Q13Ⓑ(재다 놓침) → 잠자리(dragonfly).
//    정보탐색 dominant, 장기지향·실행 낮음.
const DRAGONFLY_ANSWERS: Answers = [
  1, 1, 0, 2, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1,
];

describe("데이터 무결성 (작업지시서 STEP2 검증)", () => {
  it("17문항이다", () => {
    expect(QUESTIONS).toHaveLength(17);
  });

  it("축별 최대 원점수 합이 8.1 표와 일치한다", () => {
    // 각 문항에서 그 축에 줄 수 있는 최대 delta 합 = 이론상 최대 원점수
    const maxPossible = Object.fromEntries(AXES.map((a) => [a, 0])) as Record<
      string,
      number
    >;
    for (const q of QUESTIONS) {
      for (const axis of AXES) {
        const best = Math.max(
          0,
          ...q.choices.map((c) => c.axisDeltas[axis] ?? 0),
        );
        maxPossible[axis] += best;
      }
    }
    expect(maxPossible).toEqual(MAX_RAW);
  });
});

describe("스펙 9.6 채점 검증", () => {
  it("회피형 전부 선택 → 콩벌레", () => {
    const { type, normalized } = score(PILLBUG_ANSWERS);
    expect(type).toBe("pillbug");
    expect(normalized.lossAversion).toBeGreaterThan(90);
    expect(normalized.impulse).toBeLessThan(50);
  });

  it("회피 + 충동성 높음 → 나비", () => {
    const { type, normalized } = score(BUTTERFLY_ANSWERS);
    expect(type).toBe("butterfly");
    expect(normalized.lossAversion).toBeGreaterThanOrEqual(
      normalized.impulse,
    );
    expect(normalized.impulse).toBeGreaterThanOrEqual(50);
  });

  it("Q8Ⓐ+Q13Ⓑ → 잠자리", () => {
    const { type, normalized } = score(DRAGONFLY_ANSWERS);
    expect(type).toBe("dragonfly");
    expect(normalized.research).toBeGreaterThan(normalized.longTerm);
  });
});

describe("정규화 동작 (작업지시서 함정 1·2 방지)", () => {
  it("음수(Q8Ⓑ 충동성 −1)는 0 으로 clamp 된다", () => {
    const answers: Answers = QUESTIONS.map((q) => (q.id === 8 ? 1 : null));
    const raw = computeRawScores(answers);
    expect(raw.impulse).toBe(-1);
    const n = normalize(raw);
    expect(n.impulse).toBe(0);
  });

  it("정규화로 충동성(최대16)이 항상 이기지 않는다", () => {
    // 손실회피만 가득 채우면 충동성이 아니라 손실회피가 dominant
    const answers: Answers = QUESTIONS.map((q) => {
      const idx = q.choices.findIndex((c) => c.axisDeltas.lossAversion);
      return idx >= 0 ? idx : null;
    });
    const { normalized } = score(answers);
    expect(normalized.lossAversion).toBeGreaterThan(normalized.impulse);
  });
});
