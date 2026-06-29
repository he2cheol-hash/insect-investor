// 스펙 17장 — GA4 이벤트 측정 헬퍼

export type AnalyticsEvent =
  | "start_click"
  | "question_answered"
  | "result_generated"
  | "result_view"
  | "share_click"
  | "article_click"
  | "retake_click";

type Params = Record<string, string | number | boolean | undefined>;

/**
 * GA4 이벤트 전송. gtag 미로딩/SSR 환경에서는 조용히 무시.
 * 결과 분포 로깅(result_generated 의 type 파라미터)도 이 경로로 수집.
 */
export function track(event: AnalyticsEvent, params?: Params): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (command: string, event: string, params?: Params) => void;
  };
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params);
  } else if (process.env.NODE_ENV !== "production") {
    // 개발 중에는 콘솔로 발화 확인
    console.debug("[analytics]", event, params ?? {});
  }
}
