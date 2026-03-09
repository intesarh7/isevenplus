"use client";

import { useEffect, useState } from "react";

export default function BlogCategories(){

  const [categories,setCategories] = useState([]);
  const [name,setName] = useState("");

  async function fetchCategories(){

    const res = await fetch("/api/admin/blogs/categories/list");
    const data = await res.json();

    setCategories(data);

  }

  useEffect(()=>{
    fetchCategories();
  },[]);

  async function createCategory(){

    if(!name) return;

    await fetch("/api/admin/blogs/categories/create",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name})
    });

    setName("");
    fetchCategories();

  }

  async function deleteCategory(id:number){

    if(!confirm("Delete this category?")) return;

    await fetch("/api/admin/blogs/categories/delete",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id})
    });

    fetchCategories();

  }

  return(

    <div className="p-6 space-y-6 max-w-3xl">

      <h1 className="text-2xl font-bold">
        Blog Categories
      </h1>

      {/* Create */}

      <div className="flex gap-2">

        <input
          placeholder="Category name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border px-4 py-2 rounded-lg flex-1"
        />

        <button
          onClick={createCategory}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>

      </div>

      {/* List */}

      <div className="border rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Name
              </th>

              <th className="text-left">
                Slug
              </th>

              <th className="text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {categories.map((c:any)=>(

              <tr key={c.id} className="border-t">

                <td className="p-3">
                  {c.name}
                </td>

                <td>
                  {c.slug}
                </td>

                <td>

                  <button
                    onClick={()=>deleteCategory(c.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}