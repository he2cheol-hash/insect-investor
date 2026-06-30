// 유형 분포 가드 — 무작위 응답 표본으로, 특정 곤충이 과대/과소 표집되지
// 않는지 검증한다. (문항/배점/prototype/표준화 상수를 바꾸면 여기서 깨진다.)
// 17문항 전부 3지선다(3^17≈1.3억 조합)라 전수 대신 몬테카를로 표본을 쓴다.
import { describe, expect, it } from "vitest";
import { QUESTIONS } from "./questions";
import { computeRawScores, normalize, determineType } from "./scoring";
import { INSECT_KEYS } from "./types";

function sampledDistribution(n: number) {
  const counts: Record<string, number> = {};
  for (const k of INSECT_KEYS) counts[k] = 0;
  const nChoices = QUESTIONS.map((q) => q.choices.length);
  // 결정적 LCG (시드 고정 → 테스트 재현성)
  let rng = 13579;
  const rand = () => ((rng = (rng * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  const answers = new Array(QUESTIONS.length).fill(0);
  for (let s = 0; s < n; s++) {
    for (let i = 0; i < answers.length; i++) answers[i] = Math.floor(rand() * nChoices[i]);
    counts[determineType(normalize(computeRawScores(answers)))]++;
  }
  return { counts, total: n };
}

describe("유형 분포 (표본)", () => {
  it("8종이 고르게 분포한다 (각 8~18%)", { timeout: 60000 }, () => {
    const { counts, total } = sampledDistribution(500_000);
    for (const k of INSECT_KEYS) {
      const share = (counts[k] / total) * 100;
      expect(share, `${k} 비율 ${share.toFixed(1)}%`).toBeGreaterThan(8);
      expect(share, `${k} 비율 ${share.toFixed(1)}%`).toBeLessThan(18);
    }
  });

  it("과거 과대표집 유형(메뚜기·불나방)이 16% 미만이다", { timeout: 60000 }, () => {
    const { counts, total } = sampledDistribution(500_000);
    expect((counts.grasshopper / total) * 100).toBeLessThan(16);
    expect((counts.firefly / total) * 100).toBeLessThan(16);
  });
});
