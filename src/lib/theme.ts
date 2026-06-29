// 유형별 테마 색 → 파스텔 배경/진한 텍스트 (스펙 6·16장: 라이트/다크 자체 정합)
import type { CSSProperties } from "react";

/** 진한 테마색 위에 얹을 옅은 파스텔 배경 (브라우저 CSS용) */
export function pastel(color: string, amount = 12): string {
  return `color-mix(in srgb, ${color} ${amount}%, white)`;
}

/**
 * 파스텔 배경을 hex 로 직접 계산 (OG 이미지/satori용 — color-mix 미지원).
 * amount: 테마색 비율(%). 나머지는 흰색.
 */
export function pastelHex(color: string, amount = 12): string {
  const hex = color.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const t = amount / 100;
  const mix = (c: number) => Math.round(c * t + 255 * (1 - t));
  const toHex = (c: number) => mix(c).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** 카드용 인라인 스타일: 파스텔 배경 + 테마색 텍스트/보더 */
export function themeCardStyle(color: string): CSSProperties {
  return {
    backgroundColor: pastel(color, 10),
    borderColor: pastel(color, 35),
    color: color,
  };
}

/** 강조 배지/버튼용: 테마색 채움 */
export function themeSolidStyle(color: string): CSSProperties {
  return { backgroundColor: color, color: "white" };
}
