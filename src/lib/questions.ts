// 스펙 8장 — 17문항 전체 (배점 포함). 음수(Q8-Ⓑ 충동성 −1)까지 정확히.
import type { Axis } from "./types";

export type Choice = {
  /** 캐릭터 보이스 선택지 문구 (스펙 16장) */
  label: string;
  /** 선택 시 축별 가산점 (음수 가능) */
  axisDeltas: Partial<Record<Axis, number>>;
};

export type Question = {
  id: number; // 1..17
  prompt: string;
  choices: Choice[];
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: "내가 산 코인이 하루 만에 -30%. 지금 나는?",
    choices: [
      { label: "손절. 더 빠지기 전에 정리한다", axisDeltas: { lossAversion: 2 } },
      { label: "존버. 언젠간 오겠지", axisDeltas: { longTerm: 1, risk: 1 } },
      {
        label: "물타기. 평단 낮출 기회잖아",
        axisDeltas: { impulse: 2, risk: 1 },
      },
    ],
  },
  {
    id: 2,
    prompt: '친구가 "나 이번에 한 달 만에 50% 벌었어"라고 자랑한다.',
    choices: [
      {
        label: '"헐 뭐 샀어?? 종목 뭐야" (이미 검색창 켬)',
        axisDeltas: { crowd: 2, impulse: 1 },
      },
      {
        label: "부럽긴 한데, 일단 그 종목부터 혼자 파본다",
        axisDeltas: { research: 1 },
      },
      { label: '"오 축하ㅎㅎ" (속으로 내 계좌 보고 조용)', axisDeltas: {} },
    ],
  },
  {
    id: 3,
    prompt: "새로운 종목을 사기 전에 나는?",
    choices: [
      {
        label: "영상·리포트·차트 다 뒤져보고 비교한 뒤 결정",
        axisDeltas: { research: 2 },
      },
      {
        label: "어차피 오래 묻어둘 거, 그나마 덜 망할 놈 골라 야금야금",
        axisDeltas: { research: 1, longTerm: 1 },
      },
      { label: "느낌 오면 일단 소액 사놓고 생각한다", axisDeltas: { impulse: 1 } },
    ],
  },
  {
    id: 4,
    prompt: "갑자기 여윳돈 100만원이 생겼다.",
    choices: [
      { label: "파킹통장·예금에 안전하게", axisDeltas: { lossAversion: 2 } },
      { label: "ETF에 나눠서 천천히 적립", axisDeltas: { longTerm: 2 } },
      {
        label: "요즘 제일 핫한 거에 한 방",
        axisDeltas: { risk: 2, impulse: 1 },
      },
    ],
  },
  {
    id: 5,
    prompt: "내가 산 종목이 +20% 올랐다.",
    choices: [
      {
        label: "더 오를 것 같아 못 팔겠다, 계속 들고 간다",
        axisDeltas: { impulse: 1, risk: 1 },
      },
      {
        label: "불타기! 오르는 데 더 태운다, 가는 놈이 더 간다",
        axisDeltas: { impulse: 2, risk: 2 },
      },
      { label: "목표가 왔으니 계획대로 일부 익절", axisDeltas: { longTerm: 2 } },
    ],
  },
  {
    id: 6,
    prompt: "투자 유튜브·커뮤니티를 보면?",
    choices: [
      { label: "좋다는 거 보면 자꾸 사고 싶어진다", axisDeltas: { crowd: 2 } },
      { label: "참고만 하고 결국 내 기준대로", axisDeltas: { research: 1 } },
      {
        label: "그런 거 끊었다. 나는 묵묵히 적립이나 한다",
        axisDeltas: { longTerm: 1 },
      },
    ],
  },
  {
    id: 7,
    prompt: "손실 난 종목을 볼 때 내 멘탈은?",
    choices: [
      {
        label: "다른 일도 손에 안 잡히고 계속 생각난다",
        axisDeltas: { lossAversion: 2 },
      },
      {
        label: "어디서 꼬였나 혼자 탐정놀이 시작한다",
        axisDeltas: { research: 1 },
      },
      { label: "그러려니, 장기로 보면 된다", axisDeltas: { longTerm: 1 } },
    ],
  },
  {
    id: 8,
    prompt: "투자 결정을 내릴 때 나는?",
    choices: [
      { label: '분석 다 해놓고도 "한 번만 더 확인하자"', axisDeltas: { research: 2 } },
      {
        label: "근거 서면 딱 실행, 그다음은 안 흔들림",
        axisDeltas: { research: 1, impulse: -1 },
      },
      { label: "분석? 그냥 감으로 간다", axisDeltas: { impulse: 2 } },
    ],
  },
  {
    id: 9,
    prompt: "시장이 폭락해서 다들 패닉이다.",
    choices: [
      {
        label: "무서워서 다 정리하거나 손도 못 댄다",
        axisDeltas: { lossAversion: 2 },
      },
      { label: "오히려 싸게 살 기회라고 본다", axisDeltas: { risk: 2 } },
      {
        label: "다들 우는데 나만 못 본 척 적립 버튼 누른다",
        axisDeltas: { longTerm: 2 },
      },
    ],
  },
  {
    id: 10,
    prompt: "내 포트폴리오는?",
    choices: [
      { label: "확신하면 한두 개에 몰빵", axisDeltas: { risk: 2 } },
      { label: "여러 개로 분산, 비중 관리", axisDeltas: { longTerm: 2 } },
      {
        label: "큰 건 깔고 앉고, 자투리로만 사부작사부작 굴린다",
        axisDeltas: { research: 1, longTerm: 1 },
      },
    ],
  },
  {
    id: 11,
    prompt: "매달 투자 루틴이 있다면?",
    choices: [
      { label: "월급날 자동으로 같은 금액 적립", axisDeltas: { longTerm: 2 } },
      {
        label: "가끔 들여다보고 삐뚤어진 비중만 슬쩍 바로잡는다",
        axisDeltas: { research: 1, longTerm: 1 },
      },
      {
        label: "그때그때 분위기 봐서 산다",
        axisDeltas: { impulse: 1, crowd: 1 },
      },
    ],
  },
  {
    id: 12,
    prompt: '"지금 안 사면 평생 못 산다"는 글을 봤다.',
    choices: [
      { label: "어 진짜? 마음이 급해진다", axisDeltas: { crowd: 2, impulse: 1 } },
      {
        label: "저런 글 도배되면 오히려 쫄려서 현금 끌어안는다",
        axisDeltas: { lossAversion: 1 },
      },
      { label: "저런 말 늘 있지, 무시한다", axisDeltas: { research: 1 } },
    ],
  },
  {
    id: 13,
    prompt: "솔직히 내 투자 스타일 한 줄 요약은?",
    choices: [
      { label: "일단 지르고 생각은 나중에", axisDeltas: { impulse: 2, risk: 1 } },
      { label: "재고 또 재다가 타이밍 놓침", axisDeltas: { research: 2 } },
      {
        label: "느리지만 꾸준히, 안 망하는 게 목표",
        axisDeltas: { longTerm: 2 },
      },
    ],
  },
  {
    id: 14,
    prompt: "내 계좌가 파랗게 물든 날, 나는?",
    choices: [
      {
        label: "앱을 지운다. 안 보면 안 떨어진 거다",
        axisDeltas: { lossAversion: 2 },
      },
      {
        label: "1분마다 새로고침하며 같이 떤다",
        axisDeltas: { lossAversion: 1, impulse: 1 },
      },
      {
        label: '장기 그래프 켜놓고 "존버는 승리한다" 주문을 외운다',
        axisDeltas: { longTerm: 1 },
      },
    ],
  },
  {
    id: 15,
    prompt: "카톡 오픈채팅 'OO 종목방'에 초대됐다.",
    choices: [
      {
        label: "바로 입장. 고급 정보 놓치면 안 되지",
        axisDeltas: { crowd: 2, impulse: 1 },
      },
      {
        label: "들어가서 눈팅만, 사는 건 내가 판단",
        axisDeltas: { crowd: 1, research: 1 },
      },
      { label: "이런 거 99% 설거지방이다, 무시", axisDeltas: { research: 1 } },
    ],
  },
  {
    id: 16,
    prompt: "자기 전 마지막으로 하는 행동은?",
    choices: [
      {
        label: "미국장 실시간 보다가 잠든다",
        axisDeltas: { impulse: 1, crowd: 1 },
      },
      {
        label: "오늘 안 산 것, 안 판 것을 곱씹으며 잠든다",
        axisDeltas: { research: 1 },
      },
      { label: "그냥 잔다. 내일 일은 내일의 내가", axisDeltas: { longTerm: 1 } },
    ],
  },
  {
    id: 17,
    prompt: '"분산투자 하세요"라는 조언을 들으면?',
    choices: [
      { label: "맞아, 계란은 한 바구니에 담는 거 아니지", axisDeltas: { longTerm: 2 } },
      {
        label: "분산하면 크게 못 번다, 확신엔 집중이지",
        axisDeltas: { risk: 2 },
      },
      { label: "분산할 돈이... 일단 예금부터", axisDeltas: { lossAversion: 1 } },
    ],
  },
];

export const QUESTION_COUNT = QUESTIONS.length; // 17
