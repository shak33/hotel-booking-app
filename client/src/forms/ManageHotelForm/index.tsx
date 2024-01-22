"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useCreateHotel } from '@/hooks/api/my-hotels/useCreateHotel';

import { formSchema } from '@/forms/schemas/hotel';
import { DetailsSection } from './DetailsSection';
import { TypeSection } from './TypeSection';
import { FacilitiesSection } from './FacilitiesSection';
import { GuestsSection } from './GuestsSection';
import { ImagesSection } from './ImagesSection';

export const ManageHotelForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      city: '',
      country: '',
      description: '',
      type: '',
      adultCount: 1,
      childrenCount: 0,
      facilities: [],
      pricePerNight: 0,
      starRating: 1,
      imageFiles: [],
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = form;
  const typeWatch = watch('type');
  const createHotel = useCreateHotel(form);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createHotel.mutate(data);
  };

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
      <DetailsSection
        register={register}
        errors={errors}
      />
      <TypeSection
        register={register}
        errors={errors}
        typeWatch={typeWatch}
      />
      <FacilitiesSection
        register={register}
        errors={errors}
      />
      <GuestsSection
        register={register}
      />
      <ImagesSection
        register={register}
        errors={errors}
      />
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-4 py-2 font-bold rounded hover:bg-blue-500 text-xl" type="submit">Save</button>
      </div>
    </form>
  )
};