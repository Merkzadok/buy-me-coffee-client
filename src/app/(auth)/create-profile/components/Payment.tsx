"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

export const Payment = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  return (
    <form
      onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
      className="max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow"
    >
      {/* 1. Select Country */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
        <select
          {...register("country", { required: true })}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="">Select a country...</option>
          <option value="USA">USA</option>
          <option value="UK">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Japan">Japan</option>
          <option value="Australia">Australia</option>
          <option value="South Korea">South Korea</option>
          <option value="India">India</option>
          <option value="Brazil">Brazil</option>
        </select>
      </div>

      {/* 2. First Name + Last Name */}
      <div className="flex gap-4">
        <input
          {...register("firstName")}
          placeholder="First Name"
          className="w-1/2 border border-gray-300 rounded-md p-2 text-sm"
        />
        <input
          {...register("lastName")}
          placeholder="Last Name"
          className="w-1/2 border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>

      {/* 3. Card Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <input
          {...register("cardNumber")}
          placeholder="XXXX XXXX XXXX XXXX"
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
          type="number"
        />
      </div>

      {/* 4. Expiry Month + Year + CVC */}
      <div className="flex gap-4">
        <select
          {...register("expMonth")}
          className="w-1/3 border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="">Month</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={`${i + 1}`.padStart(2, "0")}>
              {`${i + 1}`.padStart(2, "0")}
            </option>
          ))}
        </select>

        <select
          {...register("expYear")}
          className="w-1/3 border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="">Year</option>
          {[...Array(10)].map((_, i) => {
            const year = new Date().getFullYear() + i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>

        <input
          {...register("cvc")}
          placeholder="CVC"
          className="w-1/3 border border-gray-300 rounded-md p-2 text-sm"
          type="number"
        />
      </div>

      {/* 5. Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white rounded-md py-2 text-sm hover:bg-gray-700 transition-colors"
        >
          Continue
        </button>
      </div>

      {/* Debug Data */}
      <p className="text-xs text-gray-500 break-words">{data}</p>
    </form>
  );
};
