import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { redirect } from 'next/navigation';

import { formSchema } from '@/app/register/page';

type FormData = z.infer<typeof formSchema>;

export const useRegisterUser = (form: UseFormReturn<FormData>) => {
  const queryclient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}users/register`, data, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      form.reset();
      queryclient.invalidateQueries({
        queryKey: ['user'],
      });
      redirect('/');
    }
  });

  return createMutation;
};