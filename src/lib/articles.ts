// 스펙 4·15·18장 — 결과별 교육 콘텐츠(SEO 자산). MVP 스텁.
// 표현 가이드(14장) 준수: 종목/상품/타이밍/수익률 언급 없음, 체크리스트형.
import { INSECT_LIST } from "./types";

export type Article = {
  slug: string;
  title: string;
  intro: string;
  points: string[];
};

export const ARTICLES: Record<string, Article> = {
  "reduce-fomo": {
    slug: "reduce-fomo",
    title: "FOMO 줄이는 법",
    intro:
      "남들 다 버는데 나만 빠진 것 같은 불안(FOMO)은 매수 버튼을 누르게 만드는 가장 흔한 감정입니다. 감정을 없앨 순 없어도, 행동과 분리하는 장치는 만들 수 있어요.",
    points: [
      "관심이 생기면 바로 사지 말고 '관심종목'에만 담아둔다.",
      "최소 24시간 뒤 같은 마음인지 다시 확인한다.",
      "'어제 몰랐어도 오늘 샀을까?'를 스스로에게 묻는다.",
      "급등 뉴스로 산 자산에는 미리 정한 손절 기준을 함께 메모한다.",
    ],
  },
  "news-trading-traps": {
    slug: "news-trading-traps",
    title: "뉴스 트레이딩의 함정",
    intro:
      "뉴스가 떴을 때는 이미 많은 사람이 알고 있는 경우가 많습니다. 정보의 속도보다 중요한 건 내 기준이 흔들리지 않는 것입니다.",
    points: [
      "헤드라인과 실제 사실을 분리해서 읽는 습관을 들인다.",
      "'호재'가 이미 가격에 반영됐을 가능성을 점검한다.",
      "뉴스 기반 매매는 비중과 기간을 미리 제한해둔다.",
    ],
  },
  "position-sizing": {
    slug: "position-sizing",
    title: "비중 관리의 기술",
    intro:
      "큰 베팅이 나쁜 게 아니라, 비중 관리 없는 베팅이 위험합니다. 한 번의 실패가 회복 불가능하지 않게 만드는 것이 핵심입니다.",
    points: [
      "한 자산의 최대 비중 상한을 미리 정한다.",
      "잃어도 일상이 흔들리지 않는 금액만 투입한다.",
      "수익이 났을 때의 익절 기준을 진입 전에 정해둔다.",
    ],
  },
  "truth-about-leverage": {
    slug: "truth-about-leverage",
    title: "레버리지의 진실",
    intro:
      "레버리지는 수익뿐 아니라 손실과 감정의 진폭도 키웁니다. 변동성이 큰 도구일수록 감정 관리가 더 중요합니다.",
    points: [
      "변동성이 커지면 판단력은 떨어진다는 점을 전제한다.",
      "강제 청산 같은 구조적 위험을 먼저 이해한다.",
      "감정이 흔들릴 땐 규칙(자동화)에 결정을 맡긴다.",
    ],
  },
  "stop-emotional-trading": {
    slug: "stop-emotional-trading",
    title: "감정 매매 끊는 법",
    intro:
      "오늘 기분이 매매를 결정하면, 고점에 사고 저점에 파는 패턴이 반복되기 쉽습니다. 감정을 기록하면 패턴이 보입니다.",
    points: [
      "매매할 때의 감정 상태를 짧게라도 함께 기록한다.",
      "충동이 들면 '하루 자고 결정'을 기본 규칙으로 둔다.",
      "규칙 기반(자동 적립 등)으로 결정 횟수를 줄인다.",
    ],
  },
  "investment-journal": {
    slug: "investment-journal",
    title: "투자 일지 쓰는 법",
    intro:
      "투자 일지는 수익률 기록이 아니라 '내 결정의 이유'를 남기는 도구입니다. 같은 실수를 줄이는 가장 싼 방법이에요.",
    points: [
      "왜 샀는지, 무엇을 기대했는지 한 줄로 남긴다.",
      "결과보다 결정 과정의 좋고 나쁨을 평가한다.",
      "주기적으로 다시 읽으며 반복되는 패턴을 찾는다.",
    ],
  },
  "break-analysis-paralysis": {
    slug: "break-analysis-paralysis",
    title: "결정장애 깨는 법",
    intro:
      "완벽한 확신은 거의 오지 않습니다. 분석이 길어질수록 기회비용도 함께 커집니다.",
    points: [
      "'70% 확신이면 소액이라도 실행' 같은 행동 룰을 만든다.",
      "분석에도 마감 시간을 정한다.",
      "적립식으로 결정을 자동화해 미루는 구조를 없앤다.",
    ],
  },
  "power-of-dca": {
    slug: "power-of-dca",
    title: "적립식 투자의 힘",
    intro:
      "적립식은 타이밍을 맞히려는 노력을 줄이고, 꾸준함으로 변동성을 다루는 방식입니다.",
    points: [
      "정해진 날, 정해진 금액을 기계적으로 넣는다.",
      "가격이 떨어진 구간도 매수 기회로 본다.",
      "감정이 개입할 여지를 구조적으로 줄인다.",
    ],
  },
  "discipline-vs-flexibility": {
    slug: "discipline-vs-flexibility",
    title: "원칙 투자 vs 유연성",
    intro:
      "원칙은 강점이지만, 시장이 바뀌었는데도 그대로면 약점이 됩니다. 핵심 원칙은 지키되 일부는 유연하게 둡니다.",
    points: [
      "절대 어기지 않을 핵심 원칙과 조정 가능한 기준을 구분한다.",
      "작은 '탐색 포지션'으로 변화를 시험해본다.",
      "정기적으로 기준 자체를 점검한다.",
    ],
  },
  "rebalancing-guide": {
    slug: "rebalancing-guide",
    title: "리밸런싱 가이드",
    intro:
      "리밸런싱은 비중이 한쪽으로 쏠리는 것을 주기적으로 되돌리는 작업입니다. 감이 아니라 규칙으로 합니다.",
    points: [
      "목표 비중과 허용 오차 범위를 정한다.",
      "오차를 벗어나면 정해진 규칙대로 되돌린다.",
      "주기(예: 연 1~2회)를 정해 자동화한다.",
    ],
  },
  "diversification-done-right": {
    slug: "diversification-done-right",
    title: "분산투자 제대로 하는 법",
    intro:
      "분산은 개수가 아니라 '서로 다르게 움직이는가'의 문제입니다. 너무 잘게 쪼개면 관리가 어려워집니다.",
    points: [
      "성격이 비슷한 자산을 여러 개 담는 건 분산이 아니다.",
      "관리 가능한 개수의 상한을 정한다.",
      "정기 점검으로 분산이 유지되는지 확인한다.",
    ],
  },
  "core-satellite": {
    slug: "core-satellite",
    title: "핵심-위성 전략",
    intro:
      "큰 비중의 안정적인 '핵심'과 작은 비중의 '위성'을 나누면, 안정성과 시도를 함께 가져갈 수 있습니다.",
    points: [
      "핵심은 장기·분산 중심으로 크게 둔다.",
      "위성은 실험적 시도를 작은 비중으로 허용한다.",
      "위성이 커져 핵심을 흔들지 않게 비중을 관리한다.",
    ],
  },
  "power-of-compounding": {
    slug: "power-of-compounding",
    title: "적립식 복리의 힘",
    intro:
      "복리는 시간이 만드는 효과입니다. 화려하지 않지만, 꾸준함이 가장 큰 무기가 됩니다.",
    points: [
      "중간에 멈추지 않는 것이 수익률보다 중요할 때가 많다.",
      "적립액을 소득 증가에 맞춰 천천히 올린다.",
      "비상금을 따로 두어 적립을 깨지 않게 한다.",
    ],
  },
  "rebalancing-timing": {
    slug: "rebalancing-timing",
    title: "리밸런싱 타이밍",
    intro:
      "리밸런싱은 자주 할 필요가 없습니다. 너무 잦으면 비용과 감정이 늘어납니다.",
    points: [
      "달력 기준(주기)과 비중 이탈 기준 중 하나를 정한다.",
      "방치도 위험이므로 최소 점검 주기는 지킨다.",
      "큰 변동 뒤에는 비중이 틀어졌는지 확인한다.",
    ],
  },
  "first-step-guide": {
    slug: "first-step-guide",
    title: "투자 첫걸음 가이드",
    intro:
      "시작이 가장 어렵습니다. 큰 결심보다 아주 작은 실행이 습관을 만듭니다.",
    points: [
      "감당 가능한 아주 작은 금액부터 시작한다.",
      "안전자산 비중을 먼저 정하고 나머지를 분산한다.",
      "손실은 짧은 구간이 아니라 긴 호흡으로 바라본다.",
    ],
  },
  "only-savings": {
    slug: "only-savings",
    title: "예금만 하면 생기는 일",
    intro:
      "예금은 안전하지만, 물가가 오르면 가만히 있어도 구매력이 줄어들 수 있습니다. 회피도 하나의 선택이고 비용이 있습니다.",
    points: [
      "현금의 안정성과 물가의 영향을 함께 본다.",
      "전부 아니면 전무가 아니라, 작은 비중부터 시도한다.",
      "내 위험 감내 수준에 맞는 균형점을 찾는다.",
    ],
  },
};

/** 유형 → 슬러그 역참조 (관련 유형 표시용) */
export const ARTICLE_TO_TYPES: Record<string, string[]> = (() => {
  const map: Record<string, string[]> = {};
  for (const insect of INSECT_LIST) {
    for (const a of insect.relatedArticles) {
      (map[a.slug] ??= []).push(insect.key);
    }
  }
  return map;
})();

export const ARTICLE_SLUGS = Object.keys(ARTICLES);
