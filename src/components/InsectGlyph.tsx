// MVP 단순 SVG 글리프 (스펙 6장: 오리지널 디자인, 추후 일러스트 업그레이드).
// 테마색으로 채색되는 곤충 실루엣. 날개 유무로 유형군을 구분.
import type { InsectKey } from "@/lib/types";

const WINGED: InsectKey[] = ["firefly", "butterfly", "dragonfly"];
const SLENDER: InsectKey[] = ["mantis", "grasshopper", "dragonfly"];

export function InsectGlyph({
  insectKey,
  color,
  size = 96,
  title,
}: {
  insectKey: InsectKey;
  color: string;
  size?: number;
  title?: string;
}) {
  const winged = WINGED.includes(insectKey);
  const slender = SLENDER.includes(insectKey);
  const bodyRy = slender ? 26 : 20;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title ? `${title} 곤충` : "곤충"}
      style={{ color }}
    >
      {title ? <title>{title}</title> : null}
      {/* 날개 */}
      {winged && (
        <g fill="currentColor" opacity={0.28}>
          <ellipse cx="30" cy="46" rx="20" ry="26" />
          <ellipse cx="70" cy="46" rx="20" ry="26" />
        </g>
      )}
      {/* 더듬이 */}
      <g
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      >
        <path d="M44 26 C40 14, 32 12, 28 16" />
        <path d="M56 26 C60 14, 68 12, 72 16" />
      </g>
      {/* 몸통 */}
      <ellipse cx="50" cy="52" rx="14" ry={bodyRy} fill="currentColor" />
      {/* 마디 (분절) */}
      <g stroke="white" strokeWidth={2} opacity={0.6}>
        <line x1="38" y1="48" x2="62" y2="48" />
        <line x1="38" y1="60" x2="62" y2="60" />
      </g>
      {/* 머리 */}
      <circle cx="50" cy="30" r="11" fill="currentColor" />
      {/* 눈 */}
      <g fill="white">
        <circle cx="46" cy="29" r="2.4" />
        <circle cx="54" cy="29" r="2.4" />
      </g>
    </svg>
  );
}
