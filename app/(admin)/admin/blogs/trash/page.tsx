"use client";

import { useEffect,useState } from "react";

export default function TrashBlogs(){

  const [blogs,setBlogs] = useState([]);

  async function fetchTrash(){

    const res = await fetch("/api/admin/blogs/trash");
    const data = await res.json();

    setBlogs(data);

  }

  useEffect(()=>{
    fetchTrash();
  },[]);


  async function restoreBlog(id:number){

    await fetch("/api/admin/blogs/restore",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id})
    });

    fetchTrash();
  }


  async function deletePermanent(id:number){

    if(!confirm("Delete permanently?")) return;

    await fetch("/api/admin/blogs/permanent-delete",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id})
    });

    fetchTrash();
  }

  return(

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Trash Blogs
      </h1>

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th>Title</th>
            <th>Deleted At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {blogs.map((b:any)=>(
            <tr key={b.id} className="border-t">

              <td className="p-3">{b.title}</td>

              <td>
                {new Date(b.deletedAt).toLocaleDateString()}
              </td>

              <td className="flex gap-2">

                <button
                onClick={()=>restoreBlog(b.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Restore
                </button>

                <button
                onClick={()=>deletePermanent(b.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete Forever
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )

}