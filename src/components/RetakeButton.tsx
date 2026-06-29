"use client";

import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";

/** 스펙 11장 ⑩ 다시하기 */
export function RetakeButton({ type }: { type: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        track("retake_click", { type });
        router.push("/test");
      }}
      className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-100"
    >
      테스트 다시하기
    </button>
  );
}
