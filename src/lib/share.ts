// 스펙 12장 — 공유 문구/URL 생성
import { SITE } from "./constants";
import type { InsectType } from "./types";

export function resultPath(key: string): string {
  return `/result/${key}`;
}

export function resultUrl(key: string): string {
  return `${SITE.url}${resultPath(key)}`;
}

/** 공유 기본 텍스트 — 자학 한 줄을 메인 카피로 (스펙 12장) */
export function shareText(insect: InsectType): string {
  return `[${SITE.name}] 내 투자 멘탈은 '${insect.insect}(${insect.archetype})'\n"${insect.caption}"`;
}
