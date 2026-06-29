"use client";

// 결과 페이지 6축 레이더.
// 기본: 이 유형의 prototype 프로필(서버에서 prop으로 전달 → SSG HTML에 포함).
// 오버레이: 방금 테스트한 본인의 정규화 점수가 sessionStorage에 있으면 겹쳐 표시.
import { useEffect, useState } from "react";
import {
  AXIS_LABELS,
  PROTOTYPE_AXIS_ORDER,
  RESULT_STORAGE_KEY,
} from "@/lib/constants";
import type { AxisScores, InsectKey } from "@/lib/types";
import { RadarChart, type RadarSeries } from "./RadarChart";

const AXIS_LABEL_LIST = PROTOTYPE_AXIS_ORDER.map((a) => AXIS_LABELS[a]);

type StoredResult = { type: InsectKey; normalized: AxisScores };

export function ResultRadar({
  type,
  insectName,
  prototype,
  color,
}: {
  type: InsectKey;
  insectName: string;
  prototype: number[];
  color: string;
}) {
  const [userValues, setUserValues] = useState<number[] | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(RESULT_STORAGE_KEY);
      if (!raw) return;
      const stored = JSON.parse(raw) as StoredResult;
      if (stored?.type === type && stored.normalized) {
        // sessionStorage는 mount 후에만 접근 가능(하이드레이션 불일치 방지).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserValues(
          PROTOTYPE_AXIS_ORDER.map((a) => stored.normalized[a] ?? 0),
        );
      }
    } catch {
      /* noop */
    }
  }, [type]);

  const series: RadarSeries[] = [
    { values: prototype, color, name: `${insectName} 유형` },
  ];
  if (userValues) {
    series.push({ values: userValues, color: "#1c1917", name: "나" });
  }

  return (
    <div>
      <RadarChart axisLabels={AXIS_LABEL_LIST} series={series} />
      <p className="mt-1 text-center text-xs text-stone-400">
        {userValues
          ? "내 점수와 이 유형의 전형적 프로필을 비교해 보세요."
          : "이 유형의 전형적인 6축 프로필이에요. 테스트를 마치면 내 점수도 함께 표시돼요."}
      </p>
    </div>
  );
}
