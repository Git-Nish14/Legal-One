"use client";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const GET_DATA = gql`
  query getdata {
    getData {
      ... on User {
        id
        name
        email
        role
      }
      ... on Lawyer {
        id
        name
        email
        role
        fee
        experience
        expertise
        casesHandled
        approvalStatus
        location
        bio
        description
      }
      ... on Admin {
        id
        name
        email
        role
      }
    }
  }
`;

export const UPDATE_LAWYER_PROFILE = gql`
  mutation UPDATE_LAWYER_PROFILE(
    $fee: Float!
    $experience: Float!
    $expertise: String!
    $location: String!
    $bio: String!
    $description: String!
    $casesHandled: Float!
  ) {
    updateLawyerProfile(
      fee: $fee
      experience: $experience
      expertise: $expertise
      location: $location
      bio: $bio
      description: $description
      casesHandled: $casesHandled
    ) {
      id
      name
      fee
      experience
      expertise
      location
      bio
      description
      casesHandled
      updatedAt
    }
  }
`;

const ProfilePage = () => {
  const { data, loading, error } = useQuery(GET_DATA);
  const [updateProfile] = useMutation(UPDATE_LAWYER_PROFILE);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const user = data?.getData;

  useEffect(() => {
    if (user?.role === "LAWYER") {
      setValue("fee", user.fee || "");
      setValue("experience", user.experience || "");
      setValue("expertise", user.expertise || "");
      setValue("location", user.location || "");
      setValue("bio", user.bio || "");
      setValue("description", user.description || "");
      setValue("casesHandled", user.casesHandled || "");
    }
  }, [user, setValue]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  if (!user) return <p className="text-center text-gray-500">No data found</p>;

  const onSubmit = async (formData: any) => {
    try {
      await updateProfile({
        variables: {
          fee: parseFloat(formData.fee),
          experience: parseFloat(formData.experience),
          expertise: formData.expertise,
          location: formData.location,
          bio: formData.bio,
          description: formData.description,
          casesHandled: parseFloat(formData.casesHandled),
        },
      });
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="text-gray-700">Name: {user.name}</p>
      <p className="text-gray-700">Email: {user.email}</p>
      <p className="text-gray-700">Role: {user.role}</p>

      {user.role === "LAWYER" && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Update Profile</h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Fee */}
            <label className="block">
              Fee:
              <input
                {...register("fee", { required: "Fee is required" })}
                type="number"
                step="0.01"
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
              {errors.fee && (
                <p className="text-red-500 text-sm">
                  {errors.fee.message as string}
                </p>
              )}
            </label>

            {/* Experience */}
            <label className="block">
              Experience (years):
              <input
                {...register("experience", {
                  required: "Experience is required",
                })}
                type="number"
                step="0.1"
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">
                  {errors.experience.message as string}
                </p>
              )}
            </label>

            {/* Expertise */}
            <label className="block">
              Expertise:
              <input
                {...register("expertise", {
                  required: "Expertise is required",
                })}
                type="text"
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
              {errors.expertise && (
                <p className="text-red-500 text-sm">
                  {errors.expertise.message as string}
                </p>
              )}
            </label>

            {/* Location */}
            <label className="block">
              Location:
              <input
                {...register("location", { required: "Location is required" })}
                type="text"
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message as string}
                </p>
              )}
            </label>

            {/* Bio */}
            <label className="block">
              Bio:
              <input
                {...register("bio", { required: "Bio is required" })}
                type="text"
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
              {errors.bio && (
                <p className="text-red-500 text-sm">
                  {errors.bio.message as string}
                </p>
              )}
            </label>

            {/* Description */}
            <label className="block">
              Description:
              <input
                {...register("description", {
                  required: "Description is required",
                })}
                type="text"
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message as string}
                </p>
              )}
            </label>

            {/* Cases Handled */}
            <label className="block">
              Cases Handled:
              <input
                {...register("casesHandled", {
                  required: "Cases handled is required",
                })}
                type="number"
                step="1"
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
              {errors.casesHandled && (
                <p className="text-red-500 text-sm">
                  {errors.casesHandled.message as string}
                </p>
              )}
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
