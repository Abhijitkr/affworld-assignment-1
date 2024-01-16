import axios from "axios";
import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [secretList, setSecretList] = useState([]);
  const [pending, setPending] = useState(false);

  async function fetchListOfSecrets() {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/secrets");
    const result = await response.data;
    if (result && result.secrets && result.secrets.length) {
      setSecretList(result.secrets);
      setPending(false);
    }
    console.log(secretList);
  }

  //TODO: Adds Edit and Delete functionality

  return (
    <GlobalContext.Provider
      value={{
        secretList,
        setSecretList,
        pending,
        setPending,
        fetchListOfSecrets,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
