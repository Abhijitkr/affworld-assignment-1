import SecretInput from "../components/Secrets/SecretInput";
import SecretList from "../components/Secrets/SecretList";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10 my-20">
      <SecretInput />
      <SecretList />
    </div>
  );
}
