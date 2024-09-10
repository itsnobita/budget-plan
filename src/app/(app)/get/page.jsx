"use client";

import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

export default function OutcomeForm() {
  const [outcomeDescription, setOutcomeDescription] = useState("");
  const [outcomeCategory, setOutcomeCategory] = useState("");
  const [outcomeAmount, setOutcomeAmount] = useState("");
  const [outcomeType, setOutcomeType] = useState("UPI");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isFetchingCategories, setIsFetchingCategories] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  //   const router = useRouter();

  useEffect(() => {
      setIsMounted(true);
      fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/set-category", {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok && data.success) {
        const categories = data.result.map((item) => item.outcome_category);
        setCategories(categories); // Set the categories
        setIsFetchingCategories(false);
        setOutcomeCategory(categories[0] || ""); // Set first category as default
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsFetchingCategories(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      outcome_description: outcomeDescription,
      outcome_category: outcomeCategory,
      outcome_amount: outcomeAmount,
      outcome_type: outcomeType,
    };

    try {
      const response = await fetch("/api/set-outcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsLoading(false);
        setIsSubmitted(true);
        setOutcomeDescription("");
        setOutcomeCategory("fuel");
        setOutcomeAmount("");
        setOutcomeType("upi");
      } else {
        console.error("Failed to submit outcome data");
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
      <div className="max-w-md w-full space-y-8">
        {isSubmitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-md text-center">
            <p className="text-lg font-semibold">
              Outcome data submitted successfully!
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Submit Outcome
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="outcomeCategory" className="sr-only">
                    Outcome Category
                  </label>
                  {isFetchingCategories ? (
                    <p className="text-center text-gray-500">
                      Loading categories...
                    </p>
                  ) : (
                    <select
                      id="outcomeCategory"
                      name="outcomeCategory"
                      value={outcomeCategory}
                      onChange={(e) => setOutcomeCategory(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label htmlFor="outcomeAmount" className="sr-only">
                    Outcome Amount
                  </label>
                  <input
                    id="outcomeAmount"
                    name="outcomeAmount"
                    type="number"
                    value={outcomeAmount}
                    onChange={(e) => setOutcomeAmount(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Outcome Amount"
                  />
                </div>
                <div>
                  <label htmlFor="outcomeType" className="sr-only">
                    Outcome Type
                  </label>
                  <select
                    id="outcomeType"
                    name="outcomeType"
                    value={outcomeType}
                    onChange={(e) => setOutcomeType(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  >
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="outcomeDescription" className="sr-only">
                    Outcome Description
                  </label>
                  <input
                    id="outcomeDescription"
                    name="outcomeDescription"
                    type="text"
                    value={outcomeDescription}
                    onChange={(e) => setOutcomeDescription(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Outcome Description"
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
