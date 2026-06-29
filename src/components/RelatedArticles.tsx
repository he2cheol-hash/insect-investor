"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

/** 스펙 11장 ⑨ 관련 콘텐츠 — article_click 추적 (재순환 핵심) */
export function RelatedArticles({
  articles,
  type,
}: {
  articles: { title: string; slug: string }[];
  type: string;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {articles.map((a) => (
        <li key={a.slug}>
          <Link
            href={`/articles/${a.slug}`}
            onClick={() =>
              track("article_click", { slug: a.slug, type })
            }
            className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-800 hover:border-stone-400"
          >
            <span>{a.title}</span>
            <span aria-hidden className="text-stone-400">
              ›
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
