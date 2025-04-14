"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Loader2, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"
import OtpInput from "@/components/ui/otp-input"

export default function RegistrationPage() {
  const [step, setStep] = useState<"form" | "otp" | "success">("form")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
    otp: "",
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: "",
      email: "",
      password: "",
      terms: "",
      otp: "",
    }

    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters."
      isValid = false
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address."
      isValid = false
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters."
      isValid = false
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms and conditions."
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
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
      console.log("Registration data:", formData)
      setIsSubmitting(false)
      setStep("success")
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-4 bg-muted/30">
        <Card className="w-full max-w-md mx-auto">
          {step === "form" && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>Enter your information to get started.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
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

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      name="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) => setFormData({ ...formData, terms: checked === true })}
                    />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="terms">
                        I agree to the{" "}
                        <Link href="#" className="text-primary underline">
                          terms and conditions
                        </Link>
                      </Label>
                      {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending verification code...
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t p-4">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/account" className="text-primary underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </>
          )}

          {step === "otp" && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Verify your email</CardTitle>
                <CardDescription>
                  We've sent a verification code to <span className="font-medium">{formData.email}</span>
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
                <Button variant="ghost" onClick={() => setStep("form")} disabled={isSubmitting}>
                  Back to registration
                </Button>
              </CardFooter>
            </>
          )}

          {step === "success" && (
            <>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-center">Registration Successful!</CardTitle>
                <CardDescription className="text-center">Your account has been created successfully.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-6">Thank you for registering, {formData.name}. You can now sign in to your account.</p>
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
