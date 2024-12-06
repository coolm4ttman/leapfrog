"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Import Firebase Authentication functions
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase/client";

export default function LoginPage() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  // Google Login
  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/chat"); // Redirect to home page
    } catch (err) {
      setError("Failed to log in with Google. Please try again.");
      console.error(err);
    }
  }

  // Email Login
  async function handleEmailLogin() {
    if (!inputValue.email || !inputValue.password) return;
    try {
      await signInWithEmailAndPassword(
        auth,
        inputValue.email,
        inputValue.password
      );
      router.push("/chat"); // Redirect to home page
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error(err);
    }
  }

  // Handle Input Change
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  return (
    <div className="flex flex-col w-full items-center min-h-screen gap-4  justify-center">
      <div
        className="
          flex flex-col items-center text-2xl font-bold text-gray
          "
      >
        <Image src="/Logo.svg" alt="Logo" width={120} height={120} />
        <h1 className="font-[500] text-black">LeapFrog</h1>
      </div>
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Create a LeapFrog account
          </h2>
        </div>

        {/* Google Login */}
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full justify-center gap-2"
        >
          <Image src="/Google.png" alt="Google Logo" width={25} height={25} />
          Continue with Google
        </Button>

        {/* Email Login */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEmailLogin();
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              required
              onChange={handleInputChange}
              value={inputValue.email}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              onChange={handleInputChange}
              value={inputValue.password}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#2fb344] hover:bg-[#2aa33d]"
          >
            Create Account
          </Button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="text-center text-sm text-gray-500">
          By continuing, you agree to LeapFrog's{" "}
          <Link href="/terms" className="underline hover:text-gray-900">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-gray-900">
            Privacy Policy
          </Link>
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[#2fb344] hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
