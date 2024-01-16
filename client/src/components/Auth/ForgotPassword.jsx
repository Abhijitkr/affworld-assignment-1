import { useForm } from "react-hook-form";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleForgotPassword(data) {
    console.log(data);
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgotPassword",
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
        console.log("Success:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit((data, e) => {
          e.preventDefault();
          handleForgotPassword(data);
        })}
      >
        <div>
          <input
            type="email"
            placeholder="Enter Email"
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
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
