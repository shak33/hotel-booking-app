"use client";

import Link from 'next/link';

import { useIsUserLoggedIn } from '@/hooks/api/users/useIsUserLoggedIn';
import { useLogOutUser } from '@/hooks/api/users/useLogOutUser';
import { useEffect } from 'react';

export const Header = () => {
  const { userLoggedIn, checkIfUserIsLoggedIn } = useIsUserLoggedIn();
  const logOutUser = useLogOutUser();

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link href="/">
            Hotel Booking App
          </Link>
        </span>
        <span className="flex space-x-2">
          {userLoggedIn ? (
            <>
              <Link className="flex items-center text-white px-3 font-bold hover:bg-blue-600" href="/my-bookings">
                My Bookings
              </Link>
              <Link className="flex items-center text-white px-3 font-bold hover:bg-blue-600" href="/my-hotels">
                My Hotels
              </Link>
              <button className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100" onClick={() => logOutUser.mutate()}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100" href="/login">
                Login
              </Link>
              <Link className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100" href="/register">
                Register
              </Link>
            </>
          )}
        </span>
      </div>
    </div>
  )
}