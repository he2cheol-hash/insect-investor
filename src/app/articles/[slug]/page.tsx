import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES, ARTICLE_SLUGS, ARTICLE_TO_TYPES } from "@/lib/articles";
import { INSECTS, isInsectKey } from "@/lib/types";
import { SiteFooter } from "@/components/SiteFooter";

type Params = { slug: string };

export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return {};
  return {
    title: article.title,
    description: article.intro,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.intro,
      url: `/articles/${slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  const relatedTypes = (ARTICLE_TO_TYPES[slug] ?? []).filter(isInsectKey);

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-xl flex-1 px-5 pb-10 pt-8">
        <Link href="/" className="text-xs font-semibold text-stone-400">
          ← 홈
        </Link>
        <article className="mt-4">
          <h1 className="text-2xl font-extrabold leading-snug text-stone-900">
            {article.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-stone-700">
            {article.intro}
          </p>
          <h2 className="mt-7 text-sm font-bold text-stone-400">체크리스트</h2>
          <ul className="mt-2 flex flex-col gap-2">
            {article.points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2.5 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm leading-relaxed text-stone-700 shadow-sm"
              >
                <span aria-hidden className="mt-px font-bold text-stone-400">
                  ✓
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </article>

        {relatedTypes.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-2 text-sm font-bold text-stone-400">
              이 글과 관련된 유형
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedTypes.map((key) => (
                <Link
                  key={key}
                  href={`/result/${key}`}
                  className="rounded-full border px-3 py-1.5 text-xs font-semibold"
                  style={{
                    color: INSECTS[key].themeColor,
                    borderColor: INSECTS[key].themeColor,
                  }}
                >
                  {INSECTS[key].insect}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
