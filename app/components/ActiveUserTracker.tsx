"use client";

import useActiveUser from "./useActiveUser";

export default function ActiveUserTracker() {
  useActiveUser();
  return null; // kuch render nahi karega
}