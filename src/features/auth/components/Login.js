import { Link } from "react-router-dom";
import { selectError, selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { loginUserAsync } from "../authSlice";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../user/userSlice";

export default function Login() {
  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && userInfo && userInfo?.role === "user" && (
        <Navigate to="/" replace={true}></Navigate>
      )}
      {user && userInfo && userInfo?.role === "admin" && (
        <Navigate to="/admin" replace={true}></Navigate>
      )}

      <div className="flex min-h-full flex-1 flex-col justify-center px-12 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white shadow-2xl rounded-md rounded-b-none mt-20 ">
          <h2 className=" py-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className=" sm:mx-auto sm:w-full sm:max-w-sm bg-white shadow-2xl px-4 py-4 rounded-md rounded-t-none">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                loginUserAsync({ email: data.email, password: data.password })
              );
            })}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      // eslint-disable-next-line
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {error && (
                <p className="text-red-500">{error || error.message}</p>
              )}
            </div>

            <div className="flex items-center justify-center ">
              <button
                type="submit"
                className="flex  w-[25%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="flex items-center mt-2">
            <div className="border-b-2  border-gray-300 flex-grow"></div>
            <p className="mx-4 text-gray-900 font-medium">Or</p>
            <div className="border-b-2 border-gray-300 flex-grow"></div>
          </div>

          <p className="mt-2 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
