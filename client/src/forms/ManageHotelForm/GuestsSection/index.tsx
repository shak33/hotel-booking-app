import { UseFormRegister } from "react-hook-form";
import * as z from "zod";

import { formSchema } from "@/forms/schemas/hotel";

interface GuestsSectionProps {
  register: UseFormRegister<z.infer<typeof formSchema>>;
}

export const GuestsSection = ({
  register,
} : GuestsSectionProps) => {
  return (
      <div className="">
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 gap-5 p-6 bg-gray-300">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            type="number"
            className="border rounded w-full py-2 px-3 font-normal"
            min="1"
            {...register("adultCount", {
              valueAsNumber: true,
            })}
          />
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            type="number"
            className="border rounded w-full py-2 px-3 font-normal"
            min="0"
            {...register("childrenCount", {
              valueAsNumber: true,
            })}
          />
        </label>
      </div>
    </div>
  )
}