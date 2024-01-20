import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { useIsUserLoggedIn } from '@/hooks/api/users/useIsUserLoggedIn';

export const useLogOutUser = () => {
  const { setUserLoggedIn } = useIsUserLoggedIn();
  const logOutUser = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}auth/logout`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUserLoggedIn(false);
      }
    },
  });

  return logOutUser;
}