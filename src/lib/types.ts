// 스펙 7장(6축) + 10장(InsectType 스키마) + 11장(8종 콘텐츠)

/** 6개 점수 축 (스펙 7장) */
export type Axis =
  | "risk" // 위험선호도
  | "impulse" // 충동성
  | "lossAversion" // 손실회피
  | "research" // 정보탐색
  | "longTerm" // 장기지향
  | "crowd"; // 군중민감도

export type AxisScores = Record<Axis, number>;

/** 8종 곤충 key (스펙 4장) */
export type InsectKey =
  | "firefly" // 불나방
  | "grasshopper" // 메뚜기
  | "butterfly" // 나비
  | "dragonfly" // 잠자리
  | "mantis" // 사마귀
  | "spider" // 거미
  | "ant" // 일개미
  | "pillbug"; // 콩벌레

/** 스펙 10장 결과 데이터 구조 */
export type InsectType = {
  key: InsectKey;
  insect: string; // "불나방"
  archetype: string; // "뉴스 추격형"
  image: string; // 캐릭터 이미지 경로 (public/image)
  themeColor: string; // "#993C1D"
  caption: string; // 자학 한 줄(공유 카피)
  summary: string; // 한 줄 요약
  strengths: string[]; // 강점
  cautions: string[]; // 주의점
  habits: string[]; // 나에게 필요한 습관
  relatedArticles: { title: string; slug: string }[]; // 관련 콘텐츠
  anchorAxes: string[]; // 표시용 축 태그
  /** 9.5 좌표 [위험선호, 충동성, 손실회피, 정보탐색, 장기지향, 군중민감도] */
  prototype: number[];
};

/**
 * 8종 유형 데이터 (스펙 6장 메타 + 11장 콘텐츠).
 * prototype 좌표/테마색은 9.5 / 6장 표 그대로.
 */
export const INSECTS: Record<InsectKey, InsectType> = {
  firefly: {
    key: "firefly",
    insect: "불나방",
    archetype: "뉴스 추격형",
    image: "/characters/firefly.png",
    themeColor: "#993C1D",
    caption: "급등 뉴스 뜨면 손이 먼저 갑니다. 정신 차리면 이미 고점이에요.",
    summary: "정보를 빠르게 받아들이지만, 이미 오른 뒤 따라가기 쉽다.",
    strengths: ["시장 흐름·트렌드를 누구보다 빨리 캐치한다."],
    cautions: [
      "고점 매수가 잦다.",
      "뉴스·커뮤니티 분위기에 매매 기준이 흔들린다.",
    ],
    habits: [
      '매수 전 "어제 알았어도 샀을까?" 자문하기',
      "관심종목은 24시간 대기 후 결정하기",
      "뉴스 보고 산 종목엔 손절선 정해두기",
    ],
    relatedArticles: [
      { title: "FOMO 줄이는 법", slug: "reduce-fomo" },
      { title: "뉴스 트레이딩의 함정", slug: "news-trading-traps" },
    ],
    anchorAxes: ["군중민감도↑↑", "충동성↑↑"],
    prototype: [58, 72, 32, 28, 22, 88],
  },
  grasshopper: {
    key: "grasshopper",
    insect: "메뚜기",
    archetype: "한 방 점프형",
    image: "/characters/grasshopper.png",
    themeColor: "#854F0B",
    caption: "한 방이면 인생역전! ...점프 잘못하면 어디 처박히긴 합니다.",
    summary: "큰 수익 기회에 강하게 끌리고, 변동성도 함께 끌어안는다.",
    strengths: ["과감하고, 수익 잠재력이 큰 베팅을 두려워하지 않는다."],
    cautions: [
      "한 번의 실패가 치명적일 수 있다.",
      "비중 관리 없이 몰빵·레버리지로 가기 쉽다.",
    ],
    habits: [
      "한 종목 최대 비중 룰 정하기",
      "잃어도 되는 돈만 투입하기",
      "불타기 전에 익절 기준 먼저 세우기",
    ],
    relatedArticles: [
      { title: "비중 관리의 기술", slug: "position-sizing" },
      { title: "레버리지의 진실", slug: "truth-about-leverage" },
    ],
    anchorAxes: ["위험선호↑↑", "충동성↑"],
    prototype: [88, 70, 22, 30, 28, 42],
  },
  butterfly: {
    key: "butterfly",
    insect: "나비",
    archetype: "기분 매매형",
    image: "/characters/butterfly.png",
    themeColor: "#993556",
    caption: "오늘 기분 따라 삽니다. 차트가 빨가면 제 멘탈도 빨개요.",
    summary: "시장 변화에 민감하지만 감정이 매매를 좌우한다.",
    strengths: ["변화에 유연하게 반응한다."],
    cautions: ["고점에 사고 저점에 파는 패턴.", "일관된 기준이 부족하다."],
    habits: [
      "매매 일지로 감정 기록하기",
      "충동 매수 전 하루 자고 결정하기",
      "자동 적립 등 규칙 기반 매매로 전환하기",
    ],
    relatedArticles: [
      { title: "감정 매매 끊는 법", slug: "stop-emotional-trading" },
      { title: "투자 일지 쓰는 법", slug: "investment-journal" },
    ],
    anchorAxes: ["손실회피↑", "충동성 중(기분 변동)"],
    prototype: [45, 62, 78, 30, 25, 55],
  },
  dragonfly: {
    key: "dragonfly",
    insect: "잠자리",
    archetype: "분석 과몰입형",
    image: "/characters/dragonfly.png",
    themeColor: "#5F5E5A",
    caption:
      "눈이 360도라 다 보입니다. 다 보고, 또 보고... 그래서 아직 안 샀어요.",
    summary: "분석은 완벽한데 실행을 못 해 기회를 놓친다.",
    strengths: ["분석력·정보 수집이 뛰어나고 리스크를 미리 본다."],
    cautions: [
      "완벽을 기다리다 실행을 못 한다.",
      "안 사서 못 번 기회비용이 크다.",
    ],
    habits: [
      '"70% 확신이면 소액이라도 산다" 룰 만들기',
      "분석 마감 시간 정하기",
      "적립식으로 결정 자동화하기",
    ],
    relatedArticles: [
      { title: "결정장애 깨는 법", slug: "break-analysis-paralysis" },
      { title: "적립식 투자의 힘", slug: "power-of-dca" },
    ],
    anchorAxes: ["정보탐색↑↑", "실행 지연(장기지향↓)"],
    prototype: [35, 35, 45, 88, 25, 35],
  },
  mantis: {
    key: "mantis",
    insect: "사마귀",
    archetype: "조용한 저격수",
    image: "/characters/mantis.png",
    themeColor: "#534AB7",
    caption: "근거 없으면 손도 안 댑니다. 덕분에 빠른 기회는 자주 놓쳐요.",
    summary: "근거 기반의 절제된 매매, 한 번 정하면 흔들리지 않는다.",
    strengths: ["원칙이 있고 충동에 흔들리지 않는다."],
    cautions: [
      "기준이 엄격해 빠른 기회를 놓친다.",
      "변화한 시장에 늦게 반응할 수 있다.",
    ],
    habits: [
      "기준 일부는 유연하게 두기",
      '소액 "탐색 포지션" 허용하기',
      "정기 리밸런싱하기",
    ],
    relatedArticles: [
      { title: "원칙 투자 vs 유연성", slug: "discipline-vs-flexibility" },
      { title: "리밸런싱 가이드", slug: "rebalancing-guide" },
    ],
    anchorAxes: ["정보탐색↑↑", "충동성↓↓"],
    prototype: [48, 18, 38, 80, 52, 28],
  },
  spider: {
    key: "spider",
    insect: "거미",
    archetype: "그물 분산형",
    image: "/characters/spider.png",
    themeColor: "#0F6E56",
    caption: "몰빵이요? 전 여기저기 그물 쳐두고 느긋하게 기다립니다.",
    summary: "분산과 계획 유지에 강한 안정형.",
    strengths: ["비중 관리·분산이 탁월하고 계획을 지킨다."],
    cautions: [
      "지나친 분산으로 수익이 밋밋해질 수 있다.",
      "결정이 느릴 수 있다.",
    ],
    habits: ["핵심-위성 전략 쓰기", "분산 개수 상한 설정하기", "정기 점검하기"],
    relatedArticles: [
      { title: "분산투자 제대로 하는 법", slug: "diversification-done-right" },
      { title: "핵심-위성 전략", slug: "core-satellite" },
    ],
    anchorAxes: ["장기지향↑", "정보탐색 중상", "충동성↓"],
    prototype: [45, 28, 38, 60, 88, 30],
  },
  ant: {
    key: "ant",
    insect: "일개미",
    archetype: "뚜벅뚜벅 적립형",
    image: "/characters/ant.png",
    themeColor: "#3B6D11",
    caption: "화려하진 않은데요, 안 망해요. 매달 그냥 삽니다.",
    summary: "꾸준함과 인내로 장기 복리를 누린다.",
    strengths: ["시장 등락에 안 흔들리고 적립을 지속한다."],
    cautions: [
      "너무 보수적이라 기회를 놓칠 수 있다.",
      "점검 없이 방치할 수 있다.",
    ],
    habits: ["연 1~2회 리밸런싱하기", "적립액 정기 상향하기", "비상금 분리하기"],
    relatedArticles: [
      { title: "적립식 복리의 힘", slug: "power-of-compounding" },
      { title: "리밸런싱 타이밍", slug: "rebalancing-timing" },
    ],
    anchorAxes: ["장기지향↑↑", "충동성↓"],
    prototype: [32, 20, 48, 35, 82, 25],
  },
  pillbug: {
    key: "pillbug",
    insect: "콩벌레",
    archetype: "현금 방어형",
    image: "/characters/pillbug.png",
    themeColor: "#185FA5",
    caption: "위험하면 일단 몸을 맙니다. 제 돈은 예금에서 잘 자고 있어요.",
    summary: "손실을 잘 안 보지만, 투자 시작 자체가 어렵다.",
    strengths: ["리스크 관리 본능이 강하고 위기에 안전하다."],
    cautions: [
      "과도한 회피로 투자를 못 시작한다.",
      "인플레이션에 자산가치가 깎인다.",
    ],
    habits: [
      "아주 작은 금액부터 시작하기",
      "안전자산 비중 정한 뒤 나머지 분산하기",
      "손실은 장기 관점에서 보기",
    ],
    relatedArticles: [
      { title: "투자 첫걸음 가이드", slug: "first-step-guide" },
      { title: "예금만 하면 생기는 일", slug: "only-savings" },
    ],
    anchorAxes: ["손실회피↑↑", "위험선호↓↓"],
    prototype: [15, 25, 88, 40, 48, 28],
  },
};

export const INSECT_LIST: InsectType[] = [
  INSECTS.firefly,
  INSECTS.grasshopper,
  INSECTS.butterfly,
  INSECTS.dragonfly,
  INSECTS.mantis,
  INSECTS.spider,
  INSECTS.ant,
  INSECTS.pillbug,
];

export const INSECT_KEYS = Object.keys(INSECTS) as InsectKey[];

export function isInsectKey(value: string): value is InsectKey {
  return value in INSECTS;
}
