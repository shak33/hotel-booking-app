"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

import { useLogInUser } from "@/hooks/api/users/useLogInUser";

import { formSchema } from "@/forms/schemas/login";

export default function SignInPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;
  const signInUser = useLogInUser(form);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    signInUser.mutate(data);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Log In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email")}
        />
        {errors.email ? (
          <span className="text-red-500">{errors.email.message}</span>
        ) : null}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password")}
        />
        {errors.password ? (
          <span className="text-red-500">{errors.password.message}</span>
        ) : null}
      </label>
      <div className="flex items-center justify-between">
        <span className="text-sm">
          Not registered?{" "}
          <Link className="underline" href="/register">
            Create an account here
          </Link>
        </span>
        <button
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          type="submit"
        >
          Log In
        </button>
      </div>
    </form>
  );
}
