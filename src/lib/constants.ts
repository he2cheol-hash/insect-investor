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

/** 8.1 축별 최대 원점수 (정규화 분모) */
export const MAX_RAW: AxisScores = {
  impulse: 16,
  longTerm: 15,
  risk: 12,
  lossAversion: 11,
  crowd: 10,
  research: 9,
};

/**
 * 9.4 동점 우선순위 (해설이 더 또렷한 축 우선).
 * 충동성 > 손실회피 > 장기지향 > 정보탐색 > 위험선호 > 군중민감도
 */
export const DOMINANT_TIE_PRIORITY: Axis[] = [
  "impulse",
  "lossAversion",
  "longTerm",
  "research",
  "risk",
  "crowd",
];

/**
 * 9.3 분기 임계값 — 시작값. 출시 후 분포 보고 튜닝 가능하도록 상수화.
 */
export const THRESHOLDS = {
  /** 손실회피 dominant 시 충동성 ≥ 이 값이면 나비 */
  BUTTERFLY_IMPULSE_MIN: 50,
  /** 정보탐색 dominant 시 장기지향 ≥ 이 값이면 거미 */
  SPIDER_LONGTERM_MIN: 55,
  /** 정보탐색 dominant 시 사마귀 조건: 충동성 ≤ 이 값 */
  MANTIS_IMPULSE_MAX: 40,
  /** 정보탐색 dominant 시 사마귀 조건: 장기지향 ≥ 이 값 */
  MANTIS_LONGTERM_MIN: 40,
  /** 장기지향 dominant 시 정보탐색 ≥ 이 값이면 거미 */
  SPIDER_RESEARCH_MIN: 50,
} as const;

/**
 * 9.5 fallback 좌표 — 축 순서: [위험선호, 충동성, 손실회피, 정보탐색, 장기지향, 군중민감도]
 * (types.ts 의 prototype 과 동일 값. 거리 계산용으로 명시 보관.)
 */
export const PROTOTYPE_AXIS_ORDER: Axis[] = [
  "risk",
  "impulse",
  "lossAversion",
  "research",
  "longTerm",
  "crowd",
];

export const FALLBACK_COORDS: Record<InsectKey, number[]> = {
  firefly: [60, 85, 30, 25, 20, 90],
  grasshopper: [90, 75, 20, 30, 25, 45],
  butterfly: [45, 65, 75, 30, 25, 55],
  dragonfly: [35, 35, 45, 85, 30, 35],
  mantis: [45, 20, 40, 85, 55, 25],
  spider: [45, 30, 40, 60, 80, 30],
  ant: [35, 20, 45, 40, 85, 25],
  pillbug: [15, 25, 85, 40, 45, 30],
};

/**
 * 희귀도(%) — MVP 임시 추정치 (스펙 12장: 실데이터로 교체 예정).
 * 합계 100% 가 되도록 배분.
 */
export const RARITY: Record<InsectKey, number> = {
  firefly: 16,
  grasshopper: 9,
  butterfly: 14,
  dragonfly: 13,
  mantis: 8,
  spider: 11,
  ant: 18,
  pillbug: 11,
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
