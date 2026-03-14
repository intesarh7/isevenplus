"use client";

import { useState } from "react";

export default function MetaTagAnalyzer() {

  const [url,setUrl] = useState("");
  const [data,setData] = useState<any>(null);
  const [loading,setLoading] = useState(false);

  const analyze = async () => {

    if(!url){
      alert("Enter URL");
      return;
    }

    setLoading(true);

    const start = Date.now();

    const res = await fetch("/api/seotools/meta-analyzer",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({url})
    });

    const result = await res.json();

    const end = Date.now();

    result.loadTime = ((end-start)/1000).toFixed(2);

    setData(result);
    setLoading(false);
  };

  return (

    <div className="max-w-5xl mx-auto">

      {/* INPUT */}

      <div className="bg-white shadow rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Analyze Website Meta Tags
        </h2>

        <div className="flex gap-3">

          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e)=>setUrl(e.target.value)}
            className="border p-3 rounded w-full"
          />

          <button
            onClick={analyze}
            className="bg-indigo-600 text-white px-6 rounded"
          >
            Analyze
          </button>

        </div>

      </div>

      {loading && <p>Analyzing...</p>}

      {data && (

        <div className="grid gap-6">

          {/* SEO SCORE */}

          <div className="bg-green-50 border rounded-xl p-6 text-center">

            <h3 className="text-xl font-bold mb-2">
              SEO Score
            </h3>

            <p className="text-4xl font-bold text-green-600">
              {data.score}/100
            </p>

          </div>

          {/* BASIC META */}

          <Card title="Title Tag">
            {data.title || "Not Found"}
          </Card>

          <Card title="Meta Description">
            {data.description || "Not Found"}
          </Card>

          <Card title="Canonical URL">
            {data.canonical || "Not Found"}
          </Card>

          <Card title="Robots Meta">
            {data.robots || "Not Found"}
          </Card>

          <Card title="Viewport Tag">
            {data.viewport || "Not Found"}
          </Card>

          {/* FAVICON */}

          <Card title="Favicon">

            {data.favicon
              ? <img src={data.favicon} className="w-8 h-8"/>
              : "Not Found"}

          </Card>

          {/* HEADINGS */}

          <Card title="Headings Analysis">

            <p>H1: {data.h1}</p>
            <p>H2: {data.h2}</p>
            <p>H3: {data.h3}</p>
            <p>H4: {data.h4}</p>
            <p>H5: {data.h5}</p>
            <p>H6: {data.h6}</p>

          </Card>

          {/* LINKS */}

          <Card title="Links Analysis">

            <p>Internal Links: {data.internalLinks}</p>
            <p>External Links: {data.externalLinks}</p>

          </Card>

          {/* IMAGES */}

          <Card title="Images">

            <p>Total Images: {data.totalImages}</p>
            <p>Images Missing ALT: {data.missingAlt}</p>

          </Card>

          {/* STRUCTURED DATA */}

          <Card title="Structured Data">

            {data.schemaTypes?.length
              ? data.schemaTypes.join(", ")
              : "Not Found"}

          </Card>

          {/* PAGE LOAD */}

          <Card title="Page Load Time">
            {data.loadTime} seconds
          </Card>

        </div>

      )}

    </div>

  );
}

function Card({title,children}:any){
  return(
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="text-gray-700 text-sm">{children}</div>
    </div>
  )
}