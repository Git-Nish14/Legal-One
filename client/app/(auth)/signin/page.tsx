"use client";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { useForm, SubmitHandler } from "react-hook-form";
import { SIGNIN } from "@/graphql/mutations";
import { useRouter } from "next/navigation";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error.message}</p>
        )}

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            {...register("email", { required: "Email is required" })}
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

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
