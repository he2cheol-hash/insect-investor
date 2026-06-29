"use client";

// 스펙 13장 — AdSense 슬롯. CLS 방지를 위해 로드 전에도 동일 높이를 점유.
// ADSENSE_CLIENT 미설정 시 자리만 예약(빈 플레이스홀더)하여 레이아웃 시프트 0.
import { useEffect } from "react";
import { ADSENSE_CLIENT } from "@/lib/constants";

export function AdSlot({
  slot,
  minHeight = 280,
  label = "광고",
}: {
  slot?: string;
  minHeight?: number;
  label?: string;
}) {
  const enabled = Boolean(ADSENSE_CLIENT && slot);

  useEffect(() => {
    if (!enabled) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      /* noop */
    }
  }, [enabled]);

  // 핵심: 슬롯은 항상 동일 높이를 점유 (로드 여부와 무관).
  return (
    <div
      className="my-6 flex w-full items-center justify-center overflow-hidden rounded-lg bg-stone-100 text-xs text-stone-400"
      style={{ minHeight }}
      aria-label="광고 영역"
    >
      {enabled ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: minHeight }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <span>{label} 자리</span>
      )}
    </div>
  );
}
