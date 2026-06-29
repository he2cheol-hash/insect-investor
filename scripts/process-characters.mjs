// 캐릭터 PNG의 투명 여백을 잘라내고(trim) 적정 크기로 리사이즈해
// public/characters/{key}.png 로 저장. (원본 public/image/*.png 은 보존)
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const SRC = "design-source/originals"; // 원본(미서빙). 결과물만 public/characters 로.
const OUT = "public/characters";

// 한글 원본 파일명 → 영문 key
const MAP = {
  "불나방": "firefly",
  "메뚜기": "grasshopper",
  "나비": "butterfly",
  "잠자리": "dragonfly",
  "사마귀": "mantis",
  "거미": "spider",
  "일개미": "ant",
  "콩벌레": "pillbug",
};

await mkdir(OUT, { recursive: true });

for (const [ko, key] of Object.entries(MAP)) {
  const input = join(SRC, `${ko}.png`);
  const output = join(OUT, `${key}.png`);

  // 1) 투명 여백 제거 → 2) 최대 변 720으로 축소 → 3) 가벼운 투명 패딩
  const trimmed = await sharp(input)
    .trim({ threshold: 10 })
    .resize({ width: 720, height: 720, fit: "inside", withoutEnlargement: true })
    .toBuffer({ resolveWithObject: true });

  const pad = Math.round(Math.max(trimmed.info.width, trimmed.info.height) * 0.05);

  await sharp(trimmed.data)
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(output);

  const meta = await sharp(output).metadata();
  console.log(
    `${ko} -> ${key}.png  ${meta.width}x${meta.height}  ${(meta.size / 1024).toFixed(0)}KB`,
  );
}

console.log("done");
