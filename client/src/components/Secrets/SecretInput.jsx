import { useContext } from "react";
import { GlobalContext } from "../../context";
import { useForm } from "react-hook-form";

export default function SecretInput() {
  const { fetchListOfSecrets } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function handleSaveSecret(secret) {
    try {
      const response = await fetch("http://localhost:5000/api/secrets/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(secret),
      });
      if (response.ok) {
        reset({
          title: "",
          description: "",
        });

        fetchListOfSecrets();
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      className="flex flex-col gap-5"
      noValidate
      onSubmit={handleSubmit((data, e) => {
        e.preventDefault();
        handleSaveSecret(data);
      })}
    >
      <h1 className="text-center">Secret Input</h1>
      <div className="flex flex-col gap-5 w-80">
        <div>
          <input
            type="text"
            id="title"
            className="w-full p-2 border border-red-500"
            placeholder="Secret Title"
            {...register("title", {
              required: "Secret Title is required",
            })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <textarea
            className="w-full p-2 border border-red-500"
            id="description"
            placeholder="Secret Description"
            {...register("description", {
              required: "Secret Description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <button type="submit" className="py-2 text-lg border border-red-500">
          Submit Secret
        </button>
      </div>
    </form>
  );
}
