"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AccountPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    login: {
      email: "",
      password: "",
    },
    register: {
      name: "",
      email: "",
      password: "",
    },
  })

  const validateLoginForm = () => {
    let isValid = true
    const newErrors = {
      email: "",
      password: "",
    }

    if (!loginForm.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address."
      isValid = false
    }

    if (loginForm.password.length < 1) {
      newErrors.password = "Please enter your password."
      isValid = false
    }

    setErrors((prev) => ({ ...prev, login: newErrors }))
    return isValid
  }

  const validateRegisterForm = () => {
    let isValid = true
    const newErrors = {
      name: "",
      email: "",
      password: "",
    }

    if (registerForm.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters."
      isValid = false
    }

    if (!registerForm.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address."
      isValid = false
    }

    if (registerForm.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters."
      isValid = false
    }

    setErrors((prev) => ({ ...prev, register: newErrors }))
    return isValid
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginForm({
      ...loginForm,
      [name]: value,
    })
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterForm({
      ...registerForm,
      [name]: value,
    })
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    if (validateLoginForm()) {
      setIsSubmitting(true)
      // Simulate API call
      setTimeout(() => {
        console.log("Login:", loginForm)
        setIsSubmitting(false)
      }, 2000)
    }
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()

    if (validateRegisterForm()) {
      setIsSubmitting(true)
      // Simulate API call
      setTimeout(() => {
        console.log("Register:", registerForm)
        setIsSubmitting(false)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-sm mb-8 hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Create Account</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLoginSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                      />
                      {errors.login.email && <p className="text-sm text-red-500">{errors.login.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="login-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={handleLoginChange}
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
                      {errors.login.password && <p className="text-sm text-red-500">{errors.login.password}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>Enter your information to get started</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegisterSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Full Name</Label>
                      <Input
                        id="register-name"
                        name="name"
                        placeholder="John Doe"
                        value={registerForm.name}
                        onChange={handleRegisterChange}
                      />
                      {errors.register.name && <p className="text-sm text-red-500">{errors.register.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={registerForm.email}
                        onChange={handleRegisterChange}
                      />
                      {errors.register.email && <p className="text-sm text-red-500">{errors.register.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={registerForm.password}
                          onChange={handleRegisterChange}
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
                      {errors.register.password && <p className="text-sm text-red-500">{errors.register.password}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
