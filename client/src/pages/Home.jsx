import { NavLink } from "react-router-dom";
import SecretInput from "../components/Secrets/SecretInput";
import SecretList from "../components/Secrets/SecretList";
import { useContext } from "react";
import { GlobalContext } from "../context";

export default function Home() {
  const { user } = useContext(GlobalContext);

  return (
    <div className="flex flex-col items-center gap-10 my-20">
      <nav className="p-2 bg-yellow-500">
        <ul>
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul>
      </nav>
      <h1>Hi, {user.username}</h1>
      <SecretInput />
      <SecretList />
    </div>
  );
}
