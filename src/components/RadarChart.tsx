// 의존성 없는 순수 SVG 6축 레이더 차트 (스펙 7장 부가 표시).
// 서버/클라이언트 어디서든 렌더 가능(훅 없음).

export type RadarSeries = {
  /** 축 순서대로 0~100 값 */
  values: number[];
  color: string;
  name: string;
  /** 면 채움 여부 (기본 true) */
  filled?: boolean;
};

const MAX = 100;
const SIZE = 300;
const CX = SIZE / 2;
const CY = 142;
const R = 92;
const RINGS = [0.25, 0.5, 0.75, 1];

function angleFor(i: number, n: number): number {
  return ((-90 + (360 / n) * i) * Math.PI) / 180;
}

function point(i: number, n: number, value: number): [number, number] {
  const a = angleFor(i, n);
  const r = (R * Math.max(0, Math.min(MAX, value))) / MAX;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function polygon(values: number[]): string {
  const n = values.length;
  return values.map((v, i) => point(i, n, v).join(",")).join(" ");
}

export function RadarChart({
  axisLabels,
  series,
  showValues = true,
}: {
  axisLabels: string[];
  series: RadarSeries[];
  /** 각 꼭짓점에 점수 수치 표시 (기본 true) */
  showValues?: boolean;
}) {
  const n = axisLabels.length;

  return (
    <div>
      <svg
        // 좌우로 여백을 둬 '군중민감도' 같은 긴 라벨이 잘리지 않게 함
        viewBox={`-32 0 ${SIZE + 64} 266`}
        width="100%"
        style={{ maxWidth: 360, margin: "0 auto", display: "block" }}
        role="img"
        aria-label="6축 투자 성향 레이더 차트"
      >
        {/* 그리드 링 */}
      {RINGS.map((ring) => (
        <polygon
          key={ring}
          points={polygon(axisLabels.map(() => ring * MAX))}
          fill="none"
          stroke="#e7e5e4"
          strokeWidth={1}
        />
      ))}

      {/* 축 스포크 */}
      {axisLabels.map((_, i) => {
        const [x, y] = point(i, n, MAX);
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={x}
            y2={y}
            stroke="#e7e5e4"
            strokeWidth={1}
          />
        );
      })}

      {/* 데이터 시리즈 (면) */}
      {series.map((s) => (
        <polygon
          key={s.name}
          points={polygon(s.values)}
          fill={s.filled === false ? "none" : s.color}
          fillOpacity={s.filled === false ? 0 : 0.22}
          stroke={s.color}
          strokeWidth={2}
          strokeLinejoin="round"
        />
      ))}

      {/* 꼭짓점 점 + 점수 수치 (나중 시리즈가 위로) */}
      {series.map((s) =>
        s.values.map((v, i) => {
          const [vx, vy] = point(i, n, v);
          const a = angleFor(i, n);
          // 수치 라벨은 꼭짓점에서 축 바깥으로 약간 밀어 겹침을 줄임
          const lx = vx + 11 * Math.cos(a);
          const ly = vy + 11 * Math.sin(a);
          return (
            <g key={`${s.name}-${i}`}>
              <circle cx={vx} cy={vy} r={3} fill={s.color} />
              {showValues && (
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={10}
                  fontWeight={700}
                  fill={s.color}
                  style={{
                    paintOrder: "stroke",
                    stroke: "white",
                    strokeWidth: 3,
                    strokeLinejoin: "round",
                  }}
                >
                  {Math.round(v)}
                </text>
              )}
            </g>
          );
        }),
      )}

      {/* 축 라벨 */}
      {axisLabels.map((label, i) => {
        const a = angleFor(i, n);
        const lx = CX + (R + 18) * Math.cos(a);
        const ly = CY + (R + 18) * Math.sin(a);
        const cos = Math.cos(a);
        const anchor =
          cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
        return (
          <text
            key={label}
            x={lx}
            y={ly}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize={12}
            fontWeight={600}
            fill="#78716c"
          >
            {label}
          </text>
        );
      })}

      </svg>

      {/* 범례 — SVG 밖 HTML 로 분리해 라벨 길이와 무관하게 겹치지 않게 */}
      {series.length > 1 && (
        <div className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-stone-600">
          {series.map((s) => (
            <span key={s.name} className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block h-3 w-3 rounded-sm"
                style={{ backgroundColor: s.color }}
              />
              {s.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
