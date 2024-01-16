import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function resetPassword(data) {
    console.log(data);
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/resetPassword/${email}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const result = await response.json();
        navigate("/login");
        console.log("Success:", result);
      } else console.log("Wrong token");
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <form
      noValidate
      onSubmit={handleSubmit((data, e) => {
        e.preventDefault();
        resetPassword(data);
      })}
    >
      <div>
        <input
          type="password"
          id="password"
          placeholder="New Password"
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
      {/* <div>
        <input
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "confirm password is required",
            validate: (value, formValues) =>
              value === formValues.password || "password not matching",
          })}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div> */}
      <button type="submit">Reset Password</button>
    </form>
  );
}
