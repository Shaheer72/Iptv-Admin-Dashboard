"use client";

import { LogOut, Users, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  fullName: string;
  phoneNumber: string;
  referralName?: string;
  registrationDate: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
  adminToken: string;
  isFullScreen?: boolean;
}

export default function AdminDashboard({ onLogout, adminToken, isFullScreen = false }: AdminDashboardProps) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log('AdminDashboard mounted with token:', adminToken);
    if (adminToken) {
      fetchUsers();
    }
  }, [adminToken]);

  // Poll for changes every 5 seconds to reflect live MongoDB state
  useEffect(() => {
    if (!adminToken) return;
    const id = setInterval(() => {
      fetchUsers();
    }, 5000);
    return () => clearInterval(id);
  }, [adminToken]);

  useEffect(() => {
    // Filter users based on search query
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(query) ||
          user.phoneNumber.includes(query)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");
    try {
      console.log('Fetching users with token:', adminToken);
      // Prefer relative /api in the browser if NEXT_PUBLIC_API_URL points to localhost
      const raw = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = (typeof window !== 'undefined' && raw && (raw.includes('localhost') || raw.includes('127.0.0.1')))
        ? '/api'
        : (raw || '/api');

      const response = await fetch(`${apiUrl}/admin/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": adminToken,
          },
        }
      );

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success) {
        setUsers(data.data);
        setFilteredUsers(data.data);
      } else {
        setError(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Fetch users error:", error);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Delete this user?')) return;
    setError('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const resp = await fetch(
        `${apiUrl}/admin/users/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-token': adminToken,
          },
        }
      );
      const data = await resp.json();
      if (data.success) {
        // remove from state immediately
        setUsers((prev) => prev.filter((u) => u._id !== id));
        setFilteredUsers((prev) => prev.filter((u) => u._id !== id));
      } else {
        setError(data.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Delete user error:', err);
      setError('Failed to delete user. Please try again.');
    }
  };

  const handleLogout = () => {
    onLogout();
    if (isFullScreen) {
      router.push("/");
    }
  };

  return (
    <div className={isFullScreen ? "min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8" : "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"}>
      <div className={isFullScreen ? "w-full" : "relative w-full max-w-6xl rounded-lg bg-gray-900 p-8 shadow-xl max-h-[90vh] overflow-y-auto"}>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20 ring-1 ring-yellow-400/30">
              <Users className="h-6 w-6 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="text-3xl font-bold text-yellow-400">
              {users.length}
            </div>
            <div className="text-xs text-gray-400">Total Registrations</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="text-3xl font-bold text-blue-400">
              {filteredUsers.length}
            </div>
            <div className="text-xs text-gray-400">Displayed Users</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="text-3xl font-bold text-green-400">
              {new Date().toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-400">Today's Date</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or phone number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-gray-800 pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-500/20 p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Users Table */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            User Registrations
          </h3>
          {isLoading ? (
            <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-gray-400">Loading users...</p>
            </div>
          ) : filteredUsers.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-sm">
                <thead className="border-b border-white/10 bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300">
                      Full Name
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300">
                      Phone Number
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300">
                      Referral Name
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300">
                      Registered At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 py-3 text-white font-medium">
                        {user.fullName}
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {user.phoneNumber}
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {user.referralName || "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {new Date(user.registrationDate).toLocaleString()}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-500 mb-3" />
              <p className="text-gray-400">
                {searchQuery ? "No users found matching your search." : "No registrations yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
