import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { formSchema } from "@/forms/schemas/register";

import { useIsUserLoggedIn } from "@/hooks/api/users/useIsUserLoggedIn";

type FormData = z.infer<typeof formSchema>;

export const useRegisterUser = (form: UseFormReturn<FormData>) => {
  const router = useRouter();
  const { checkIfUserIsLoggedIn } = useIsUserLoggedIn();

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}users/register`,
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
