"use client";

import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { GET_LAWYER_BY_ID } from "@/graphql/queries";
import { CREATE_SESSION } from "@/graphql/mutations";
import { ArrowLeft } from "lucide-react";
import CreateSessionPageSkeleton from "@/components/loading/CreateSessionPageSkeleton";

interface FormData {
  title: string;
  description: string;
}

export default function CreateSessionPage() {
  const { id: lawyerId } = useParams() as { id: string };
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_LAWYER_BY_ID, {
    variables: { lawyerId },
  });

  const [createSession, { loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_SESSION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  if (loading) return <CreateSessionPageSkeleton />;
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  const lawyer = data?.getLawyerById;

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      await createSession({
        variables: { ...formData, lawyerId },
      });
      alert("Session created successfully");
      router.push("/home/sessions/pending");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row ml-4 md:ml-10 p-4 md:p-10 relative">
      {/* Left Section - Lawyer Image */}
      <div className="w-full md:w-1/3 bg-yellow-400 flex justify-center items-center p-6 md:p-10 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
        <Image
          src={lawyer.image}
          alt={lawyer.name}
          width={300}
          height={300}
          className="rounded-full object-cover w-40 h-40 md:w-64 md:h-64 border-8 border-white shadow-lg"
          unoptimized
        />
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-2/3 p-6 md:p-16 bg-white shadow-md flex flex-col justify-center relative rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
        {/* Back Button - Hidden on Mobile */}
        <button
          onClick={() => router.back()}
          className="hidden md:flex absolute top-6 right-6 items-center gap-2 bg-gray-200 px-4 py-2 rounded-md shadow hover:bg-gray-300 transition duration-200"
        >
          <ArrowLeft size={20} className="text-gray-700" />
          <span className="text-gray-700 font-medium">Back</span>
        </button>

        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 text-center">
          Create Session
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium text-center mt-2">
          with {lawyer.name}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-500 transition duration-200 shadow-md"
            disabled={mutationLoading}
          >
            {mutationLoading ? "Creating..." : "Create Session"}
          </button>
          {mutationError && (
            <p className="text-red-500 text-sm mt-2">{mutationError.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
