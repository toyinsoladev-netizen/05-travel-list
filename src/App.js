import logo from "./assets/logo.png";
import { use, useState } from "react";

const initialItems = [
  { id: 1, description: "Passport", quantity: 1, packed: false },
  { id: 2, description: "Shirts", quantity: 5, packed: false },
  { id: 3, description: "Pants", quantity: 3, packed: false },
  { id: 4, description: "Toothbrush", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState([...initialItems]);
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentagePacked =
    numItems === 0 ? 0 : Math.round((numPacked / numItems) * 100);

  function handleAddItem(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  return (
    <div>
      <Logo />
      <PackingListForm onAddItem={handleAddItem} />
      <hr />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats
        items={items}
        numItems={numItems}
        numPacked={numPacked}
        percentagePacked={percentagePacked}
      />
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

function PackingListForm({ onAddItem }) {
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          >
            <input
              type="checkbox"
              value={item.packed}
              onChange={() => onToggleItem(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
              {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stats({ numItems, numPacked, percentagePacked }) {
  if (numItems === 0)
    return (
      <p className="stats">
        📋 Your packing list is empty. Start adding items! 🧳
      </p>
    );

  return (
    <div className="stats">
      <p>📋 You have {numItems} items on your list.</p>
      <p>
        {percentagePacked === 100
          ? "🎉 You have packed all your items! Ready to go! 🧳"
          : `🧳 You have packed ${numPacked} items (${percentagePacked}%).`}
      </p>
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
