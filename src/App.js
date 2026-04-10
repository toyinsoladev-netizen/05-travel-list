import logo from "./assets/logo.png";
import { use, useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Shirts", quantity: 5, packed: true },
  { id: 4, description: "Pants", quantity: 3, packed: false },
  { id: 5, description: "Toothbrush", quantity: 1, packed: true },
];

export default function App() {
  return (
    <div>
      <Logo />
      <PackingListForm />
      <hr />
      <PackingList />
      <Stats />
      <Footer />
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="Logo" style={{ width: "500px" }} />
    </div>
  );
}

function PackingListForm() {
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

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <li key={item.id}>
            <input type="checkbox" />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
              {item.quantity} {item.description}
            </span>
            <button>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <div className="stats">
      <p>📋 You have X items on your list.</p>
      <p>🧳 You have packed X items (x%).</p>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <em>© 2026 Travel List. All rights reserved.</em>
    </footer>
  );
}
