import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalContext } from "./context";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Logout from "./components/Auth/Logout";
import Protected from "./components/Auth/Protected";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

function App() {
  const { fetchListOfSecrets } = useContext(GlobalContext);

  useEffect(() => {
    fetchListOfSecrets();
  }, []);

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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
