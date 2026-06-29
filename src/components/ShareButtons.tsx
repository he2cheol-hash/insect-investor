"use client";

// 스펙 12장 — 공유: 결과 공유하기(네이티브 공유) 단일 버튼.
// 네이티브 공유 미지원(데스크톱 등)에서는 자동으로 링크 복사로 대체.
import { useState } from "react";
import { track } from "@/lib/analytics";
import type { InsectType } from "@/lib/types";
import { resultUrl, shareText } from "@/lib/share";

export function ShareButtons({ insect }: { insect: InsectType }) {
  const [copied, setCopied] = useState(false);
  const url = resultUrl(insect.key);
  const text = shareText(insect);

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      track("share_click", { method: "native", type: insect.key });
      try {
        await navigator.share({ title: insect.insect, text, url });
      } catch {
        /* 사용자가 취소 */
      }
      return;
    }
    // 네이티브 공유 미지원 → 링크 복사로 대체
    track("share_click", { method: "copy", type: insect.key });
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* 클립보드 차단 환경 */
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleShare}
        className="w-full rounded-full bg-stone-900 px-4 py-3 text-sm font-bold text-white hover:bg-stone-700"
      >
        결과 공유하기
      </button>
      {copied && (
        <p className="mt-2 text-center text-xs text-stone-500">
          링크가 복사됐어요. 붙여넣기로 공유하세요!
        </p>
      )}
    </div>
  );
}
