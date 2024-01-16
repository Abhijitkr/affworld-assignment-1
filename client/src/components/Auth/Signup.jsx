import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Signup() {
  const { storeTokenInLS } = useContext(GlobalContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function saveUser(user) {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        storeTokenInLS(data.token);
        reset({
          username: "",
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        const error = await response.json();
        console.log(error.msg);
      }
    } catch (error) {
      console.log("register", error);
    }
  }

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit((data, e) => {
          e.preventDefault();
          saveUser(data);
        })}
      >
        <div>
          <input
            type="text"
            placeholder="Username"
            id="username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            id="email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                message: "email not valid",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            id="password"
            {...register("password", {
              required: "password is required",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                message: `- at least 8 characters\n
                  - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                  - Can contain special characters`,
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div>
          <span>
            Already a user? <Link to="/login">Login</Link>
          </span>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
    // <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
    //   <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //     <img
    //       className="w-auto h-10 mx-auto"
    //       src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    //       alt="Your Company"
    //     />
    //     <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
    //       Sign in to your account
    //     </h2>
    //   </div>

    //   <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //     <form className="space-y-6" action="#" method="POST">
    //       <div>
    //         <label
    //           htmlFor="email"
    //           className="block text-sm font-medium leading-6 text-gray-900"
    //         >
    //           Email address
    //         </label>
    //         <div className="mt-2">
    //           <input
    //             id="email"
    //             name="email"
    //             type="email"
    //             autoComplete="email"
    //             required
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <div className="flex items-center justify-between">
    //           <label
    //             htmlFor="password"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Password
    //           </label>
    //           <div className="text-sm">
    //             <a
    //               href="#"
    //               className="font-semibold text-indigo-600 hover:text-indigo-500"
    //             >
    //               Forgot password?
    //             </a>
    //           </div>
    //         </div>
    //         <div className="mt-2">
    //           <input
    //             id="password"
    //             name="password"
    //             type="password"
    //             autoComplete="current-password"
    //             required
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <button
    //           type="submit"
    //           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //         >
    //           Sign in
    //         </button>
    //       </div>
    //     </form>

    //     <p className="mt-10 text-sm text-center text-gray-500">
    //       Not a member?{" "}
    //       <a
    //         href="#"
    //         className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
    //       >
    //         Start a 14 day free trial
    //       </a>
    //     </p>
    //   </div>
    // </div>
  );
}
