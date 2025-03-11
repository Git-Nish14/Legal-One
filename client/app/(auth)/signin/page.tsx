"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { useForm, SubmitHandler } from "react-hook-form";
import { SIGNIN } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Icons for password toggle

type SignInFormInputs = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();
  const [signIn, { loading, error }] = useMutation(SIGNIN);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    try {
      const formattedData = {
        ...data,
        email: data.email.toLowerCase(), // Convert email to lowercase
      };

      const response = await signIn({ variables: formattedData });

      if (response.data?.signIn?.token) {
        const bearerToken = `Bearer ${response.data.signIn.token}`;
        Cookies.set("Authorization", bearerToken, { expires: 7 });
        console.log("Token stored in cookies:", bearerToken);
        router.push("/home");
      }
    } catch (err) {
      console.error("Sign-in error:", err);
    }
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/loginbg.jpg')" }} // Make sure the image is in /public
    >
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

      {/* Sign-in Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 bg-white/20 backdrop-blur-lg border border-white/30 p-8 shadow-xl rounded-2xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Welcome Back!
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error.message}</p>
        )}

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-white font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            onInput={(e) =>
              ((e.target as HTMLInputElement).value = (
                e.target as HTMLInputElement
              ).value.toLowerCase())
            }
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input with Eye Toggle */}
        <div className="mb-5 relative">
          <label className="block text-white font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent pr-10"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-300 hover:text-white"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-white mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-300 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
