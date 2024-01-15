import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [secretList, setSecretList] = useState([]);
  const [pending, setPending] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        secretList,
        setSecretList,
        pending,
        setPending,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
