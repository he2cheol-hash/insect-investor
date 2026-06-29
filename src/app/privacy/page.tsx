import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${SITE.name}의 개인정보 수집·이용 및 분석 도구 사용에 관한 고지.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-xl flex-1 px-5 pb-10 pt-8">
        <Link href="/" className="text-xs font-semibold text-stone-400">
          ← 홈
        </Link>
        <h1 className="mt-4 text-2xl font-extrabold text-stone-900">
          개인정보처리방침
        </h1>
        <p className="mt-2 text-xs text-stone-400">
          본 방침은 일반 안내이며, 실제 운영 전 전문가 검토를 권장합니다.
        </p>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-stone-700">
          <section>
            <h2 className="mb-1 font-bold text-stone-900">
              1. 수집하는 정보
            </h2>
            <p>
              {SITE.name}는 로그인 없이 익명으로 이용할 수 있으며, 이름·연락처
              등 개인을 식별할 수 있는 정보를 직접 수집하지 않습니다. 테스트
              답변과 결과는 서버에 저장되지 않고, 진행 중 임시 상태는
              브라우저(세션 저장소)에만 보관됩니다.
            </p>
          </section>
          <section>
            <h2 className="mb-1 font-bold text-stone-900">
              2. 분석 도구 (쿠키)
            </h2>
            <p>
              서비스 개선을 위해 Google Analytics 등 분석 도구를 사용할 수
              있으며, 이 과정에서 쿠키 및 익명화된 이용 통계(방문·클릭 등)가
              수집될 수 있습니다. 브라우저 설정에서 쿠키를 거부할 수 있습니다.
            </p>
          </section>
          <section>
            <h2 className="mb-1 font-bold text-stone-900">3. 광고</h2>
            <p>
              본 서비스는 Google AdSense 등 제3자 광고를 게재할 수 있으며,
              제3자는 쿠키를 사용해 관심 기반 광고를 제공할 수 있습니다. 광고
              개인 최적화는 Google 광고 설정에서 관리할 수 있습니다.
            </p>
          </section>
          <section>
            <h2 className="mb-1 font-bold text-stone-900">4. 문의</h2>
            <p>
              개인정보 관련 문의는 서비스 운영자에게 전달할 수 있습니다. 본
              방침은 변경될 수 있으며, 변경 시 본 페이지에 공지합니다.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
