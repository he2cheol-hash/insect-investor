import type { Metadata } from "next";
import { INSECT_LIST } from "@/lib/types";
import { SITE_TAGLINE } from "@/lib/constants";
import { QUESTION_COUNT } from "@/lib/questions";
import { TypePreviewCard } from "@/components/TypePreviewCard";
import { StartButton } from "@/components/StartButton";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-xl flex-1 px-5 pb-10 pt-12">
        {/* Hero */}
        <section className="text-center">
          <p className="mb-3 inline-block rounded-full bg-stone-200 px-3 py-1 text-xs font-semibold text-stone-600">
            2~3분 · {QUESTION_COUNT}문항 · 로그인 없음
          </p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-4xl">
            내 투자 멘탈은
            <br />
            어떤 곤충일까?
          </h1>
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            {SITE_TAGLINE}
          </p>
          <div className="mt-7">
            <StartButton />
          </div>
        </section>

        {/* 8종 미리보기 */}
        <section id="types" className="mt-12 scroll-mt-4">
          <h2 className="mb-1 text-center text-sm font-bold text-stone-500">
            8종의 투자 곤충
          </h2>
          <p className="mb-4 text-center text-xs text-stone-400">
            캐릭터를 누르면 유형별 성향·강점·주의점을 미리 볼 수 있어요.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {INSECT_LIST.map((insect) => (
              <TypePreviewCard key={insect.key} insect={insect} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
