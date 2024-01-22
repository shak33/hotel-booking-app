import * as z from 'zod';

export const formSchema = z.object({
  name: z.string().min(3, { message: 'Hotel name must be at least 3 characters' }),
  city: z.string().min(3, { message: 'City name must be at least 3 characters' }),
  country: z.string().min(3, { message: 'Country name must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  type: z.string().min(3, { message: 'Type must be chosen' }),
  adultCount: z.number().min(1, { message: 'Must have at least 1 adult' }),
  childrenCount: z.number().min(0, { message: 'Must have at least 0 children' }),
  facilities: z.array(z.string()).min(1, { message: 'Must have at least 1 facility' }),
  pricePerNight: z.number().min(1, { message: 'Price per night must be at least 1' }),
  starRating: z.number().min(1, { message: 'Star rating must be at least 1' }),
  imageFiles: z
  .array(
    z.object({
      size: z.number(),
      type: z.string(),
    })
  )
  .min(1, { message: 'Must have at least 1 image' })
  .max(5, { message: 'Must have at most 5 images' })
  .refine(
    (files) => files?.[0]?.size <= 1024 * 1024 * 5,
    `Max image size is 5MB.`
  )
  .refine(
    (files) => 'image/'.includes(files?.[0]?.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  ),
});
