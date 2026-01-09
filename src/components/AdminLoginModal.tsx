"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string) => void;
}

export default function AdminLoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: AdminLoginModalProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Prefer relative /api in the browser if NEXT_PUBLIC_API_URL points to localhost
      const raw = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = (typeof window !== 'undefined' && raw && (raw.includes('localhost') || raw.includes('127.0.0.1')))
        ? '/api'
        : (raw || '/api');

      const response = await fetch(`${apiUrl}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Login successful - store token and redirect
        const token = data.token;
        sessionStorage.setItem("adminToken", token);
        localStorage.setItem("adminToken", token);
        
        onLoginSuccess(token);
        setUsername("");
        setPassword("");
        setIsSubmitting(false);
        
        // Redirect to admin page
        router.push("/admin");
      } else {
        // Login failed
        setError(data.message || "Invalid credentials. Access denied.");
        setPassword("");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur">
      <div className="relative w-full max-w-md rounded-lg bg-gray-900 p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-white">Admin Access</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Enter username"
              className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              disabled={isSubmitting}
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password"
              className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/20 p-3 text-red-400">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-yellow-600 px-4 py-2 font-semibold text-white hover:bg-yellow-700 disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          Admin login requires valid credentials.
        </p>
      </div>
    </div>
  );
}
