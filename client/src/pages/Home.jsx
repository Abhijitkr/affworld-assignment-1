import { NavLink } from "react-router-dom";
import SecretInput from "../components/Secrets/SecretInput";
import SecretList from "../components/Secrets/SecretList";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10 my-20">
      <nav className="p-2 bg-yellow-500">
        <ul>
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul>
      </nav>
      <SecretInput />
      <SecretList />
    </div>
  );
}
