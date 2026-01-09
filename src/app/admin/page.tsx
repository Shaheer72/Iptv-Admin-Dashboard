"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const router = useRouter();
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get admin token from sessionStorage or localStorage
    const token = sessionStorage.getItem("adminToken") || localStorage.getItem("adminToken");
    console.log('Admin page loaded, token:', token);
    
    if (!token) {
      // Redirect to home if no token
      console.log('No token found, redirecting to home');
      router.push("/");
      return;
    }

    setAdminToken(token);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!adminToken) {
    return null;
  }

  return (
    <AdminDashboard
      adminToken={adminToken}
      isFullScreen={true}
      onLogout={() => {
        sessionStorage.removeItem("adminToken");
        localStorage.removeItem("adminToken");
        router.push("/");
      }}
    />
  );
}
