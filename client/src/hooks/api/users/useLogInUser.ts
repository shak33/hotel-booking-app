import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { formSchema } from "@/app/login/page";

import { useIsUserLoggedIn } from "@/hooks/api/users/useIsUserLoggedIn";

type FormData = z.infer<typeof formSchema>;

export const useLogInUser = (form: UseFormReturn<FormData>) => {
  const router = useRouter();
  const { checkIfUserIsLoggedIn } = useIsUserLoggedIn();

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}auth/login`,
        data,
        {
          withCredentials: true,
        },
      );
    },
    onSuccess: () => {
      checkIfUserIsLoggedIn();
      router.push("/");
      form.reset();
    },
  });

  return createMutation;
};
