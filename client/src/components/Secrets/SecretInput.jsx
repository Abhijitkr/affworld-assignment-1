import { useContext, useState } from "react";
import { GlobalContext } from "../../context";
import { useForm } from "react-hook-form";

export default function SecretInput() {
  const { fetchListOfSecrets, user } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function handleSaveSecret(content) {
    const secret = {
      title: content.title,
      description: content.description,
      userId: user._id,
    };

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
    <div className="container px-4 md:px-6">
      <form
        className="flex flex-col items-center justify-center space-y-4 text-center"
        noValidate
        onSubmit={handleSubmit((data, e) => {
          e.preventDefault();
          handleSaveSecret(data);
        })}
      >
        <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">
          Hi, {user.username}
        </h1>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">
            Share Your Secret
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
            Share your secret with us. Your identity will remain anonymous.
          </p>
        </div>
        <div className="w-full max-w-md">
          <div>
            <input
              className="w-full p-2 border border-gray-200 rounded-md "
              placeholder="Title of your secret..."
              type="text"
              id="title"
              {...register("title", {
                required: "Secret Title is required",
              })}
            />
            {errors.title && (
              <p className="m-2 text-red-500 text-start">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <textarea
              className="w-full h-24 p-2 border border-gray-200 rounded-md "
              placeholder="Type your secret here..."
              id="description"
              {...register("description", {
                required: "Secret Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="mx-2 text-red-500 text-start">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            className="w-full mt-4 bg-[#18181B] text-white py-2 rounded-md"
            type="submit"
          >
            Share Secret
          </button>
        </div>
      </form>
    </div>
    // <form
    //   className="flex flex-col gap-5"
    //   noValidate
    //   onSubmit={handleSubmit((data, e) => {
    //     e.preventDefault();
    //     handleSaveSecret(data);
    //   })}
    // >
    //   <h1 className="text-center">Secret Input</h1>
    //   <div className="flex flex-col gap-5 w-80">
    //     <div>
    //       <input
    //         type="text"
    //         id="title"
    //         className="w-full p-2 border border-red-500"
    //         placeholder="Secret Title"
    //         {...register("title", {
    //           required: "Secret Title is required",
    //         })}
    //       />
    //       {errors.title && (
    //         <p className="text-red-500">{errors.title.message}</p>
    //       )}
    //     </div>
    //     <div>
    //       <textarea
    //         className="w-full p-2 border border-red-500"
    //         id="description"
    //         placeholder="Secret Description"
    //         {...register("description", {
    //           required: "Secret Description is required",
    //         })}
    //       ></textarea>
    //       {errors.description && (
    //         <p className="text-red-500">{errors.description.message}</p>
    //       )}
    //     </div>
    //     <button type="submit" className="py-2 text-lg border border-red-500">
    //       Submit Secret
    //     </button>
    //   </div>
    // </form>
  );
}
