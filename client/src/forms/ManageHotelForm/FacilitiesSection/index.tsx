import { DeepMap, FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import * as z from "zod";

import { formSchema } from "@/forms/schemas/hotel";

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

interface FacilitiesSectionProps {
  register: UseFormRegister<z.infer<typeof formSchema>>;
  errors: DeepMap<FieldValues, FieldError>;
}

export const FacilitiesSection = ({
  register,
  errors,
} : FacilitiesSectionProps) => {
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-3">
        Facilities
      </h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label
            key={`hotel_facility_${facility}`}
            className="tet-sm flex gap-2 text-gray-700"
          >
            <input
              type="checkbox"
              {...register("facilities")}
              value={facility}
            />
            <span>
              {facility}
            </span>
          </label>
        ))}
      </div>
      {errors.facilities ? (
        <span className="text-red-500 text-sm font-bold">{errors.facilities.message}</span>
      ) : null}
    </div>
  )
}