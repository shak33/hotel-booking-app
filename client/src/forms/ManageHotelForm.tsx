"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { formSchema } from '@/forms/schemas/hotel';

const hotelTypes = [
  "Budget",
  "Boutique",
  "Luxury",
  "Ski Resort",
  "Business",
  "Family",
  "Romantic",
  "Hiking Resort",
  "Cabin",
  "Beach Resort",
  "Golf Resort",
  "Motel",
  "All Inclusive",
  "Pet Friendly",
  "Self Catering",
];

const hotelFacilities = [
  "Free WiFi",
  "Parking",
  "Airport Shuttle",
  "Family Rooms",
  "Non-Smoking Rooms",
  "Outdoor Pool",
  "Spa",
  "Fitness Center",
];

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
      imageUrls: [],
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = form;
  const typeWatch = watch('type');
  // const createHotel = useCreateHotel(form);

  // const onSubmit = (data: z.infer<typeof formSchema>) => {
  //   createHotel.mutate(data);
  // };

  return (
    <form className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("name")}
          />
          {errors.name ? (
            <span className="text-red-500">{errors.name.message}</span>
          ) : null}
        </label>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            City
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("city")}
            />
            {errors.city ? (
              <span className="text-red-500">{errors.city.message}</span>
            ) : null}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Country
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("country")}
            />
            {errors.country ? (
              <span className="text-red-500">{errors.country.message}</span>
            ) : null}
          </label>
        </div>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Description
          <textarea
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("description")}
            rows={10}
          >
            
          </textarea>
          {errors.description ? (
            <span className="text-red-500">{errors.description.message}</span>
          ) : null}
        </label>
        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
          Price per night
          <input
            type="number"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("pricePerNight")}
          />
          {errors.pricePerNight ? (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
          ) : null}
        </label>
        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
          Star Rating
          <select
            {...register('starRating')}
            className="border rounded w-full py-1 px-2 font-normal"
          >
            <option value="" className="text-sm font-bold">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option value={rating} className="text-sm font-bold" key={`hotel_rating_${rating}`}>
                {rating}
              </option>
            ))}
          </select>
          {errors.starRating ? (
            <span className="text-red-500">{errors.starRating.message}</span>
          ) : null}
        </label>
      </div>
      <div className="">
        <h2 className="text-2xl font-bold mb-3">
          Type
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {hotelTypes.map((type) => (
            <label
              className={`${typeWatch === type ? 'bg-blue-300' : 'bg-gray-300'} ' cursor-pointer text-sm rounded-full px-4 py-2 font-semibold'`}
              key={`hotel_type_${type}`}
            >
              <input
                type="radio"
                className="hidden"
                {...register("type")}
                value={type}
              />
              <span>
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>
    </form>
  )
};