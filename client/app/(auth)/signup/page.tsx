"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { USER_SIGNUP, LAWYER_SIGNUP } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

type UserSignupInputs = {
  name: string;
  email: string;
  password: string;
};

type LawyerSignupInputs = UserSignupInputs & {
  description: string;
  bio: string;
  location: string;
  expertise: string;
  experience: number;
  fee: number;
  casesHandled: number;
  image: string;
};

const Signup: React.FC = () => {
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const CLOUDINARY_UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  const [isLawyer, setIsLawyer] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  // State for User Signup
  const [userData, setUserData] = useState<UserSignupInputs>({
    name: "",
    email: "",
    password: "",
  });

  // State for Lawyer Signup
  const [lawyerData, setLawyerData] = useState<LawyerSignupInputs>({
    name: "",
    email: "",
    password: "",
    description: "",
    bio: "",
    location: "",
    expertise: "",
    experience: 0,
    fee: 0,
    casesHandled: 0,
    image: "",
  });

  const isLawyerStep1Complete =
    lawyerData.name.trim() !== "" &&
    lawyerData.email.trim() !== "" &&
    lawyerData.password.trim() !== "";

  const [userSignup, { loading: userLoading, error: userError }] =
    useMutation(USER_SIGNUP);
  const [lawyerSignup, { loading: lawyerLoading, error: lawyerError }] =
    useMutation(LAWYER_SIGNUP);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const formattedValue =
      type === "number" ? (value === "" ? "" : parseFloat(value)) : value;

    if (isLawyer) {
      setLawyerData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: formattedValue }));
    }
  };

  // Handle Cloudinary Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 200KB)
    if (file.size > 200 * 1024) {
      alert("Image must be less than 200KB!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    // Generate a unique filename using UUID
    const uniqueFilename = uuidv4();
    formData.append("public_id", uniqueFilename); // Store the image name as UUID

    // Upload image without transformations (save credits)
    formData.append("folder", "lawyer_images"); // Optional: Store in a specific folder

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      setLawyerData((prev) => ({ ...prev, image: response.data.secure_url }));
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      alert("Image upload failed. Please try again.");
    }
  };

  const handleUserSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await userSignup({ variables: userData });

      if (response.data?.createUser?.token) {
        Cookies.set(
          "Authorization",
          "Bearer " + response.data.createUser.token,
          {
            expires: 7,
          }
        );
        // alert("User signup successful!");
        router.push("/home");
      }
    } catch (err) {
      console.error("User Signup Error:", err);
    }
  };

  const handleLawyerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await lawyerSignup({ variables: lawyerData });

      if (response.data?.createLawyer?.token) {
        Cookies.set(
          "Authorization",
          "Bearer " + response.data.createLawyer.token,
          {
            expires: 7,
          }
        );
        // alert("Lawyer signup successful!");
        router.push("/home");
      }
    } catch (err) {
      console.error("Lawyer Signup Error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-2xl rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        {/* User/Lawyer Selection */}
        <div className="flex mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => {
              setIsLawyer(false);
              setStep(1);
            }}
            className={`w-1/2 py-2 text-lg font-medium transition ${
              !isLawyer
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            User
          </button>
          <button
            onClick={() => {
              setIsLawyer(true);
              setStep(1);
            }}
            className={`w-1/2 py-2 text-lg font-medium transition ${
              isLawyer
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Lawyer
          </button>
        </div>

        {/* Step 1: Common Form for Users and Lawyers */}
        {step === 1 && (
          <form
            onSubmit={
              isLawyer
                ? (e) => {
                    e.preventDefault();
                    setStep(2);
                  }
                : handleUserSignup
            }
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                name="name"
                value={isLawyer ? lawyerData.name : userData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                name="email"
                value={isLawyer ? lawyerData.email : userData.email}
                onChange={(e) => {
                  e.target.value = e.target.value.toLowerCase();
                  handleChange(e);
                }}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                name="password"
                value={isLawyer ? lawyerData.password : userData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 text-lg font-semibold rounded-lg transition ${
                isLawyer
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={isLawyer && !isLawyerStep1Complete}
            >
              {isLawyer ? "Next" : "Sign Up"}
            </button>
          </form>
        )}

        {/* Step 2: Lawyer-Specific Fields */}
        {isLawyer && step === 2 && (
          <form onSubmit={handleLawyerSignup} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              {lawyerData.image && (
                <img
                  src={lawyerData.image}
                  alt="Preview"
                  className="mt-2 w-full h-40 object-cover rounded-lg shadow-md"
                />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                name="description"
                value={lawyerData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Bio</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                name="bio"
                value={lawyerData.bio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Location
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                name="location"
                value={lawyerData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  Expertise
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="expertise"
                  value={lawyerData.expertise}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Experience (years)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="experience"
                  value={lawyerData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium">Fees</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="fee"
                  value={lawyerData.fee}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Cases Handled
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="casesHandled"
                  value={lawyerData.casesHandled}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 text-lg font-semibold rounded-lg hover:bg-green-600 transition"
            >
              Sign Up as Lawyer
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
