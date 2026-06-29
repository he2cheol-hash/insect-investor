// 스펙 12장 + 작업지시서 STEP5 — 결과별 동적 OG 이미지 (곤충 + 유형명 + 자학 한 줄).
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { INSECTS, INSECT_KEYS, isInsectKey } from "@/lib/types";
import type { InsectType } from "@/lib/types";
import { SITE } from "@/lib/constants";
import { pastelHex } from "@/lib/theme";
import { loadKoreanFonts } from "@/lib/og-font";

/** 캐릭터 PNG 를 base64 data URL 로 임베드 (없으면 null → 도형 폴백) */
async function loadCharacter(insect: InsectType): Promise<string | null> {
  try {
    const file = join(process.cwd(), "public", insect.image);
    const buf = await readFile(file);
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export const alt = "투자 멘탈 곤충 테스트 결과 카드";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return INSECT_KEYS.map((type) => ({ type }));
}

export const dynamicParams = false;

export default async function Image({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const insect = isInsectKey(type) ? INSECTS[type] : INSECTS.ant;
  const color = insect.themeColor;

  const text = `${SITE.name}${insect.insect}${insect.archetype}${insect.caption}내 투자 멘탈은`;
  const [fonts, charSrc] = await Promise.all([
    loadKoreanFonts(text),
    loadCharacter(insect),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: pastelHex(color, 14),
          fontFamily: fonts.length ? "Noto Sans KR" : "sans-serif",
        }}
      >
        {/* 상단: 서비스명 */}
        <div style={{ display: "flex", fontSize: 30, color, opacity: 0.8 }}>
          {SITE.name}
        </div>

        {/* 본문 */}
        <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
          {/* 곤충 캐릭터 (이미지, 없으면 도형 폴백) */}
          {charSrc ? (
            // satori(ImageResponse) 안에서는 next/image 불가 — 일반 img 필수
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={charSrc}
              alt=""
              width={340}
              height={340}
              style={{ objectFit: "contain" }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 220,
                height: 220,
                borderRadius: 9999,
                background: "white",
                border: `10px solid ${color}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 120,
                  height: 150,
                  borderRadius: 9999,
                  background: color,
                }}
              />
            </div>
          )}

          {/* 텍스트 */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 34, color, opacity: 0.85 }}>
              내 투자 멘탈은
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 92,
                fontWeight: 700,
                color,
                lineHeight: 1.1,
              }}
            >
              {insect.insect}
            </div>
            <div style={{ display: "flex", fontSize: 40, color, opacity: 0.9 }}>
              {insect.archetype}
            </div>
          </div>
        </div>

        {/* 하단: 자학 한 줄 */}
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 700,
            color: "white",
            background: color,
            borderRadius: 24,
            padding: "24px 32px",
            lineHeight: 1.3,
          }}
        >
          “{insect.caption}”
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length
        ? fonts.map((f) => ({
            name: f.name,
            data: f.data,
            weight: f.weight,
            style: f.style,
          }))
        : undefined,
    },
  );
}
