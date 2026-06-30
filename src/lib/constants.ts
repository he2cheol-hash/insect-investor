// 스펙 8.1(축별 최대 원점수) + 9.3/9.4(임계값·동점) + 9.5(fallback 좌표)

import type { Axis, AxisScores, InsectKey } from "./types";

/** 축 목록 (반복용) */
export const AXES: Axis[] = [
  "risk",
  "impulse",
  "lossAversion",
  "research",
  "longTerm",
  "crowd",
];

/** 축 한글 라벨 (표시용) */
export const AXIS_LABELS: Record<Axis, string> = {
  risk: "위험선호",
  impulse: "충동성",
  lossAversion: "손실회피",
  research: "정보탐색",
  longTerm: "장기지향",
  crowd: "군중민감도",
};

/** 8.1 축별 최대 원점수 (정규화 분모) — 17문항 전부 3지선다 기준 */
export const MAX_RAW: AxisScores = {
  longTerm: 20,
  impulse: 16,
  research: 14,
  risk: 12,
  lossAversion: 12,
  crowd: 10,
};

/** prototype/점수 축 순서: [위험선호, 충동성, 손실회피, 정보탐색, 장기지향, 군중민감도] */
export const PROTOTYPE_AXIS_ORDER: Axis[] = [
  "risk",
  "impulse",
  "lossAversion",
  "research",
  "longTerm",
  "crowd",
];

/**
 * 표준화 기준(축별 평균·표준편차) — 17문항 전 응답조합(약 224만 가지)을
 * 전수 순회해 측정한 정규화 점수 분포값. 채점(9장)은 사용자 점수를 이 값으로
 * z-표준화한 뒤, 8종 곤충 prototype 방향과 가장 일치하는 유형으로 분류한다.
 * 그래서 분모가 작아 잘 튀던 축(정보탐색·군중) 한두 문항이 결과를 좌우하지 않는다.
 * ⚠ 문항/배점을 바꾸면 이 값도 다시 측정해야 한다.
 */
export const AXIS_MEAN: AxisScores = {
  risk: 38.9,
  impulse: 33.4,
  lossAversion: 36.6,
  research: 40.4,
  longTerm: 36.5,
  crowd: 37.2,
};
export const AXIS_STD: AxisScores = {
  risk: 18.1,
  impulse: 15.1,
  lossAversion: 18.1,
  research: 14.2,
  longTerm: 13.4,
  crowd: 19.6,
};

/**
 * 희귀도(%) — 전 응답조합 전수 시뮬레이션의 유형 분포(균등 응답 가정) 기준.
 * 합계 100%. 실제 사용자 데이터가 쌓이면 교체 예정(스펙 12장).
 */
export const RARITY: Record<InsectKey, number> = {
  grasshopper: 13,
  firefly: 13,
  pillbug: 13,
  butterfly: 13,
  mantis: 12,
  ant: 12,
  dragonfly: 12,
  spider: 12,
};

/** 사이트 메타 (SEO/OG/canonical 기준 URL) */
export const SITE = {
  name: "투자 멘탈 곤충 테스트",
  shortName: "곤충 투자 테스트",
  description:
    "2~3분이면 끝나는 투자 성향 테스트. 내 투자 멘탈은 8종 곤충 중 어떤 유형일까? 재미로 보는 투자 행동 자기점검.",
  // 배포 시 환경변수(NEXT_PUBLIC_SITE_URL)로 덮어쓰기. 미설정 시 로컬 기준.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** 테스트 결과(유형+정규화점수)를 결과 페이지 레이더 오버레이용으로 임시 보관 */
export const RESULT_STORAGE_KEY = "insect-test-result";

/** 랜딩 서브카피 (스펙 1장 톤) */
export const SITE_TAGLINE =
  "급등 뉴스에 손이 먼저 가는 사람부터, 분석만 하다 못 사는 사람까지. 가벼운 질문에 답하면 내 투자 행동 성향을 8종 곤충으로 알려드려요.";

/** GA4 측정 ID (스펙 17장). 미설정이면 분석 스크립트 비활성. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** AdSense 퍼블리셔 ID (스펙 13장). 미설정이면 광고 슬롯은 자리만 예약. */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
