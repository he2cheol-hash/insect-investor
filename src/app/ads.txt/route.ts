// AdSense ads.txt — 퍼블리셔 인증(수익 위험 경고 방지).
// NEXT_PUBLIC_ADSENSE_CLIENT 가 설정되면 자동으로 올바른 라인을 출력.
import { ADSENSE_CLIENT } from "@/lib/constants";

export const dynamic = "force-static";

export function GET() {
  const headers = { "content-type": "text/plain; charset=utf-8" };

  if (!ADSENSE_CLIENT) {
    return new Response(
      "# NEXT_PUBLIC_ADSENSE_CLIENT 를 설정하면 ads.txt 가 자동 생성됩니다.\n",
      { headers },
    );
  }

  // "ca-pub-XXXX" → "pub-XXXX"
  const publisherId = ADSENSE_CLIENT.replace(/^ca-/, "");
  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, { headers });
}
