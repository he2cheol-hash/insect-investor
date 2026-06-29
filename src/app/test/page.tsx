"use client";

// 스펙 5장 + 작업지시서 STEP4 — 17문항, 진행률 바, 뒤로가기, 답변 임시저장.
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, QUESTION_COUNT } from "@/lib/questions";
import { score, type Answers } from "@/lib/scoring";
import { track } from "@/lib/analytics";
import { RESULT_STORAGE_KEY } from "@/lib/constants";

const STORAGE_KEY = "insect-test-answers";

export default function TestPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(QUESTION_COUNT).fill(null),
  );
  const [restored, setRestored] = useState(false);

  // 임시저장 복원
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as (number | null)[];
        if (Array.isArray(saved) && saved.length === QUESTION_COUNT) {
          // 임시저장 복원은 mount 후에만 가능(SSR엔 sessionStorage 없음 →
          // useState 초기화로 하면 하이드레이션 불일치). effect 내 복원이 정석.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setAnswers(saved);
          const next = saved.findIndex((a) => a === null);
          setStep(next === -1 ? QUESTION_COUNT - 1 : next);
        }
      }
    } catch {
      /* noop */
    }
    setRestored(true);
  }, []);

  // 답변 변경 시 저장
  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* noop */
    }
  }, [answers, restored]);

  const question = QUESTIONS[step];
  const progress = Math.round((step / QUESTION_COUNT) * 100);

  function selectChoice(choiceIdx: number) {
    const next = [...answers];
    next[step] = choiceIdx;
    setAnswers(next);
    track("question_answered", { question: question.id, choice: choiceIdx });

    if (step < QUESTION_COUNT - 1) {
      setStep(step + 1);
    } else {
      finish(next);
    }
  }

  function finish(finalAnswers: (number | null)[]) {
    const complete = finalAnswers.every((a) => a !== null);
    if (!complete) return;
    const { type, normalized } = score(finalAnswers as Answers);
    track("result_generated", { type });
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      // 결과 페이지 레이더 오버레이용으로 본인 점수 저장
      sessionStorage.setItem(
        RESULT_STORAGE_KEY,
        JSON.stringify({ type, normalized }),
      );
    } catch {
      /* noop */
    }
    router.push(`/result/${type}`);
  }

  function goBack() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-5 py-6">
      {/* 진행률 바 (스펙 5장) — 높이 고정으로 CLS 방지 */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-stone-500">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="disabled:opacity-30"
            aria-label="이전 문항"
          >
            ← 뒤로
          </button>
          <span>
            {step + 1} / {QUESTION_COUNT}
          </span>
          <Link href="/" className="hover:text-stone-800">
            나가기
          </Link>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-stone-900 transition-all duration-300"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
      </div>

      {/* 문항 */}
      <div className="flex flex-1 flex-col">
        <p className="mb-1 text-sm font-bold text-stone-400">Q{question.id}</p>
        <h1 className="mb-6 text-xl font-extrabold leading-snug text-stone-900">
          {question.prompt}
        </h1>

        <div className="flex flex-col gap-3">
          {question.choices.map((choice, idx) => {
            const selected = answers[step] === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => selectChoice(idx)}
                className={
                  "rounded-2xl border-2 px-5 py-4 text-left text-base leading-snug transition-colors " +
                  (selected
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-200 bg-white text-stone-800 hover:border-stone-400")
                }
              >
                {choice.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-stone-400">
        직관적으로, 0.5초 안에 고르세요. 정답은 없어요.
      </p>
    </main>
  );
}
