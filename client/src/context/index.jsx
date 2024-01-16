import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [secretList, setSecretList] = useState([]);
  const [pending, setPending] = useState(false);

  async function fetchListOfSecrets() {
    setPending(true);
    try {
      const response = await fetch("http://localhost:5000/api/secrets");
      const data = await response.json();
      if (data && data.secrets && data.secrets.length) {
        setSecretList(data.secrets);
        setPending(false);
      }
    } catch (error) {
      console.log(error);
      setPending(false);
    }
    console.log(secretList);
  }

  //TODO: Adds Edit and Delete functionality

  function storeTokenInLS(userToken) {
    return localStorage.setItem("token", userToken);
  }

  return (
    <GlobalContext.Provider
      value={{
        secretList,
        setSecretList,
        pending,
        setPending,
        fetchListOfSecrets,
        storeTokenInLS,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
