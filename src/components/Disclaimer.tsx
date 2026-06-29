// 스펙 14.2 고지 문구 — 결과/푸터 등에 노출
export const DISCLAIMER_LINES = [
  "본 테스트는 재미와 자기이해를 위한 콘텐츠이며, 투자 조언 또는 투자권유가 아닙니다.",
  "특정 금융상품·종목·가상자산·매매 시점·수익률을 추천하지 않습니다.",
  "투자 판단과 책임은 이용자 본인에게 있으며, 모든 투자는 손실 가능성이 있습니다.",
  "로그인 없이 사용하며, 개인 식별 정보는 수집하지 않습니다.",
];

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs leading-relaxed text-stone-500">
        {DISCLAIMER_LINES[0]} {DISCLAIMER_LINES[2]}
      </p>
    );
  }
  return (
    <div className="rounded-xl bg-stone-100 p-4 text-xs leading-relaxed text-stone-500">
      <p className="mb-1 font-semibold text-stone-600">고지</p>
      <ul className="list-disc space-y-1 pl-4">
        {DISCLAIMER_LINES.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
