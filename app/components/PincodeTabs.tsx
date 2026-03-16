"use client";

import { useState } from "react";
import PincodeAutoSuggest from "./PincodeAutoSuggest";
import PostOfficeLocator from "./PostOfficeLocator";

export default function PincodeTabs() {

  const [tab, setTab] = useState("search");

  return (

    <div className="bg-white shadow-lg p-6 rounded-xl mx-auto">

      {/* TAB BUTTONS */}

      <div className="flex gap-4 mb-6 border-b">

        <button
          onClick={() => setTab("search")}
          className={`pb-2 font-medium ${
            tab === "search"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          Pincode Search
        </button>

        <button
          onClick={() => setTab("locator")}
          className={`pb-2 font-medium ${
            tab === "locator"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          Post Office Locator
        </button>

      </div>

      {/* TAB CONTENT */}

      {tab === "search" && (
        <>
          <h2 className="text-1xl font-bold mb-4 text-left text-orange-600">
            Pincode Search by City, District or State
          </h2>

          <PincodeAutoSuggest />
        </>
      )}

      {tab === "locator" && (
        <>
          <h2 className="text-1xl font-bold mb-4 text-left text-orange-600">
            Pincode / Post Office Locator Tool
          </h2>

          <PostOfficeLocator />
        </>
      )}

    </div>

  );
}