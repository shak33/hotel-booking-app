import { create } from 'zustand';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface IsUserLoggedInState {
  isUserLoggedIn: () => boolean;
}

export const useIsUserLoggedIn = create<IsUserLoggedInState>(() => ({
  isUserLoggedIn: () => {
    const isLoggedIn = useQuery({
      queryKey: ['isUserLoggedIn'],
      queryFn: async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}auth/validate-token`, {
          withCredentials: true,
        });
      },
      staleTime: 5 * 60 * 1000,
    });

    return isLoggedIn.isSuccess;
  },
}));