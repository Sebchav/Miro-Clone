"use client";

import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="flex items-center gap-x-4 p-5 bg-green-500">
        <div className="hidden lg:flex-1 lg:flex bg-yellow-500">
            {/* ADD SEARCH */}
            Search
        </div>
        <UserButton />
    </div>
  )
}

export default Navbar