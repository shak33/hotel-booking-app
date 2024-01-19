import Link from "next/link"

export const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link href="/">
            Hotel Booking App
          </Link>
        </span>
        <span className="flex space-x-2 items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100">
          <Link href="/sign-in">
            Sign In
          </Link>
        </span>
      </div>
    </div>
  )
}