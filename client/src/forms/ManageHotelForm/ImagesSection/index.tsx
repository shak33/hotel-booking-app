import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import * as z from "zod";

import { formSchema } from "@/forms/schemas/hotel";

interface ImagesSectionProps {
  register: UseFormRegister<z.infer<typeof formSchema>>;
  errors: DeepMap<z.infer<typeof formSchema>, FieldError>;
}

export const ImagesSection = ({
  register,
  errors,
} : ImagesSectionProps) => {
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles")}
        />
      </div>
      {errors.imageFiles ? (
        <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
      ) : null}
    </div>
  )
}