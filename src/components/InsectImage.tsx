import Image from "next/image";
import type { InsectType } from "@/lib/types";

/**
 * 곤충 캐릭터 이미지 (public/image). 비율 유지(contain).
 * - 기본: size(px) 고정 정사각 박스
 * - responsive: 부모 폭에 맞춰 정사각으로 꽉 차게 (그리드 카드용)
 */
export function InsectImage({
  insect,
  size = 96,
  responsive = false,
  priority = false,
}: {
  insect: InsectType;
  size?: number;
  responsive?: boolean;
  priority?: boolean;
}) {
  if (responsive) {
    return (
      <div className="relative aspect-square w-full">
        <Image
          src={insect.image}
          alt={`${insect.insect} 캐릭터`}
          fill
          sizes="(max-width: 640px) 42vw, 160px"
          priority={priority}
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size, position: "relative" }}
      className="shrink-0"
    >
      <Image
        src={insect.image}
        alt={`${insect.insect} 캐릭터`}
        fill
        sizes={`${size}px`}
        priority={priority}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
