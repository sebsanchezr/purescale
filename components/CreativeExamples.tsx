import Image from 'next/image'

/**
 * Scrolling wall of real client creatives, placed straight after the "your
 * creative is fatigued" section.
 *
 * The argument on this page is that we ship volume and variety. Saying it is
 * weaker than showing it, so this is deliberately a *wall* — two rows drifting
 * in opposite directions, no captions, no client names. The impression to leave
 * is "these people make a lot of very different ads", which is exactly the thing
 * the $97 buys.
 *
 * Client names are omitted on purpose: several of these brands have not agreed
 * to be named publicly, and unlabelled work also reads as a portfolio rather
 * than a list of claims.
 *
 * Reuses the same scroll-track / scroll-left / scroll-right CSS the testimonial
 * rail already uses, so there is one marquee implementation on the page rather
 * than two. Pure CSS: no JavaScript, pauses on hover.
 */

const ROW_ONE = [
  '0811-poshmia-collage',
  '0815-a-b-arabicnamebracelet_v2',
  '0815-a-b-verticalarabicname_v1',
  '100-0401-azelefa_5star-v1',
  '100-0623-disantistudio-v3',
  '100-0623-disantistudio-v6',
  '100-0911-cablepro_v5',
  '100-1008-caba-chapter1_v3',
  '100-1008-caba-chapter2_v1',
  '101-0213-revice-v2',
  '101-0213-revice-v4',
]

const ROW_TWO = [
  '102-1002-blackfriday_v3',
  '103-0114-jessicak-collage_v1',
  '103-0123-jessicak_v5',
  '103-0223-posh-gigidress_v1',
  '103-0424-thematchagirl-v1',
  '107-1222-lalingi-winter_v2',
  '108-0113-l-alingi-aw25_v4',
  '108-statics-0211-lilly-s-3for2_v5',
  '109-0505-lilly-s-snake',
  'activewear-price-hero-30.06.26',
  'haircare-box-infographic-30.06.26',
]

function Row({ slugs, reverse = false }: { slugs: string[]; reverse?: boolean }) {
  // The track is rendered twice and translated by exactly -50%, which is what
  // makes the loop seamless — the second copy is in position when the first ends.
  const doubled = [...slugs, ...slugs]

  return (
    <div className="scroll-track overflow-hidden">
      <div
        className={`${reverse ? 'scroll-right' : 'scroll-left'} flex gap-4`}
        style={{ width: 'fit-content' }}
      >
        {doubled.map((slug, i) => (
          <div
            key={`${slug}-${i}`}
            className="relative aspect-[9/16] w-[150px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-cyan-400/40 sm:w-[190px]"
          >
            <Image
              src={`/creatives/${slug}.webp`}
              alt=""
              aria-hidden="true"
              fill
              sizes="190px"
              className="object-cover"
              // Below the fold on every viewport — never block the hero on these.
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CreativeExamples() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-20">
      <div className="mx-auto mb-12 max-w-4xl px-4 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Receipts, not mockups
        </p>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          Some of our <span className="font-poppins-italic text-cyan-300">best performing</span> ads
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Every one of these ran on real budget for a real brand. Different products, different
          markets, different angles — built by the same engine that will build yours.
        </p>
      </div>

      {/* Edge fade so the rows dissolve into the page rather than being cut off. */}
      <div className="creative-marquee space-y-4">
        <Row slugs={ROW_ONE} />
        <Row slugs={ROW_TWO} reverse />
      </div>
    </section>
  )
}
