"use client";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { useForm, SubmitHandler } from "react-hook-form";
import { SIGNIN } from "@/graphql/mutations";

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

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    try {
      const response = await signIn({ variables: data });

      if (response.data?.signIn?.token) {
        const bearerToken = `Bearer ${response.data.signIn.token}`;
        Cookies.set("Authorization", bearerToken, { expires: 7 });
        alert("Sign-in successful!");
        console.log("Token stored in cookies:", bearerToken);
      }
    } catch (err) {
      console.error("Sign-in error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 shadow-lg rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>

        {error && <p className="text-red-500">{error.message}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
