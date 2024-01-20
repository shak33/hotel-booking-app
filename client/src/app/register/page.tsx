"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

import { useRegisterUser } from '@/hooks/api/users/useRegisterUser';

export const formSchema = z.object({
  firstName: z.string().min(3, { message: 'First name must be at least 3 characters' }),
  lastName: z.string().min(3, { message: 'Last name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  repeatPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
    }
  });
  const {
    handleSubmit,
    formState: {
      errors,
    },
    register,
  } = form;
  const registerUser = useRegisterUser(form);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    registerUser.mutate(data);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input className="border rounded w-full py-1 px-2 font-normal" {...register('firstName')} />
          {errors.firstName ? <span className="text-red-500">{errors.firstName.message}</span> : null}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input className="border rounded w-full py-1 px-2 font-normal" {...register('lastName')} />
          {errors.lastName ? <span className="text-red-500">{errors.lastName.message}</span> : null}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input className="border rounded w-full py-1 px-2 font-normal" {...register('email')} />
        {errors.email ? <span className="text-red-500">{errors.email.message}</span> : null}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input className="border rounded w-full py-1 px-2 font-normal" {...register('password')} />
        {errors.password ? <span className="text-red-500">{errors.password.message}</span> : null}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Repeat Password
        <input className="border rounded w-full py-1 px-2 font-normal" {...register('repeatPassword')} />
        {errors.repeatPassword ? <span className="text-red-500">{errors.repeatPassword.message}</span> : null}
      </label>
      <div className="flex items-center justify-between">
        <span className="text-sm">
          Have an account already? <Link className="underline" href="/register">Click here to log in</Link>
        </span>
        <button className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl" type="submit">
          Create Account
        </button>
      </div>
    </form>
  )
}