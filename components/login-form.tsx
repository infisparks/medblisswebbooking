"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Phone, Shield, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function LoginForm() {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [timer, setTimer] = useState(30)

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber.length !== 10) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStep("otp")

    // Start timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.some((digit) => !digit)) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    // Redirect to dashboard or home
    window.location.href = "/my-bookings"
  }

  const resendOtp = async () => {
    setTimer(30)
    // Simulate resend API call
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="mb-6">
            <h1 className="text-3xl font-bold font-heading text-primary mb-2">MedBliss</h1>
            <div className="w-12 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          <h2 className="text-2xl font-bold mb-2">{step === "phone" ? "Welcome Back" : "Verify Your Number"}</h2>
          <p className="text-muted-foreground">
            {step === "phone"
              ? "Enter your phone number to continue"
              : `We've sent a 6-digit code to +91 ${phoneNumber}`}
          </p>
        </div>

        <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          {step === "phone" ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                  <div className="absolute left-12 top-4 text-muted-foreground">+91</div>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="w-full pl-20 pr-4 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                    required
                  />
                </div>
                {phoneNumber && phoneNumber.length !== 10 && (
                  <p className="text-sm text-destructive">Please enter a valid 10-digit phone number</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                disabled={phoneNumber.length !== 10 || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending OTP...
                  </div>
                ) : (
                  "Send OTP"
                )}
              </Button>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  Secure Login
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  No Password Required
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-medium">Enter 6-Digit OTP</label>
                <div className="flex gap-3 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-xl font-bold border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      maxLength={1}
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                disabled={otp.some((digit) => !digit) || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify & Login"
                )}
              </Button>

              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {timer > 0 ? `Resend OTP in ${timer}s` : "You can now resend OTP"}
                </div>

                {timer === 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={resendOtp}
                    className="text-primary hover:text-primary/80"
                  >
                    Resend OTP
                  </Button>
                )}

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep("phone")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Change Phone Number
                </Button>
              </div>
            </form>
          )}
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
