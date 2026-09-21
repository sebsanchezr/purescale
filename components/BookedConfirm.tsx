'use client'

// The page a prospect lands on the second Cal.com confirms a PureScale
// booking. It is the same machine as augustmarketing.co.uk/booked, in
// PureScale's own clothes, because the two brands share a diary and a founder
// and nothing else.
//
// Cal.com must be set to "redirect on booking" with forward parameters on, so
// the URL carries attendeeFirstName, email, attendeeStartTime, endTime and
// uid. Every one is optional: the page reads what it can and still says
// something true with none of them, because people also open it from the
// emails and from a bookmark.
//
// Two audiences, one page. Buyers spending one of the CEO calls included with
// their order arrive with ?type=buyer; everyone else is a first conversation.
// The difference is the framing at the top and the agenda, not the machinery.

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const REPLY_TO = 'seb@purescale.co'
// Paste a Loom or YouTube URL to turn the section into a video; until then the
// same argument runs in writing rather than a "coming soon" box.
const VIDEO_URL = process.env.NEXT_PUBLIC_BOOKED_VIDEO_URL ?? ''
const OS_URL = process.env.NEXT_PUBLIC_OS_URL ?? 'https://augustmarketing.vercel.app'

type BookedView = {
  firstName: string | null
  email: string | null
  weekday: string | null
  dayMonth: string | null
  clock: string | null
  tz: string | null
  minutes: number
  start: Date | null
  uid: string | null
  google: string | null
  ics: string | null
  reschedule: string | null
  mailto: string
  rescheduled: boolean
  buyer: boolean
}

function firstNameOf(name: string | null): string | null {
  if (!name) return null
  const clean = name.trim().split(/\s+/)[0]
  if (!clean) return null
  return clean.charAt(0).toUpperCase() + clean.slice(1)
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function utcStamp(d: Date) {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`
}

function untilPhrase(start: Date, now: number): string {
  const ms = start.getTime() - now
  if (ms <= 0) return 'now'
  const mins = Math.round(ms / 60000)
  if (mins < 60) return `in ${mins} minute${mins === 1 ? '' : 's'}`
  const hours = Math.round(mins / 60)
  if (hours < 36) return `in ${hours} hour${hours === 1 ? '' : 's'}`
  const days = Math.round(hours / 24)
  return `in ${days} day${days === 1 ? '' : 's'}`
}

export function BookedConfirm() {
  const params = useSearchParams()

  const view: BookedView = useMemo(() => {
    const name = params.get('attendeeFirstName') || params.get('attendeeName') || params.get('name')
    const firstName = firstNameOf(name)
    const email = params.get('email')
    const uid = params.get('uid')
    const startRaw = params.get('attendeeStartTime') || params.get('startTime')
    const endRaw = params.get('endTime')
    const rescheduled = params.get('rescheduled') === 'true' || Boolean(params.get('formerTime'))
    const buyer = params.get('type') === 'buyer'

    const start = startRaw ? new Date(startRaw) : null
    const validStart = start && !Number.isNaN(start.getTime()) ? start : null
    const end = endRaw ? new Date(endRaw) : null
    const validEnd = end && !Number.isNaN(end.getTime()) ? end : null
    const minutes =
      validStart && validEnd ? Math.max(15, Math.round((validEnd.getTime() - validStart.getTime()) / 60000)) : 40

    let weekday: string | null = null
    let dayMonth: string | null = null
    let clock: string | null = null
    let tz: string | null = null
    if (validStart) {
      const fmt = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZoneName: 'short',
      })
      const parts = fmt.formatToParts(validStart)
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
      weekday = get('weekday')
      dayMonth = `${get('day')} ${get('month')}`
      clock = `${get('hour')}:${get('minute')}`
      tz = get('timeZoneName') || null
    }

    const endForCal = validEnd ?? (validStart ? new Date(validStart.getTime() + minutes * 60000) : null)
    const title = 'PureScale: your call with Seb'
    const detail =
      'Working session on your account. Have Ads Manager open. Reply to the confirmation email if you need to move it.'
    const google =
      validStart && endForCal
        ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${utcStamp(validStart)}/${utcStamp(endForCal)}&details=${encodeURIComponent(detail)}`
        : null
    const ics =
      validStart && endForCal
        ? `data:text/calendar;charset=utf-8,${encodeURIComponent(
            [
              'BEGIN:VCALENDAR',
              'VERSION:2.0',
              'PRODID:-//PureScale//Booked//EN',
              'BEGIN:VEVENT',
              `UID:${uid ?? utcStamp(validStart)}@purescale.co`,
              `DTSTAMP:${utcStamp(new Date())}`,
              `DTSTART:${utcStamp(validStart)}`,
              `DTEND:${utcStamp(endForCal)}`,
              `SUMMARY:${title}`,
              `DESCRIPTION:${detail}`,
              'END:VEVENT',
              'END:VCALENDAR',
            ].join('\r\n'),
          )}`
        : null

    const reschedule = uid ? `https://cal.com/reschedule/${uid}` : null
    const mailto = `mailto:${REPLY_TO}?subject=${encodeURIComponent('Before our call')}&body=${encodeURIComponent(
      'Store URL: \nMonthly ad spend: \nWhat we are trying to fix: \n',
    )}`

    return {
      firstName,
      email,
      weekday,
      dayMonth,
      clock,
      tz,
      minutes,
      start: validStart,
      uid,
      google,
      ics,
      reschedule,
      mailto,
      rescheduled,
      buyer,
    }
  }, [params])

  return (
    <>
      <Hero view={view} />
      <DoNow view={view} />
      <Method />
      <Agenda minutes={view.minutes} buyer={view.buyer} />
      <Proof />
      <Emails buyer={view.buyer} />
      <Host />
      <Faq />
      <StickyBar view={view} />
    </>
  )
}

/* ── Furniture ─────────────────────────────────────────────────────────────
   One narrow column, one type scale, and no two neighbouring sections built
   from the same object. The previous version was six stacked copies of the
   same glass card, which is why it read as one undifferentiated page. */

function Section({
  eyebrow,
  title,
  lead,
  children,
  tint = false,
}: {
  eyebrow: string
  title?: string
  lead?: string
  children: React.ReactNode
  tint?: boolean
}) {
  return (
    <section className={tint ? 'border-y border-white/10 bg-black/30' : ''}>
      <div className="mx-auto max-w-2xl px-5 py-14 sm:py-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300">{eyebrow}</p>
        {title ? <h2 className="mt-4 text-[22px] font-bold leading-tight text-white sm:text-[26px]">{title}</h2> : null}
        {lead ? <p className="mt-3 text-[15px] leading-relaxed text-gray-400">{lead}</p> : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

/* ── 1. Confirmation and the ticket ────────────────────────────────────── */

function Hero({ view }: { view: BookedView }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="mx-auto max-w-2xl px-5 pt-20 sm:pt-24">
      <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] px-3.5 py-1.5">
        <span aria-hidden className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
          {view.rescheduled ? 'Call moved' : 'Call confirmed'}
        </span>
      </div>

      <h1 className="mt-6 text-[34px] font-bold leading-[1.05] text-white sm:text-[44px]">
        You&apos;re{' '}
        <span className="font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          booked in
        </span>
        {view.firstName ? <>, {view.firstName}</> : null}.
      </h1>

      <p className="mt-4 text-[15px] leading-relaxed text-gray-400">
        {view.minutes} minutes with Seb Sanchez, founder of PureScale.
        {view.buyer ? ' This is one of the two calls included with your order.' : ''} The calendar invite
        {view.email ? (
          <>
            {' '}
            is on its way to <span className="text-white">{view.email}</span>
          </>
        ) : (
          ' is on its way to your inbox'
        )}
        . Not there in five minutes, check spam and drag it out, or every email after it lands there too.
      </p>

      <div className="mt-9 overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.09] via-white/[0.03] to-transparent">
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          {view.clock ? (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">{view.weekday}</div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-[40px] font-bold leading-none text-white sm:text-[48px]">{view.clock}</span>
                <span className="text-sm font-semibold text-white/80">{view.dayMonth}</span>
              </div>
              <div className="mt-2 text-[13px] text-gray-400">
                {view.tz ? `${view.tz}, your local time` : 'Your local time'} &middot; {view.minutes} minutes
                {view.start ? <> &middot; {untilPhrase(view.start, now)}</> : null}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">Your slot</div>
              <div className="mt-2 text-[26px] font-bold leading-tight text-white">It is in the calendar invite</div>
              <div className="mt-2 text-[13px] text-gray-400">{view.minutes} minutes with Seb</div>
            </div>
          )}

          <div className="flex shrink-0 flex-col gap-2 sm:items-end">
            {view.google ? (
              <a
                href={view.google}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-2.5 text-center text-[12px] font-bold text-white transition-opacity hover:opacity-90"
              >
                Add to Google Calendar
              </a>
            ) : null}
            <div className="flex gap-2">
              {view.ics ? (
                <a
                  href={view.ics}
                  download="purescale-call.ics"
                  className="rounded-lg border border-white/15 px-4 py-2 text-[11px] font-semibold text-white/80 transition-colors hover:border-cyan-400/40 hover:text-white"
                >
                  Apple / Outlook
                </a>
              ) : null}
              {view.reschedule ? (
                <a
                  href={view.reschedule}
                  className="rounded-lg border border-white/15 px-4 py-2 text-[11px] font-semibold text-gray-400 transition-colors hover:border-cyan-400/40 hover:text-white"
                >
                  Move it
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <ConfirmStrip uid={view.uid} />
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-gray-500">
        A moved call is fine. A missed one is not: we pull your account and your competitors&apos; creative before we
        speak, and it is done for this slot.
      </p>
    </section>
  )
}

/* ── The one-click commitment ──────────────────────────────────────────────
   Posts the Cal booking uid to the OS, which stamps the call as confirmed.
   The single cheapest thing on this page: one small action after booking is
   the strongest predictor that someone turns up. */

type ConfirmState = 'idle' | 'sending' | 'done' | 'error'

function ConfirmStrip({ uid }: { uid: string | null }) {
  const [state, setState] = useState<ConfirmState>('idle')

  useEffect(() => {
    if (!uid) return
    try {
      if (window.localStorage.getItem(`purescale.confirmed.${uid}`)) setState('done')
    } catch {
      /* private mode: asking twice is harmless */
    }
  }, [uid])

  const confirm = useCallback(async () => {
    if (!uid || state === 'sending' || state === 'done') return
    setState('sending')
    try {
      const res = await fetch(`${OS_URL}/api/public/call-confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, source: 'purescale_thankyou' }),
      })
      if (!res.ok) throw new Error(String(res.status))
      try {
        window.localStorage.setItem(`purescale.confirmed.${uid}`, '1')
      } catch {
        /* nothing depends on this */
      }
      setState('done')
    } catch {
      setState('error')
    }
  }, [uid, state])

  if (!uid) return null

  // Never colour alone: every state carries a word, a shape and a border.
  if (state === 'done') {
    return (
      <div className="flex items-center gap-3 border-t border-cyan-400/20 bg-cyan-400/[0.07] px-6 py-4 sm:px-7">
        <span
          aria-hidden
          className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-[11px] font-bold text-white"
        >
          &#10003;
        </span>
        <p className="text-[13px] text-white">Confirmed. Seb knows you are coming and the prep starts on this slot.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 border-t border-white/10 bg-black/40 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
      <p className="text-[13px] text-gray-400">
        {state === 'error'
          ? 'That did not go through. Reply to the confirmation email instead and it counts the same.'
          : 'One tap, so we prepare the account rather than just hold the slot.'}
      </p>
      <button
        type="button"
        onClick={confirm}
        disabled={state === 'sending'}
        className="shrink-0 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-[11px] font-bold text-cyan-300 transition-colors hover:bg-cyan-400/20 disabled:opacity-50"
      >
        {state === 'sending' ? 'Confirming' : state === 'error' ? 'Try again' : 'Confirm I will be there'}
      </button>
    </div>
  )
}

/* ── 2. Three things now ───────────────────────────────────────────────── */

function DoNow({ view }: { view: BookedView }) {
  return (
    <Section
      eyebrow="Do these now"
      title="Three things, about four minutes"
      lead="The first one matters more than the other two put together."
    >
      <ol className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <li className="p-6">
          <div className="flex gap-5">
            <span className="shrink-0 font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-2xl font-bold text-transparent">
              01
            </span>
            <div>
              <h3 className="text-base font-bold text-white">Reply with two lines</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-400">
                Your store URL and your rough monthly ad spend. That is what the pre-call research is built on, and it is
                the difference between a call about your brand and a call about brands in general.
              </p>
              <a
                href={view.mailto}
                className="mt-4 inline-flex rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-2.5 text-[12px] font-bold text-white transition-opacity hover:opacity-90"
              >
                Send the two lines
              </a>
            </div>
          </div>
        </li>
        <li className="p-6">
          <div className="flex gap-5">
            <span className="shrink-0 text-2xl font-bold text-white/20">02</span>
            <div>
              <h3 className="text-base font-bold text-white">
                {VIDEO_URL ? 'Watch the four minutes below' : 'Read the method below'}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-400">
                How the production model works and what the call is. Once through and the call starts at minute ten
                instead of minute one.
              </p>
            </div>
          </div>
        </li>
        <li className="p-6">
          <div className="flex gap-5">
            <span className="shrink-0 text-2xl font-bold text-white/20">03</span>
            <div>
              <h3 className="text-base font-bold text-white">Have Ads Manager open on the day</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-400">
                Last 90 days, all campaigns. Spend, return, and how many new creatives went live last month. Rough
                numbers beat clean ones.
              </p>
            </div>
          </div>
        </li>
      </ol>
    </Section>
  )
}

/* ── 3. Method ─────────────────────────────────────────────────────────── */

function Method() {
  return (
    <Section eyebrow="Before we speak" title="Why creative is the ceiling, in ninety seconds" tint>
      {VIDEO_URL ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={VIDEO_URL}
              title="Watch this before our call"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-[15px] leading-relaxed text-gray-400">
          <p>
            Most brands that plateau are not held back by the product or by targeting. They are held back by how fast
            they can put a genuinely new idea in front of the algorithm. Two or three new creatives a month cannot feed a
            testing structure, so spend concentrates on winners that are already fatiguing and the return slides quietly
            for weeks before anyone calls it.
          </p>
          <p>
            The fix is boring and it is volume. One consolidated structure, a fixed budget, and a steady supply of new
            angles going in every week, killed by rule when they have spent past the threshold with nothing to show.
          </p>
          <p className="text-white">
            Creative is the targeting now. That is why the call is about what you are showing people, not who you are
            showing it to.
          </p>
        </div>
      )}

      <figure className="mt-8 border-l-2 border-cyan-400 pl-5 sm:pl-6">
        <blockquote className="text-[17px] leading-relaxed text-white">
          Revice Denim. $9M to $26M, with spend going from $10k to $250k a month and the return holding the whole way.
        </blockquote>
        <figcaption className="mt-3 text-[13px] text-gray-500">
          Two and a half year partnership. Ask to see the account on the call.
        </figcaption>
      </figure>
    </Section>
  )
}

/* ── 4. Agenda ─────────────────────────────────────────────────────────── */

function Agenda({ minutes, buyer }: { minutes: number; buyer: boolean }) {
  // Buyers already bought. Spending their call selling them the thing they
  // have paid for is the fastest way to waste it, so the last part changes.
  const rows: [string, string, string][] = [
    ['First third', 'Where it is leaking', 'Fatigue signals, creative cadence, and what the last 90 days actually returned.'],
    [
      'Second third',
      'The production plan',
      'Volumes, formats, angles and the testing structure that reads them. Specific to your margins, not a template.',
    ],
    buyer
      ? ['Last third', 'Your batch', 'What we build first, in what order, and how you run it once it lands.']
      : [
          'Last third',
          'The decision',
          'Whether working together makes sense and what it would cost. Yes, no and not yet are all fine answers.',
        ],
  ]

  return (
    <Section
      eyebrow="What we will actually do"
      title={`${minutes} minutes, three parts, no deck`}
      lead="It is a working session. Nobody is going to read you a slide about our values."
    >
      <ol className="space-y-3">
        {rows.map(([slot, name, body]) => (
          <li
            key={slot}
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:gap-5"
          >
            <span className="h-fit w-fit shrink-0 rounded-md border border-cyan-400/20 bg-cyan-400/[0.08] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-300">
              {slot}
            </span>
            <div>
              <h3 className="text-[15px] font-bold text-white">{name}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-gray-400">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/* ── 5. Proof ──────────────────────────────────────────────────────────── */

const RESULTS: [string, string, string][] = [
  ['Revice Denim', '$9M to $26M', '2.5 years'],
  ["L'Alingi", '5x ROAS, two markets', '2+ years'],
  ['Go Forth Goods', '£95k to £240k months', '3 years'],
  ['Posh MIA', '0.7x to 3.2x ROAS', '3 months'],
]

function Proof() {
  return (
    <Section
      eyebrow="Brands like yours"
      title="Every one of these was a creative problem first"
      lead="Same model each time: one structure, a lot of tested creative, nobody moving budget by hand."
    >
      <dl className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
        {RESULTS.map(([brand, result, time]) => (
          <div key={brand} className="flex items-baseline justify-between gap-4 px-5 py-4">
            <dt className="text-[13px] font-bold uppercase tracking-[0.1em] text-white/70">{brand}</dt>
            <dd className="text-right">
              <span className="font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-[15px] font-bold text-transparent">
                {result}
              </span>
              <span className="ml-3 text-[12px] text-gray-500">{time}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

/* ── 6. The emails ─────────────────────────────────────────────────────── */

function Emails({ buyer }: { buyer: boolean }) {
  const rows: [string, string][] = [
    ['Today', 'What we found on your account, first pass: live ad count, traffic trend, the fatigue signals.'],
    ['Tomorrow', 'The production model in one example, and the numbers it produced.'],
    ['Day before', 'The three questions Seb will ask, so you can have the answers ready.'],
    ['Morning of', 'The link, the time, and the one tab to have open.'],
  ]
  return (
    <Section
      eyebrow="Between now and the call"
      title="A few short emails from Seb. None of them are reminders."
      lead={`Each is under two minutes to read and each makes the call shorter. They come from ${REPLY_TO}, and replying reaches Seb directly.`}
      tint
    >
      <ol className="relative space-y-6 border-l border-white/10 pl-6">
        {rows.map(([when, what]) => (
          <li key={when} className="relative">
            <span aria-hidden className="absolute -left-[26px] top-1.5 h-2 w-2 rounded-full bg-cyan-400" />
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">{when}</div>
            <p className="mt-1.5 text-[14px] leading-relaxed text-gray-400">{what}</p>
          </li>
        ))}
      </ol>
      {buyer ? (
        <p className="mt-6 text-[13px] text-gray-500">
          Your creatives are being produced in parallel. Nothing in this sequence delays them.
        </p>
      ) : null}
    </Section>
  )
}

/* ── 7. Who you are speaking with ──────────────────────────────────────── */

function Host() {
  return (
    <Section eyebrow="Who you are speaking with">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white">
            SS
          </span>
          <div>
            <div className="text-base font-bold text-white">Sebastian Sanchez</div>
            <div className="text-[13px] text-cyan-300">Founder, PureScale</div>
          </div>
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-gray-400">
          PureScale exists because the same problem kept showing up: good brands plateauing not on product or targeting
          but on how fast they could produce something genuinely new to test. We built a production model that solves
          it, and we run it for seven-figure DTC brands where margin actually matters. Seb is the one on the call and
          the one accountable for the number at the end of the month.
        </p>

        <div className="mt-7 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
          {[
            ['£8m+', 'Annual ad spend managed'],
            ['80+', 'DTC brands served'],
            ['3.8x', 'Average ROAS sustained'],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                {value}
              </div>
              <div className="mt-1 text-[12px] leading-snug text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ── 8. The questions people ask before this call ──────────────────────── */

const FAQ: [string, string][] = [
  [
    'Is this a sales call?',
    'It is a working session on your account. We look at your numbers and tell you where the return is leaking and what we would produce first. If there is a fit we will say what working together looks like, including what it costs. If there is not, we will say that too.',
  ],
  [
    'Who will I be speaking with?',
    'Seb Sanchez, the founder. Not a setter and not a junior. The person on the call is the person who would run the production.',
  ],
  [
    'What does it cost to work with PureScale?',
    'The front end is a fixed price per batch and you already know it. Ongoing production is a fixed monthly fee, quoted on the call from your spend and the volume the account needs. Never a percentage of ad spend, and the ad budget goes to the platforms, not to us.',
  ],
  [
    'We already have someone making creative.',
    'Good. Bring their last 90 days. Sometimes the right answer is us feeding your existing media buyer rather than taking the account, and we will say so.',
  ],
  [
    'Do I need to prepare anything?',
    'Ten minutes. Ads Manager open, a rough idea of revenue and gross margin, and a reply to the confirmation email with your store URL and monthly ad spend.',
  ],
  [
    'What happens after the call?',
    'If it is a fit you get a short written plan within 48 hours and the first batch goes into production immediately, so you judge us on the work rather than a deck. If it is not, you leave with the three things we would fix first.',
  ],
]

function Faq() {
  return (
    <Section eyebrow="Before the call" title="Questions people ask before this one" tint>
      <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        {FAQ.map(([q, a]) => (
          <details key={q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]">
              <span className="text-[15px] font-bold text-white">{q}</span>
              <span
                aria-hidden
                className="relative h-3 w-3 shrink-0 text-cyan-300 transition-transform duration-300 group-open:rotate-45"
              >
                <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
              </span>
            </summary>
            <p className="px-5 pb-5 text-[14px] leading-relaxed text-gray-400">{a}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-[13px] text-gray-500">
        Anything else before we speak, email{' '}
        <a href={`mailto:${REPLY_TO}`} className="text-cyan-400 hover:underline">
          {REPLY_TO}
        </a>
        .
      </p>
    </Section>
  )
}

/* ── Sticky bar, phone only ────────────────────────────────────────────── */

function StickyBar({ view }: { view: BookedView }) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 620)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!view.clock || !view.google) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-stone-900/95 backdrop-blur-xl transition-transform duration-300 sm:hidden ${
        shown ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300">Your call</div>
          <div className="mt-0.5 text-sm text-white">
            {view.weekday} {view.clock}
          </div>
        </div>
        <a
          href={view.google}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2.5 text-[11px] font-bold text-white"
        >
          Add to calendar
        </a>
      </div>
    </div>
  )
}
