import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

import { formSchema } from '@/forms/schemas/hotel';

type FormData = z.infer<typeof formSchema>;

export const useCreateHotel = (form: UseFormReturn<FormData>) => {
  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('city', data.city);
      formData.append('country', data.country);
      formData.append('description', data.description);
      formData.append('type', data.type);
      formData.append('adultCount', data.adultCount.toString());
      formData.append('childrenCount', data.childrenCount.toString());
      formData.append('pricePerNight', data.pricePerNight.toString());
      formData.append('starRating', data.starRating.toString());

      data.facilities.forEach((facility, index: number) => {
        formData.append(`facilities[${index}]`, facility);
      });

      Array.from(data.imageFiles).forEach((file) => {
        formData.append('imageFiles', file);
      });

      return await axios.post(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}my-hotels/create`,
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
    },
    onSuccess: () => {
      form.reset();
    },
  });

  return createMutation;
};