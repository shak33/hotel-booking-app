import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

import { formSchema } from '@/app/register/page';

type FormData = z.infer<typeof formSchema>;

export const useRegisterUser = (form: UseFormReturn<FormData>) => {
  const queryclient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await axios.post(`${process.env.API_CLIENT_URL}users/register`, data);
    },
    onSuccess: () => {
      form.reset();
      queryclient.invalidateQueries({
        queryKey: ['user'],
      });
    }
  });

  return createMutation;
};