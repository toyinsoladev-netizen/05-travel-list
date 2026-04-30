import { useState } from "react";

export default function PackingListForm({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState();

  // Prevent the form from submitting and refreshing the page
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) {
      alert("Please enter an item.");
      return;
    }

    const newItem = {
      id: Date.now(), // Unique ID based on timestamp
      description,
      quantity,
      packed: false,
    };
    console.log("New item added:", newItem);

    onAddItem(newItem);

    // Clear the form fields after submission
    setDescription("");
    setQuantity("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What items are you bringing? 🤩</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        <option value="">- Select quantity -</option>
        {Array.from({ length: 20 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
