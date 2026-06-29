import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INSECTS, INSECT_KEYS, isInsectKey } from "@/lib/types";
import { RARITY } from "@/lib/constants";
import { InsectImage } from "@/components/InsectImage";
import { ShareButtons } from "@/components/ShareButtons";
import { RelatedArticles } from "@/components/RelatedArticles";
import { RetakeButton } from "@/components/RetakeButton";
import { ResultViewTracker } from "@/components/ResultViewTracker";
import { ResultRadar } from "@/components/ResultRadar";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { themeCardStyle } from "@/lib/theme";

type Params = { type: string };

// 8종 SSG (작업지시서 함정 3: 반드시 generateStaticParams)
export function generateStaticParams() {
  return INSECT_KEYS.map((type) => ({ type }));
}

// 정의되지 않은 type 은 404
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { type } = await params;
  if (!isInsectKey(type)) return {};
  const insect = INSECTS[type];
  const title = `투자 성향 테스트 결과 - ${insect.insect}형(${insect.archetype})`;
  const description = `${insect.summary} — ${insect.caption}`;
  const path = `/result/${type}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="mb-2 text-sm font-bold text-stone-400">{title}</h2>
      {children}
    </section>
  );
}

/** 통일된 카드형 목록 — 섹션별로 좌측 액센트 색 + 아이콘으로 구분 */
function PointList({
  items,
  accent,
  icon,
}: {
  items: string[];
  accent: string;
  icon: string;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((it) => (
        <li
          key={it}
          className="flex items-start gap-2.5 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm leading-relaxed text-stone-700 shadow-sm"
          style={{ borderLeftColor: accent, borderLeftWidth: 4 }}
        >
          <span
            aria-hidden
            className="mt-px font-bold leading-none"
            style={{ color: accent }}
          >
            {icon}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

// 섹션별 의미 색 (강점=초록, 주의=앰버). 습관은 유형 테마색 사용.
const STRENGTH_ACCENT = "#059669";
const CAUTION_ACCENT = "#d97706";

export default async function ResultPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { type } = await params;
  if (!isInsectKey(type)) notFound();
  const insect = INSECTS[type];
  const rarity = RARITY[type];

  return (
    <div className="flex flex-1 flex-col">
      <ResultViewTracker type={type} />
      <main className="mx-auto w-full max-w-xl flex-1 px-5 pb-10 pt-6">
        {/* 상단 네비게이션 */}
        <nav className="mb-4 flex items-center justify-between text-xs font-semibold text-stone-500">
          <Link href="/" className="hover:text-stone-800">
            ← 홈
          </Link>
          <Link href="/#types" className="hover:text-stone-800">
            전체 유형 보기
          </Link>
        </nav>

        {/* ① 곤충 이름·캐릭터  ② 자학 한 줄  ③ 요약 */}
        <section
          className="flex flex-col items-center rounded-3xl border p-7 text-center"
          style={themeCardStyle(insect.themeColor)}
        >
          <InsectImage insect={insect} size={224} priority />
          <p className="mt-2 text-xs font-bold opacity-70">
            {insect.archetype}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold">{insect.insect}</h1>
          <p className="mt-4 text-base font-semibold leading-relaxed">
            “{insect.caption}”
          </p>
          <p className="mt-3 text-sm leading-relaxed opacity-90">
            {insect.summary}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {insect.anchorAxes.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/60 px-2.5 py-1 text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* 성향 프로필 — 6축 레이더 (스펙 7장 부가 표시) */}
        <Section title="성향 한눈에 보기">
          <ResultRadar
            type={insect.key}
            insectName={insect.insect}
            prototype={insect.prototype}
            color={insect.themeColor}
          />
        </Section>

        {/* ④ 강점 */}
        <Section title="강점">
          <PointList items={insect.strengths} accent={STRENGTH_ACCENT} icon="✓" />
        </Section>

        {/* ⑤ 주의점 */}
        <Section title="조심하면 좋은 점">
          <PointList items={insect.cautions} accent={CAUTION_ACCENT} icon="!" />
        </Section>

        {/* ⑥ 필요한 습관 */}
        <Section title="나에게 도움이 될 습관">
          <PointList items={insect.habits} accent={insect.themeColor} icon="→" />
        </Section>

        {/* ⑦ 희귀도 */}
        <Section title="희귀도">
          <div className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700">
            전체 응답자 중 약{" "}
            <span className="font-bold text-stone-900">{rarity}%</span> 가 이
            유형이에요.
            <span className="ml-1 text-xs text-stone-400">
              (출시 초기 추정치 · 데이터 쌓이면 자동 갱신)
            </span>
          </div>
        </Section>

        {/* ⑧ 공유 카드 버튼 */}
        <Section title="결과 공유">
          <ShareButtons insect={insect} />
        </Section>

        {/* 광고 — ⑥~⑨ 사이, 콘텐츠를 충분히 본 자연스러운 위치 (스펙 13장) */}
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT} />

        {/* ⑨ 관련 콘텐츠 */}
        <Section title="이어서 보면 좋은 글">
          <RelatedArticles articles={insect.relatedArticles} type={type} />
        </Section>

        {/* ⑩ 다시하기 */}
        <div className="mt-7">
          <RetakeButton type={type} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
