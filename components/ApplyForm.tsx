'use client'
import { useState } from 'react'
import { Logo } from './Logo'

export function ApplyForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [formData, setFormData] = useState({
    business: '',
    revenue: '',
    spend: '',
    timeline: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const handleBusinessChange = (value: string) => {
    setFormData(prev => ({ ...prev, business: value }))
  }

  const handleBusinessContinue = () => {
    if (formData.business.trim()) setStep(2)
  }

  const handleRevenueSelect = (value: string) => {
    setFormData(prev => ({ ...prev, revenue: value }))
    setStep(3)
  }

  const handleSpendSelect = (value: string) => {
    setFormData(prev => ({ ...prev, spend: value }))
    setStep(4)
  }

  const handleTimelineSelect = (value: string) => {
    setFormData(prev => ({ ...prev, timeline: value }))
    setStep(5)
  }

  const handleDetailChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmitDetails = async () => {
    if (formData.firstName && formData.lastName && formData.email && formData.phone) {
      try {
        // Send form data to API
        const response = await fetch('/api/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          // Form data collected and sent - show calendar booking
          setShowCalendar(true)
        }
      } catch (error) {
        console.error('Form submission error:', error)
        // Still show calendar booking even if email fails for now
        setShowCalendar(true)
      }
    }
  }

  const [hasBooked, setHasBooked] = useState(false)

  const handleBookCall = () => {
    // Replace with your actual Calendly or calendar booking link
    window.open('https://calendar.google.com/calendar/u/0/r', '_blank')
    setHasBooked(true)
  }

  if (showCalendar) {
    return (
      <div className="min-h-screen bg-black py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <Logo />
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              One last step, <span className="font-poppins-italic">{formData.firstName}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Pick a time that works for you. The call is 20 minutes.
            </p>

            <button
              onClick={handleBookCall}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-bold text-lg transition-all duration-200 shadow-2xl shadow-blue-500/50 mb-6 w-full"
            >
              Book a time on my calendar →
            </button>

            {hasBooked && (
              <a
                href="/thankyou"
                className="block w-full px-10 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 font-semibold text-base transition-all duration-200 mt-3"
              >
                I&apos;ve booked my call →
              </a>
            )}

            <p className="text-gray-500 text-sm mt-6">
              We&apos;ll spend 20 minutes going through your account and mapping out exactly what we&apos;d do.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="mb-12 text-center">
            <Logo />
          </div>
          <h1 className="text-6xl font-bold text-white mb-6">✓</h1>
          <h2 className="text-4xl font-bold text-white mb-4">
            You&apos;re <span className="font-poppins-italic">booked in</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We&apos;ll review your account and get in touch within 24 hours. We&apos;re excited to see what we can do for your business.
          </p>
        </div>
      </div>
    )
  }

  const progressPercent = (step / 5) * 100

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-12 text-center">
          <Logo />
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-white">
              Step {step} <span className="text-gray-500">of 5</span>
            </h1>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 mb-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Tell us about your <span className="font-poppins-italic">business</span>
              </h2>
              <p className="text-gray-400 mb-6">Who you serve, what you sell, and where you&apos;re trying to take it.</p>
              <textarea
                value={formData.business}
                onChange={(e) => handleBusinessChange(e.target.value)}
                placeholder="e.g., We're a D2C fashion brand selling premium outdoor gear. We have $2M ARR and want to reach $5M in 18 months..."
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:bg-white/15 transition-all duration-200 h-32"
              />
              <button
                onClick={handleBusinessContinue}
                disabled={!formData.business.trim()}
                className="w-full mt-4 px-10 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                What&apos;s your monthly <span className="font-poppins-italic">revenue</span>?
              </h2>
              <p className="text-gray-400 mb-8">This helps us understand your scale.</p>
              <div className="space-y-3">
                {['$100k-$250k', '$250k-$500k', '$500k-$1M', '$1M-$5M', '$5M+'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleRevenueSelect(option)}
                    className="w-full text-left p-4 rounded-lg border border-white/10 hover:border-blue-400/50 hover:bg-white/5 text-white font-medium transition-all duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                What&apos;s your monthly ad <span className="font-poppins-italic">spend</span>?
              </h2>
              <p className="text-gray-400 mb-8">Current paid media investment across all platforms.</p>
              <div className="space-y-3">
                {['$10k-$25k', '$25k-$50k', '$50k-$100k', '$100k-$250k', '$250k+'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSpendSelect(option)}
                    className="w-full text-left p-4 rounded-lg border border-white/10 hover:border-blue-400/50 hover:bg-white/5 text-white font-medium transition-all duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                When can you <span className="font-poppins-italic">start</span>?
              </h2>
              <p className="text-gray-400 mb-8">Timeline matters for planning our capacity.</p>
              <div className="space-y-3">
                {['Ready now', 'Within 30 days', '1-3 months', 'Just exploring'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleTimelineSelect(option)}
                    className="w-full text-left p-4 rounded-lg border border-white/10 hover:border-blue-400/50 hover:bg-white/5 text-white font-medium transition-all duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Almost there. Your <span className="font-poppins-italic">details</span>.
              </h2>
              <p className="text-gray-400 mb-8">We&apos;ll send your roadmap and book your call here.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => handleDetailChange('firstName', e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:bg-white/15 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => handleDetailChange('lastName', e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:bg-white/15 transition-all"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Business email"
                  value={formData.email}
                  onChange={(e) => handleDetailChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:bg-white/15 transition-all"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => handleDetailChange('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:bg-white/15 transition-all"
                />
              </div>

              <button
                onClick={handleSubmitDetails}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                className="w-full mt-6 px-10 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Schedule my call →
              </button>
            </div>
          )}
        </div>

        {step > 1 && step < 5 && (
          <button
            onClick={() => setStep(step - 1)}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            ← Go back
          </button>
        )}
      </div>
    </div>
  )
}
