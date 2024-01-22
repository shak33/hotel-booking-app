import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import * as z from "zod";

import { formSchema } from "@/forms/schemas/hotel";

interface DetailsSectionProps {
  register: UseFormRegister<z.infer<typeof formSchema>>;
  errors: DeepMap<z.infer<typeof formSchema>, FieldError>;
}

export const DetailsSection = ({
  register,
  errors,
} : DetailsSectionProps) => {
  return (
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
          {...register("pricePerNight", {
            valueAsNumber: true,
          })}
        />
        {errors.pricePerNight ? (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        ) : null}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          {...register('starRating', {
            valueAsNumber: true,
          })}
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
  )
}