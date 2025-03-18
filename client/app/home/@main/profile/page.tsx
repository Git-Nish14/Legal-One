"use client";
import { UPDATE_LAWYER_PROFILE } from "@/graphql/mutations";
import { GET_DATA } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Loader,
  CheckCircle,
  AlertTriangle,
  User,
  Mail,
  Briefcase,
  MapPin,
  FileText,
  CaseSensitive,
} from "lucide-react";
import ProfileRolePageSkeleton from "@/components/loading/ProfileRolePageSkeleton";

const ProfilePage = () => {
  const { data, loading, error } = useQuery(GET_DATA);
  const [updateProfile, { loading: updating }] = useMutation(
    UPDATE_LAWYER_PROFILE
  );
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState("");

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

  if (loading) return <ProfileRolePageSkeleton />;
  if (error)
    return (
      <p className="text-center text-red-500 text-lg">Error: {error.message}</p>
    );
  if (!user)
    return <p className="text-center text-gray-500 text-lg">No data found</p>;

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
      setUpdateSuccess(true);
      setUpdateError("");
      alert("Profile updated successfully!");
    } catch (err: any) {
      setUpdateSuccess(false);
      setUpdateError(err.message);
      alert("Error updating profile: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-full sm:max-w-3xl bg-white shadow-lg rounded-xl p-4 sm:p-6 mx-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <User className="w-7 h-7 text-blue-600" />
          Profile
        </h1>
        <p className="text-gray-700 flex items-center gap-2">
          <Mail className="w-5 h-5 text-gray-500" />
          {user.email}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-gray-500" />
          Role: {user.role}
        </p>

        {user.role === "LAWYER" && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
              Update Profile
            </h2>

            {/* Bio */}
            <div className="flex flex-col">
              <label className="text-gray-700 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Bio:
              </label>
              <input
                {...register("bio", { required: "Bio is required" })}
                type="text"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.bio && (
                <p className="text-red-500">{errors.bio.message as string}</p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="text-gray-700 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Description:
              </label>
              <input
                {...register("description", {
                  required: "Description is required",
                })}
                type="text"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.description && (
                <p className="text-red-500">
                  {errors.description.message as string}
                </p>
              )}
            </div>

            {/* Fee */}
            <div className="flex flex-col">
              <label className="text-gray-700 flex items-center gap-2">
                <CaseSensitive className="w-5 h-5 text-blue-600" />
                Fee:
              </label>
              <input
                {...register("fee", { required: "Fee is required" })}
                type="number"
                step="0.01"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.fee && (
                <p className="text-red-500">{errors.fee.message as string}</p>
              )}
            </div>

            {/* Experience */}
            <div className="flex flex-col">
              <label className="text-gray-700 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Experience (years):
              </label>
              <input
                {...register("experience", {
                  required: "Experience is required",
                })}
                type="number"
                step="0.1"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.experience && (
                <p className="text-red-500">
                  {errors.experience.message as string}
                </p>
              )}
            </div>

            {/* Expertise */}
            <div className="flex flex-col">
              <label className="text-gray-700 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Expertise:
              </label>
              <input
                {...register("expertise", {
                  required: "Expertise is required",
                })}
                type="text"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.expertise && (
                <p className="text-red-500">
                  {errors.expertise.message as string}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="text-gray-700 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Location:
              </label>
              <input
                {...register("location", { required: "Location is required" })}
                type="text"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.location && (
                <p className="text-red-500">
                  {errors.location.message as string}
                </p>
              )}
            </div>

            {/* Cases Handled */}
            <div className="flex flex-col">
              <label className="text-gray-700 flex items-center gap-2">
                <CaseSensitive className="w-5 h-5 text-blue-600" />
                Cases Handled:
              </label>
              <input
                {...register("casesHandled", {
                  required: "Cases handled is required",
                })}
                type="number"
                step="1"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.casesHandled && (
                <p className="text-red-500">
                  {errors.casesHandled.message as string}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={updating}
            >
              {updating ? (
                <span className="flex justify-center items-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  Updating...
                </span>
              ) : (
                "Update Profile"
              )}
            </button>

            {/* Update Success Message */}
            {updateSuccess && (
              <p className="text-green-600 flex items-center gap-2 mt-2">
                <CheckCircle className="w-5 h-5" /> Profile updated successfully!
              </p>
            )}

            {/* Update Error Message */}
            {updateError && (
              <p className="text-red-600 flex items-center gap-2 mt-2">
                <AlertTriangle className="w-5 h-5" /> {updateError}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
