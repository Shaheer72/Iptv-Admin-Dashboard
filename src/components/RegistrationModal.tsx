"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    referralName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d+$/.test(formData.phoneNumber.replace(/\s|-|\(|\)/g, ""))) {
      newErrors.phoneNumber = "Phone Number must contain only digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      const response = await fetch(
        `${apiUrl}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            referralName: formData.referralName || null,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Show success message
        setSuccessMessage(data.message);

        // Reset form
        setFormData({
          fullName: "",
          phoneNumber: "",
          referralName: "",
        });

        // Clear success message after 3 seconds and close modal
        setTimeout(() => {
          setSuccessMessage("");
          onClose();
        }, 3000);
      } else {
        setErrors({ submit: data.message || "Failed to register. Please try again." });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "Failed to register. Please try again." });
    } finally {
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

        <h2 className="mb-6 text-2xl font-bold text-white">Register Now</h2>

        {successMessage ? (
          <div className="rounded-lg bg-green-500/20 p-4 text-green-400">
            {successMessage}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter Your Name"
                className={`w-full rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? "focus:ring-red-500 ring-1 ring-red-500"
                    : "focus:ring-rose-500"
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="1 (800) 555-0199"
                className={`w-full rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.phoneNumber
                    ? "focus:ring-red-500 ring-1 ring-red-500"
                    : "focus:ring-rose-500"
                }`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-400">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Referral Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Referral Name
              </label>
              <input
                type="text"
                name="referralName"
                value={formData.referralName}
                onChange={handleInputChange}
                placeholder="Who Referred You?"
                className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {errors.submit && (
              <div className="rounded-lg bg-red-500/20 p-3 text-red-400">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-rose-500 px-4 py-2 font-semibold text-white hover:bg-rose-600 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            <p className="text-center text-xs text-gray-400">
              Your information will be kept secure and confidential.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
