'use client'
import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

import { SpeedInsights } from "@vercel/speed-insights/next"

export default function IncomeForm() {
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeType, setIncomeType] = useState("Online");
  const [incomeDescription, setIncomeDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      income_amount: incomeAmount,
      income_type: incomeType,
      income_description: incomeDescription,
    };

    try {
      const response = await fetch("/api/set-income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsLoading(false);
        setIsSubmitted(true);
        setIncomeAmount("");
        setIncomeType("Online");
        setIncomeDescription("");
      } else {
        console.error("Failed to submit income data");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null; // Prevent server-side rendering
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <SpeedInsights/>
      <div className="max-w-md w-full space-y-8">
        {isSubmitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-md text-center">
            <p className="text-lg font-semibold">Income data submitted successfully!</p>
          </div>
        ) : (
          <>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Submit Income</h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="incomeAmount" className="sr-only">
                    Income Amount
                  </label>
                  <input
                    id="incomeAmount"
                    name="incomeAmount"
                    type="number"
                    value={incomeAmount}
                    onChange={(e) => setIncomeAmount(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Income Amount"
                  />
                </div>
                <div>
                  <label htmlFor="incomeType" className="sr-only">Income Type</label>
                  <select
                    id="incomeType"
                    name="incomeType"
                    value={incomeType}
                    onChange={(e) => setIncomeType(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  >
                    <option value="Online">Online</option>
                      <option value="Cash">Cash</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="incomeDescription" className="sr-only">
                    Income Description
                  </label>
                  <input
                    id="incomeDescription"
                    name="incomeDescription"
                    type="text"
                    value={incomeDescription}
                    onChange={(e) => setIncomeDescription(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Income Description"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
