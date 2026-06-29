"use client";

import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";

/** 랜딩 시작 버튼 — start_click 발화 후 /test 로 이동 (스펙 5장) */
export function StartButton({
  label = "테스트 시작하기",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        track("start_click");
        router.push("/test");
      }}
      className={
        "inline-flex h-13 items-center justify-center rounded-full bg-stone-900 px-8 text-base font-bold text-white transition-colors hover:bg-stone-700 " +
        className
      }
    >
      {label}
    </button>
  );
}
