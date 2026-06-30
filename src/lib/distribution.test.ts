// 유형 분포 가드 — 전 응답조합 전수 순회로, 특정 곤충이 과대/과소 표집되지
// 않는지 검증한다. (문항/배점/prototype/표준화 상수를 바꾸면 여기서 깨진다.)
import { describe, expect, it } from "vitest";
import { QUESTIONS } from "./questions";
import { computeRawScores, normalize, determineType } from "./scoring";
import { INSECT_KEYS } from "./types";

function fullDistribution() {
  const counts: Record<string, number> = {};
  for (const k of INSECT_KEYS) counts[k] = 0;
  const nChoices = QUESTIONS.map((q) => q.choices.length);
  const answers = new Array(QUESTIONS.length).fill(0);
  let total = 0;
  function rec(i: number) {
    if (i === QUESTIONS.length) {
      counts[determineType(normalize(computeRawScores(answers)))]++;
      total++;
      return;
    }
    for (let c = 0; c < nChoices[i]; c++) {
      answers[i] = c;
      rec(i + 1);
    }
  }
  rec(0);
  return { counts, total };
}

describe("유형 분포 (전수)", () => {
  it("어떤 유형도 22% 초과 과대표집·4% 미만 과소표집되지 않는다", { timeout: 120000 }, () => {
    const { counts, total } = fullDistribution();
    for (const k of INSECT_KEYS) {
      const share = (counts[k] / total) * 100;
      expect(share, `${k} 비율 ${share.toFixed(1)}%`).toBeGreaterThan(4);
      expect(share, `${k} 비율 ${share.toFixed(1)}%`).toBeLessThan(22);
    }
  });

  it("과거 과대표집 유형(메뚜기·불나방)이 18% 미만이다", { timeout: 120000 }, () => {
    const { counts, total } = fullDistribution();
    expect((counts.grasshopper / total) * 100).toBeLessThan(18);
    expect((counts.firefly / total) * 100).toBeLessThan(18);
  });
});
