import Link from "next/link";
import { SITE } from "@/lib/constants";
import { Disclaimer } from "./Disclaimer";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-stone-200 bg-stone-50">
      <div className="mx-auto w-full max-w-xl px-5 py-8">
        <Disclaimer />
        <nav className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-500">
          <Link href="/" className="hover:text-stone-800">
            홈
          </Link>
          <Link href="/privacy" className="hover:text-stone-800">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="hover:text-stone-800">
            이용약관·고지
          </Link>
        </nav>
        <p className="mt-4 text-xs text-stone-400">
          © {SITE.name}. 투자 조언이 아닌 재미용 콘텐츠입니다.
        </p>
      </div>
    </footer>
  );
}
