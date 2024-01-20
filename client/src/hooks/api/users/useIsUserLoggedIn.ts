import { create } from 'zustand';
import axios from 'axios';

interface IsUserLoggedInState {
  userLoggedIn: boolean;
  setUserLoggedIn: (userLoggedIn: boolean) => void;
  checkIfUserIsLoggedIn: () => void;
}

export const useIsUserLoggedIn = create<IsUserLoggedInState>((set) => ({
  userLoggedIn: false,
  setUserLoggedIn: (userLoggedIn: boolean) => set({ userLoggedIn }),
  checkIfUserIsLoggedIn: async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}auth/validate-token`, {
      withCredentials: true,
    });

    set({
      userLoggedIn: response.status === 200,
    });
  },
}));