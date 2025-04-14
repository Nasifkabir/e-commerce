"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"
import OtpInput from "@/components/ui/otp-input"

type ForgotPasswordStep = "email" | "otp" | "reset" | "success"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<ForgotPasswordStep>("email")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  })

  const validateEmail = () => {
    let isValid = true
    const newErrors = { ...errors, email: "" }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address."
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const validatePasswords = () => {
    let isValid = true
    const newErrors = { ...errors, password: "", confirmPassword: "" }

    if (passwords.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters."
      isValid = false
    }

    if (passwords.password !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match."
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()

    if (validateEmail()) {
      setIsSubmitting(true)
      // Simulate API call to send OTP
      setTimeout(() => {
        setIsSubmitting(false)
        setStep("otp")
      }, 2000)
    }
  }

  const handleVerifyOtp = (otp: string) => {
    setIsSubmitting(true)
    // Simulate API call to verify OTP
    setTimeout(() => {
      console.log("OTP verified:", otp)
      setIsSubmitting(false)
      setStep("reset")
    }, 2000)
  }

  const handleResendOtp = () => {
    setIsSubmitting(true)
    // Simulate API call to resend OTP
    setTimeout(() => {
      setIsSubmitting(false)
      // Show a message that OTP was resent
      alert("A new verification code has been sent to your email.")
    }, 1500)
  }

  const handleResetPassword = (e) => {
    e.preventDefault()

    if (validatePasswords()) {
      setIsSubmitting(true)
      // Simulate API call to reset password
      setTimeout(() => {
        console.log("Password reset:", passwords.password)
        setIsSubmitting(false)
        setStep("success")
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-4 bg-muted/30">
        <Card className="w-full max-w-md mx-auto">
          {step === "email" && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Forgot Password</CardTitle>
                <CardDescription>
                  Enter your email address and we'll send you a verification code to reset your password.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending verification code...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t p-4">
                <Link href="/account" className="text-sm text-muted-foreground hover:text-primary flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Link>
              </CardFooter>
            </>
          )}

          {step === "otp" && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Verify your email</CardTitle>
                <CardDescription>
                  We've sent a verification code to <span className="font-medium">{email}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="otp" className="text-center block">
                    Enter verification code
                  </Label>
                  <OtpInput onComplete={handleVerifyOtp} />
                  {errors.otp && <p className="text-sm text-red-500 text-center">{errors.otp}</p>}
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Didn't receive a code?</p>
                  <Button
                    variant="link"
                    onClick={handleResendOtp}
                    disabled={isSubmitting}
                    className="text-sm p-0 h-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      "Resend code"
                    )}
                  </Button>
                </div>

                {isSubmitting && (
                  <div className="flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center border-t p-4">
                <Button variant="ghost" onClick={() => setStep("email")} disabled={isSubmitting}>
                  Back to email
                </Button>
              </CardFooter>
            </>
          )}

          {step === "reset" && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Reset Password</CardTitle>
                <CardDescription>Create a new password for your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={passwords.password}
                        onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Password must be at least 8 characters</p>
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting password...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {step === "success" && (
            <>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-center">Password Reset Successful!</CardTitle>
                <CardDescription className="text-center">Your password has been reset successfully.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-6">You can now sign in to your account with your new password.</p>
                <Link href="/account">
                  <Button>Sign In</Button>
                </Link>
              </CardContent>
            </>
          )}
        </Card>
      </div>

      <Footer />
    </div>
  )
}
