"use client";

// 스펙 12장 — 공유: 네이티브 공유 / 링크 복사 / (선택)카카오 / 결과 이미지 저장.
import { useState } from "react";
import { track } from "@/lib/analytics";
import type { InsectType } from "@/lib/types";
import { resultUrl, shareText } from "@/lib/share";

declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share?: {
        sendDefault: (settings: unknown) => void;
      };
    };
  }
}

export function ShareButtons({ insect }: { insect: InsectType }) {
  const [copied, setCopied] = useState(false);
  const url = resultUrl(insect.key);
  const text = shareText(insect);
  const ogImage = `${url}/opengraph-image`;

  async function handleNativeShare() {
    track("share_click", { method: "native", type: insect.key });
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: insect.insect, text, url });
      } catch {
        /* 사용자가 취소 */
      }
    } else {
      await handleCopy();
    }
  }

  async function handleCopy() {
    track("share_click", { method: "copy", type: insect.key });
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* 클립보드 차단 환경 */
    }
  }

  function handleKakao() {
    track("share_click", { method: "kakao", type: insect.key });
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_KEY;
    const Kakao = typeof window !== "undefined" ? window.Kakao : undefined;
    if (!kakaoKey || !Kakao?.Share) {
      // SDK 미설정 시 링크 복사로 대체
      handleCopy();
      return;
    }
    if (!Kakao.isInitialized()) Kakao.init(kakaoKey);
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `내 투자 멘탈은 '${insect.insect}'`,
        description: insect.caption,
        imageUrl: ogImage,
        link: { mobileWebUrl: url, webUrl: url },
      },
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={handleNativeShare}
        className="flex-1 rounded-full bg-stone-900 px-4 py-3 text-sm font-bold text-white hover:bg-stone-700"
      >
        결과 공유하기
      </button>
      <button
        type="button"
        onClick={handleKakao}
        className="rounded-full border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-100"
      >
        카카오톡
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-full border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-100"
      >
        {copied ? "복사됨!" : "링크 복사"}
      </button>
      <a
        href={ogImage}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          track("share_click", { method: "image", type: insect.key })
        }
        className="rounded-full border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-100"
      >
        이미지 저장
      </a>
    </div>
  );
}
