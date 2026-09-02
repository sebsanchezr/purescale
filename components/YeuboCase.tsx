/**
 * The Yeubo case study, rebuilt as the one section on the page that does not
 * look like the rest of the page.
 *
 * Everything else on /trial is dark cards on dark, which is why the page reads
 * as repetitive. This is deliberately inverted: near-white, editorial, and the
 * argument is carried by a chart of the actual daily data rather than by two
 * numbers in boxes. The step change on 28 August is the whole story, and a
 * reader sees it in a second without reading a word.
 *
 * Numbers are the real account, 17 to 31 August 2026, and they are the same
 * numbers in the client's own report: 730.44 spent, 16 purchases.
 */

const DAYS = [
  { d: '17', spend: 24.84, purchases: 0 },
  { d: '18', spend: 45.19, purchases: 0 },
  { d: '19', spend: 37.63, purchases: 0 },
  { d: '20', spend: 65.33, purchases: 1 },
  { d: '21', spend: 58.02, purchases: 0 },
  { d: '22', spend: 35.76, purchases: 0 },
  { d: '23', spend: 30.72, purchases: 0 },
  { d: '24', spend: 78.67, purchases: 0 },
  { d: '25', spend: 73.01, purchases: 1 },
  { d: '26', spend: 43.49, purchases: 0 },
  { d: '27', spend: 29.99, purchases: 1 },
  { d: '28', spend: 67.18, purchases: 8 },
  { d: '29', spend: 26.70, purchases: 0 },
  { d: '30', spend: 65.31, purchases: 2 },
  { d: '31', spend: 48.60, purchases: 3 },
]

// The day the new batch went live. Everything to the left is the old creative.
const BATCH_DAY_INDEX = 10

const MAX = 8
const CHART_W = 760
const CHART_H = 210
const BAR_GAP = 8
const BAR_W = (CHART_W - BAR_GAP * (DAYS.length - 1)) / DAYS.length

export function YeuboCase() {
  return (
    <section className="relative bg-stone-50 px-4 py-24 text-stone-900">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              One account, fifteen days
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl">
              Nothing changed except which creatives were live.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-stone-500">
            Yeubo, a childrens supplement brand. Numbers straight from the ad account, the same
            ones in the report they were sent.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_260px]">
          {/* THE CHART */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-semibold text-stone-900">Purchases per day</p>
              <p className="text-xs text-stone-400">17 to 31 August 2026</p>
            </div>

            <svg
              viewBox={`0 0 ${CHART_W} ${CHART_H + 34}`}
              className="mt-6 w-full"
              role="img"
              aria-label="Daily purchases from 17 to 31 August. Two purchases in the first eleven days, then fourteen in the final four days after a new creative batch went live on 27 August."
            >
              {/* baseline */}
              <line x1="0" y1={CHART_H} x2={CHART_W} y2={CHART_H} stroke="#e7e5e4" strokeWidth="1" />

              {/* the batch marker */}
              <line
                x1={BATCH_DAY_INDEX * (BAR_W + BAR_GAP) - BAR_GAP / 2}
                y1="0"
                x2={BATCH_DAY_INDEX * (BAR_W + BAR_GAP) - BAR_GAP / 2}
                y2={CHART_H}
                stroke="#1d4ed8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text
                x={BATCH_DAY_INDEX * (BAR_W + BAR_GAP) + 4}
                y="14"
                className="fill-blue-700 text-[11px] font-semibold"
              >
                new creatives live
              </text>

              {DAYS.map((day, i) => {
                const h = day.purchases === 0 ? 3 : (day.purchases / MAX) * (CHART_H - 30)
                const x = i * (BAR_W + BAR_GAP)
                const after = i >= BATCH_DAY_INDEX
                return (
                  <g key={day.d}>
                    <rect
                      x={x}
                      y={CHART_H - h}
                      width={BAR_W}
                      height={h}
                      rx="3"
                      fill={after ? '#1d4ed8' : '#d6d3d1'}
                    />
                    {day.purchases > 0 && (
                      <text
                        x={x + BAR_W / 2}
                        y={CHART_H - h - 7}
                        textAnchor="middle"
                        className={`text-[12px] font-bold ${after ? 'fill-blue-700' : 'fill-stone-400'}`}
                      >
                        {day.purchases}
                      </text>
                    )}
                    <text
                      x={x + BAR_W / 2}
                      y={CHART_H + 18}
                      textAnchor="middle"
                      className="fill-stone-400 text-[11px]"
                    >
                      {day.d}
                    </text>
                  </g>
                )
              })}
            </svg>

            <p className="mt-4 border-t border-stone-100 pt-4 text-sm leading-relaxed text-stone-600">
              Same daily budget throughout. No budget change, no targeting change, no new ad set,
              no bid change. The bar on the 28th is the day after a new batch went live.
            </p>
          </div>

          {/* THE NUMBERS */}
          <div className="flex flex-col justify-between gap-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                First 7 days
              </p>
              <p className="mt-2 text-4xl font-extrabold text-stone-400">£297</p>
              <p className="text-sm text-stone-500">per purchase, on 5 video ads</p>
            </div>
            <div className="rounded-2xl border-2 border-blue-700 bg-blue-700 p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                Last 7 days
              </p>
              <p className="mt-2 text-4xl font-extrabold">£20</p>
              <p className="text-sm text-blue-100">per purchase, on 15 creatives</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Fifteen days total
              </p>
              <p className="mt-2 text-4xl font-extrabold text-stone-900">16</p>
              <p className="text-sm text-stone-500">purchases on £730 spent</p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold text-stone-900">
          Two purchases in eleven days. Fourteen in the four days after the new batch landed.
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-stone-500">
          That is not a better audience. That is a bench, shipped weekly, until one of them hits.
        </p>
      </div>
    </section>
  )
}
