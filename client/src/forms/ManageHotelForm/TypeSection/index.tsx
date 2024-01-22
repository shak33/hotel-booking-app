import { DeepMap, FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import * as z from "zod";

import { formSchema } from "@/forms/schemas/hotel";

interface TypeSectionProps {
  register: UseFormRegister<z.infer<typeof formSchema>>;
  errors: DeepMap<FieldValues, FieldError>;
  typeWatch: string;
}

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

export const TypeSection = ({
  register,
  errors,
  typeWatch,
} : TypeSectionProps) => {
  return (
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
      {errors.type ? (
        <span className="text-red-500 text-sm font-bold">{errors.type.message}</span>
      ) : null}
    </div>
  )
}