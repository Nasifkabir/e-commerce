"use client"

import type React from "react"

import { useRef, useState, useEffect, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"

interface OtpInputProps {
  length?: number
  onComplete?: (otp: string) => void
}

export default function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  // Focus on first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  // Check if OTP is complete
  useEffect(() => {
    if (otp.every((digit) => digit !== "") && onComplete) {
      onComplete(otp.join(""))
    }
  }, [otp, onComplete])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, "")

    // Only take the last character if multiple are pasted/entered
    const singleDigit = value.slice(-1)

    if (value) {
      // Update the current input
      const newOtp = [...otp]
      newOtp[index] = singleDigit
      setOtp(newOtp)

      // Move to next input if available
      if (index < length - 1 && singleDigit) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty, move to previous input
        const newOtp = [...otp]
        newOtp[index - 1] = ""
        setOtp(newOtp)
        inputRefs.current[index - 1]?.focus()
      } else {
        // Clear current input
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
      }
    }

    // Handle left arrow key
    else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Handle right arrow key
    else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData
      .getData("text/plain")
      .replace(/[^0-9]/g, "")
      .slice(0, length)

    if (pastedData) {
      const newOtp = [...otp]
      for (let i = 0; i < pastedData.length; i++) {
        if (i < length) {
          newOtp[i] = pastedData[i]
        }
      }
      setOtp(newOtp)

      // Focus on the next empty input or the last one
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "")
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus()
      } else {
        inputRefs.current[length - 1]?.focus()
      }
    }
  }

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el)}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg"
          aria-label={`Digit ${index + 1} of verification code`}
        />
      ))}
    </div>
  )
}
