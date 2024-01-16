import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function checkUser(user) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: user.email,
          password: user.password,
        }
      );
      const result = await response.data;
      console.log(result.response.data);

      if (result) {
        reset({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
