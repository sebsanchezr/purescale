// One definition of the trial floor, shared by the form and the API route.
// It used to live only in the form, which meant the server trusted whatever
// `qualified` the browser sent. That flag decides whether a Lead event fires
// to Meta, so a wrong or forged value teaches the optimiser to go and find
// more under-floor traffic. The server derives it now; the form still uses
// the same set so what the applicant sees matches what gets recorded.
export const SPEND_BRACKETS = [
  { value: 'under_25k', label: 'Under $25,000/month' },
  { value: '25k_50k', label: '$25,000 - $50,000/month' },
  { value: '50k_100k', label: '$50,000 - $100,000/month' },
  { value: '100k_plus', label: '$100,000+/month' },
] as const

// Below $25,000 a month there is not enough spend across 14 days to beat a
// control honestly, so those applicants go to the $97 pack instead.
const QUALIFYING = new Set<string>(['25k_50k', '50k_100k', '100k_plus'])

export function isQualifiedSpend(bracket: string | undefined | null): boolean {
  return QUALIFYING.has((bracket ?? '').trim())
}
