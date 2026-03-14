"use client";

import { useState } from "react";

export default function TitleTagLengthChecker(){

  const [title,setTitle] = useState("");
  const [result,setResult] = useState<any>(null);
  const [loading,setLoading] = useState(false);

  const analyze = async ()=>{

    if(!title){
      alert("Enter title");
      return;
    }

    setLoading(true);

    const res = await fetch(
      "/api/seotools/title-checker",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({title})
      }
    );

    const data = await res.json();

    setResult(data);
    setLoading(false);

  };

  return(

    <div className="max-w-4xl mx-auto">

      {/* INPUT */}

      <div className="bg-white p-6 rounded-2xl shadow mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Title Tag Length Checker
        </h2>

        <textarea
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Enter your SEO title"
          className="border w-full p-3 rounded mb-4"
        />

        <div className="flex gap-3">

          <button
            onClick={analyze}
            className="bg-indigo-600 text-white px-6 py-2 rounded"
          >
            Check Title
          </button>

          <button
            onClick={analyze}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Generate More Titles
          </button>

        </div>

      </div>


      {loading && (
        <p className="text-gray-500">
          Generating SEO titles...
        </p>
      )}


      {result && (

        <div className="space-y-6">

          {/* LENGTH */}

          <div className="bg-white p-6 rounded-xl shadow">

            <p>
              <strong>Title Length:</strong>
              {" "}
              {result.length} characters
            </p>

            <p className={
              result.status === "good"
                ? "text-green-600"
                : "text-red-500"
            }>
              {result.message}
            </p>

          </div>


          {/* SUGGESTIONS */}

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold mb-4">
              SEO Title Suggestions
            </h3>

            <div className="space-y-2 max-h-96 overflow-y-auto">

              {result.suggestions?.map(
                (s:string,i:number)=>(
                  <div
                    key={i}
                    onClick={()=>setTitle(s)}
                    className="border p-3 rounded cursor-pointer hover:bg-gray-50"
                  >
                    {s}
                  </div>
                )
              )}

            </div>

          </div>

        </div>

      )}

    </div>

  );

}