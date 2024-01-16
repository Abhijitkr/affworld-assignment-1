import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import { useContext } from "react";

export default function Login() {
  const { storeTokenInLS } = useContext(GlobalContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function checkUser(user) {
    // console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
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
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        const error = await response.json();
        console.log(error.msg);
      }
    } catch (error) {
      console.log("login", error);
    }
  }
  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit((data, e) => {
          e.preventDefault();
          checkUser(data);
          //   console.log(data);
        })}
      >
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
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
          <span>
            <Link to="/forgotPassword">Forgot Password?</Link>
          </span>
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
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
            New user? <Link to="/signup">Register</Link>
          </span>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
