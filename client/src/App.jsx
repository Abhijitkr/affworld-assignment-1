import { useContext } from "react";
import { GlobalContext } from "./context";
import axios from "axios";

function App() {
  const { formData, setFormData } = useContext(GlobalContext);

  console.log(formData);

  async function handleSaveSecret() {
    const response = await axios.post("http://localhost:5000/api/secrets/add", {
      title: formData.title,
      description: formData.description,
    });
    const result = await response.data;
    console.log(result);

    if (result) {
      setFormData({
        title: "",
        description: "",
      });
    }
  }

  return (
    // <div>
    //   <section className="w-full py-12 md:py-24 lg:py-32">
    //     <div className="container px-4 md:px-6">
    //       <div className="flex flex-col items-center justify-center space-y-4 text-center">
    //         <div className="space-y-2">
    //           <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
    //             Share Your Secret
    //           </h1>
    //           <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
    //             Share your secret with us. Your identity will remain anonymous.
    //           </p>
    //         </div>
    //         <div className="w-full max-w-md">
    //           <input
    //             className="w-full p-2 mb-2 border border-gray-200 rounded-md dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
    //             placeholder="Title of your secret..."
    //           />
    //           <textarea
    //             className="w-full h-24 p-2 border border-gray-200 rounded-md dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
    //             placeholder="Type your secret here..."
    //           />
    //           <button className="w-full mt-4">Share Secret</button>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <section className="w-full py-12 bg-gray-100 md:py-24 lg:py-32 dark:bg-gray-800">
    //     <div className="container px-4 md:px-6">
    //       <div className="flex flex-col items-center justify-center space-y-4 text-center">
    //         <div className="space-y-2">
    //           <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
    //             Secrets Shared
    //           </h1>
    //           <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
    //             Read the secrets shared by others. Remember, respect everyone's
    //             privacy.
    //           </p>
    //         </div>
    //         <div className="grid w-full max-w-2xl gap-4">
    //           <div className="p-4">
    //             <div>
    //               <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
    //                 Title 1
    //               </h2>
    //               <p className="mt-2 text-gray-600 dark:text-gray-400">
    //                 Secret 1...
    //               </p>
    //             </div>
    //           </div>
    //           <div className="p-4">
    //             <div>
    //               <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
    //                 Title 2
    //               </h2>
    //               <p className="mt-2 text-gray-600 dark:text-gray-400">
    //                 Secret 2...
    //               </p>
    //             </div>
    //           </div>
    //           <div className="p-4">
    //             <div>
    //               <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
    //                 Title 3
    //               </h2>
    //               <p className="mt-2 text-gray-600 dark:text-gray-400">
    //                 Secret 3...
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <div className="flex flex-col items-center gap-10 my-20">
      <h1>Secret Input</h1>
      <div className="flex flex-col gap-5 w-80">
        <input
          type="text"
          className="p-2 border border-red-500"
          placeholder="Secret Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          className="p-2 border border-red-500"
          name=""
          id=""
          value={formData.description}
          cols="30"
          rows="4"
          placeholder="Secret Description"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
        <button
          onClick={handleSaveSecret}
          className="py-2 text-lg border border-red-500"
        >
          Submit Secret
        </button>
      </div>
    </div>
  );
}

export default App;
