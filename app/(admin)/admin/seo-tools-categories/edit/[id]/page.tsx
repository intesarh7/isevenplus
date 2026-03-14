"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditSeoCategory() {

  const params = useParams()
  const router = useRouter()

  const id = params.id

  const [name,setName] = useState("")
  const [slug,setSlug] = useState("")
  const [description,setDescription] = useState("")
  const [sortOrder,setSortOrder] = useState(0)
  const [isActive,setIsActive] = useState(true)

  const [icon,setIcon] = useState<File | null>(null)
  const [oldIcon,setOldIcon] = useState("")

  const [loading,setLoading] = useState(true)

  // load category
  useEffect(()=>{

    async function loadData(){

      const res = await fetch(`/api/admin/seo-tools-categories/${id}`)

      if(!res.ok){
        alert("Failed to load category")
        return
      }

      const data = await res.json()

      setName(data.name || "")
      setSlug(data.slug || "")
      setDescription(data.description || "")
      setSortOrder(data.sortOrder || 0)
      setIsActive(data.isActive === 1)

      setOldIcon(data.icon || "")

      setLoading(false)
    }

    loadData()

  },[id])



  async function handleSubmit(e:any){

    e.preventDefault()

    const form = new FormData()

    form.append("id",String(id))
    form.append("name",name)
    form.append("slug",slug)
    form.append("description",description)
    form.append("sortOrder",String(sortOrder))
    form.append("isActive",String(isActive))
    form.append("oldIcon",oldIcon)

    if(icon){
      form.append("icon",icon)
    }

    const res = await fetch(
      "/api/admin/seo-tools-categories/update",
      {
        method:"POST",
        body:form
      }
    )

    const data = await res.json()

    if(data.success){
      router.push("/admin/seo-tools-categories")
    }else{
      alert("Update failed")
    }

  }


  if(loading){
    return <div className="p-6">Loading...</div>
  }


  return (

    <div className="p-6 max-w-2xl">

      <h1 className="text-2xl font-bold mb-6">
        Edit SEO Tool Category
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">
            Name
          </label>

          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>


        <div>
          <label className="block mb-1 font-medium">
            Slug
          </label>

          <input
            value={slug}
            onChange={(e)=>setSlug(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>


        <div>
          <label className="block mb-1 font-medium">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>


        <div>
          <label className="block mb-1 font-medium">
            Sort Order
          </label>

          <input
            type="number"
            value={sortOrder}
            onChange={(e)=>setSortOrder(Number(e.target.value))}
            className="border p-2 w-full rounded"
          />
        </div>


        <div className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={isActive}
            onChange={(e)=>setIsActive(e.target.checked)}
          />

          <label>Active</label>

        </div>



        <div>

          <label className="block mb-2 font-medium">
            Icon
          </label>

          {oldIcon && (

            <img
              src={oldIcon}
              className="w-16 h-16 mb-3"
            />

          )}

          <input
            type="file"
            onChange={(e)=>
              setIcon(e.target.files?.[0] || null)
            }
          />

        </div>



        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Update Category
        </button>


      </form>

    </div>

  )

}