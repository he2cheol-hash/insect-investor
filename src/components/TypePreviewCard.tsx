import Link from "next/link";
import type { InsectType } from "@/lib/types";
import { themeCardStyle } from "@/lib/theme";
import { InsectImage } from "./InsectImage";

/** 랜딩 8종 미리보기 카드 (스펙 5장) */
export function TypePreviewCard({ insect }: { insect: InsectType }) {
  return (
    <Link
      href={`/result/${insect.key}`}
      className="flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition-transform hover:-translate-y-0.5"
      style={themeCardStyle(insect.themeColor)}
    >
      <InsectImage insect={insect} responsive />
      <span className="text-sm font-bold">{insect.insect}</span>
      <span className="text-xs opacity-80">{insect.archetype}</span>
    </Link>
  );
}
