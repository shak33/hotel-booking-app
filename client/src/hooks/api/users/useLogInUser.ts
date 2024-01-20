import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { redirect } from "next/navigation";

import { formSchema } from "@/app/login/page";

type FormData = z.infer<typeof formSchema>;

export const useLogInUser = (form: UseFormReturn<FormData>) => {
  const queryclient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}users/login`,
        data,
        {
          withCredentials: true,
        },
      );
    },
    onSuccess: () => {
      form.reset();
      queryclient.invalidateQueries({
        queryKey: ["user"],
      });
      redirect("/");
    },
  });

  return createMutation;
};