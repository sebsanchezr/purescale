import Image from 'next/image'

/**
 * Scrolling wall of real client creatives, placed straight after the "your
 * creative is fatigued" section.
 *
 * The argument on this page is that we ship volume and variety. Saying it is
 * weaker than showing it, so this is deliberately a *wall*, two rows drifting
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

// Rows are interleaved by category rather than grouped, so neither row reads as
// "the jewellery row", the point of the wall is range.
const ROW_ONE = [
  '0811-poshmia-collage',
  'kuick-s1-gt3-hero',
  '0815-a-b-arabicnamebracelet_v2',
  '100-0623-disantistudio-v3',
  'kuick-s3-maybach-executive',
  '100-0911-cablepro_v5',
  '100-1008-caba-chapter1_v3',
  '101-0213-revice-v2',
  'kuick-s5-gcc-cullinan-ar',
  '103-0114-jessicak-collage_v1',
  'activewear-price-hero-30.06.26',
  '107-1222-lalingi-winter_v2',
  '100-0401-azelefa_5star-v1',
  '109-0505-lilly-s-snake',
]

const ROW_TWO = [
  '102-1002-blackfriday_v3',
  'kuick-s2-g63-weekend',
  '103-0223-posh-gigidress_v1',
  '100-1008-caba-chapter2_v1',
  'kuick-s4-cullinan-arrival',
  '103-0424-thematchagirl-v1',
  '101-0213-revice-v4',
  '108-0113-l-alingi-aw25_v4',
  'kuick-s6-gcc-beforeland-ar',
  '103-0123-jessicak_v5',
  'haircare-box-infographic-30.06.26',
  '100-0623-disantistudio-v6',
  '0815-a-b-verticalarabicname_v1',
  '108-statics-0211-lilly-s-3for2_v5',
]

function Row({ slugs, reverse = false }: { slugs: string[]; reverse?: boolean }) {
  // The track is rendered twice and translated by exactly -50%, which is what
  // makes the loop seamless, the second copy is in position when the first ends.
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
              // Below the fold on every viewport, never block the hero on these.
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function Heading({ variant }: { variant: Variant }) {
  return (
    <>
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
        This is the work
      </p>
      {variant === 'trial' ? (
        <>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Fifteen of these.
            <br />
            On <span className="font-poppins-italic text-cyan-300">your</span> account.
            <br />
            In fourteen days.
          </h2>
          <p className="mt-4 max-w-md text-gray-400">
            Different products, different markets, different angles. The batch that turned
            the account above around was built by the same engine, and so is yours.
          </p>
        </>
      ) : (
        <>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Ten of these.
            <br />
            On <span className="font-poppins-italic text-cyan-300">your</span> brand.
            <br />
            By tomorrow.
          </h2>
          <p className="mt-4 max-w-md text-gray-400">
            Different products, different markets, different angles, every one built by the
            same engine you&apos;re about to put to work for $97.
          </p>
        </>
      )}
    </>
  )
}

export type Variant = 'pack' | 'trial'

// The proof strip is shared by the $97 pack pages and the trial page. Same
// images, different promise: the pack sells ten creatives by tomorrow, the
// trial sells fifteen over fourteen days. Passing the variant keeps one
// component instead of forking the whole gallery for one paragraph.
export function CreativeExamples({ variant = 'pack' }: { variant?: Variant } = {}) {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-20">
      {/* Mobile: heading sits above the rows, since there is no room beside them. */}
      <div className="mx-auto mb-10 max-w-2xl px-4 text-center lg:hidden">
        <Heading variant={variant} />
      </div>

      <div className="creative-marquee space-y-4">
        <Row slugs={ROW_ONE} />
        <Row slugs={ROW_TWO} reverse />
      </div>

      {/* Desktop: the rows run full-bleed behind a blurred panel on the left, so the
          copy sits *in* the work rather than above it. Pointer-events are off over
          the gradient so the marquee still pauses on hover behind it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[52%] bg-gradient-to-r from-stone-900 from-45% via-stone-900/85 to-transparent backdrop-blur-[2px] lg:block"
      />
      <div className="absolute inset-y-0 left-0 hidden w-[46%] flex-col justify-center px-10 xl:px-16 lg:flex">
        <Heading variant={variant} />
      </div>
    </section>
  )
}
