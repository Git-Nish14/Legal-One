"use client";

import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { gql } from "@apollo/client";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { GET_LAWYER_BY_ID } from "@/graphql/queries";
import { CREATE_SESSION } from "@/graphql/mutations";

interface FormData {
  title: string;
  description: string;
}

export default function Page() {
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

  if (loading)
    return <div className="text-center text-gray-700">Loading...</div>;
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {lawyer && (
          <>
            <Image
              src={lawyer.image}
              alt={lawyer.name}
              width={150}
              height={150}
              className="w-40 h-40 object-cover rounded-full mx-auto"
              unoptimized
            />
            <h1 className="text-2xl font-bold text-center mt-4">
              {lawyer.name}
            </h1>
            <p className="text-center text-gray-600">{lawyer.expertise}</p>
            <p className="text-gray-700 mt-4">Fee- {lawyer.fee}</p>
          </>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full p-2 border border-gray-300 rounded"
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
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={mutationLoading}
          >
            {mutationLoading ? "Creating..." : "Create Session"}
          </button>
          {mutationError && (
            <p className="text-red-500 text-sm">{mutationError.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
