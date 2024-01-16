import { useContext } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";

export default function SecretInput() {
  const { formData, setFormData, fetchListOfSecrets } =
    useContext(GlobalContext);

  async function handleSaveSecret() {
    const response = await axios.post("http://localhost:5000/api/secrets/add", {
      title: formData.title,
      description: formData.description,
    });
    const result = await response.data;
    console.log(result);
    fetchListOfSecrets();

    if (result) {
      setFormData({
        title: "",
        description: "",
      });
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center">Secret Input</h1>
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
