import { useContext } from "react";
import { GlobalContext } from "../../context";

export default function SecretList() {
  const { secretList, pending } = useContext(GlobalContext);
  return (
    <div>
      <h1>Secret List</h1>
      {pending ? (
        <h1>Loading Secrets Please wait..</h1>
      ) : (
        <div className="my-10">
          {secretList.map((secret) => (
            <div key={secret._id} className="p-3 my-5 border border-red-500">
              <h3>Anonymous User</h3>
              <h5>{secret.title}</h5>
              <p>{secret.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
