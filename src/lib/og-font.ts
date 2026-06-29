// OG 이미지용 한글 폰트 로더. Google Fonts에서 필요한 글자만 서브셋으로 받아온다.
// 네트워크 실패 시 빈 배열을 반환해 빌드가 깨지지 않게 한다(라틴 기본 폰트로 폴백).

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
};

export async function loadKoreanFonts(text: string): Promise<OgFont[]> {
  const fonts = await Promise.all([
    fetchGoogleFont("Noto Sans KR", 700, text),
    fetchGoogleFont("Noto Sans KR", 400, text),
  ]);
  return fonts.filter((f): f is OgFont => f !== null);
}

async function fetchGoogleFont(
  family: string,
  weight: 400 | 700,
  text: string,
): Promise<OgFont | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family,
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await fetch(url, {
      headers: {
        // woff2 URL을 받기 위한 최신 UA
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    }).then((r) => r.text());

    const match = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:woff2|woff)'\)/);
    if (!match) return null;
    const data = await fetch(match[1]).then((r) => r.arrayBuffer());
    return { name: family, data, weight, style: "normal" };
  } catch {
    return null;
  }
}
