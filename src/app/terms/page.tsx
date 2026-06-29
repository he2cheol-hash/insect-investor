import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { DISCLAIMER_LINES } from "@/components/Disclaimer";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "이용약관 및 고지",
  description: `${SITE.name}는 투자 조언이 아닌 재미·자기이해용 콘텐츠입니다.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-xl flex-1 px-5 pb-10 pt-8">
        <Link href="/" className="text-xs font-semibold text-stone-400">
          ← 홈
        </Link>
        <h1 className="mt-4 text-2xl font-extrabold text-stone-900">
          이용약관 및 고지
        </h1>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-stone-700">
          <section>
            <h2 className="mb-1 font-bold text-stone-900">
              1. 서비스의 성격
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              {DISCLAIMER_LINES.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="mb-1 font-bold text-stone-900">
              2. 책임의 한계
            </h2>
            <p>
              본 서비스가 제공하는 결과·콘텐츠는 일반적인 자기점검 목적의
              정보이며, 특정인을 위한 투자자문이 아닙니다. 이용자가 본 콘텐츠를
              참고하여 내린 모든 판단과 그 결과에 대한 책임은 이용자 본인에게
              있습니다.
            </p>
          </section>
          <section>
            <h2 className="mb-1 font-bold text-stone-900">3. 저작권</h2>
            <p>
              곤충 캐릭터를 포함한 본 서비스의 콘텐츠는 {SITE.name}의 오리지널
              창작물입니다. 무단 복제·배포를 금합니다.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
