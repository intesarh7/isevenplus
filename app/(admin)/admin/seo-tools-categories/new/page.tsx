"use client";

import { useState } from "react";

export default function NewSeoCategory() {

  const [name,setName] = useState("");
  const [slug,setSlug] = useState("");
  const [description,setDescription] = useState("");
  const [icon,setIcon] = useState<File | null>(null);

  async function submit(e:any){

    e.preventDefault();

    const form = new FormData();

    form.append("name",name);
    form.append("slug",slug);
    form.append("description",description);

    if(icon) form.append("icon",icon);

    await fetch("/api/admin/seo-tools-categories/create",{
      method:"POST",
      body:form
    });

    location.href="/admin/seo-tools-categories";

  }

  return (

    <form onSubmit={submit} className="p-6 space-y-4">

      <input
        placeholder="Category Name"
        className="border p-2 w-full"
        value={name}
        onChange={e=>setName(e.target.value)}
      />

      <input
        placeholder="Slug"
        className="border p-2 w-full"
        value={slug}
        onChange={e=>setSlug(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="border p-2 w-full"
        value={description}
        onChange={e=>setDescription(e.target.value)}
      />

      <input
        type="file"
        onChange={(e)=>setIcon(e.target.files?.[0] || null)}
      />

      <button className="bg-indigo-600 text-white px-4 py-2 rounded">
        Save Category
      </button>

    </form>

  );
}