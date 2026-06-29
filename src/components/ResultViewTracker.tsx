"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** 결과 화면 노출 시 result_view 발화 (스펙 17장, 결과 분포 로깅과 함께) */
export function ResultViewTracker({ type }: { type: string }) {
  useEffect(() => {
    track("result_view", { type });
  }, [type]);
  return null;
}
