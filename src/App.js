import { use, useState } from "react";
import Logo from "./components/Logo";
import PackingListForm from "./components/Form";
import { PackingList } from "./components/PackingList";
import { Stats } from "./components/Stats";

// const initialItems = [
//   { id: 1, description: "Passport", quantity: 1, packed: false },
//   { id: 2, description: "Shirts", quantity: 5, packed: false },
//   { id: 3, description: "Pants", quantity: 3, packed: false },
//   { id: 4, description: "Toothbrush", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);
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

  function handleClearList() {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the entire packing list?",
    );
    if (confirmClear) {
      setItems([]);
    }
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
        onClearList={handleClearList}
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

function Footer() {
  return (
    <footer>
      <em>© 2026 Travel List. All rights reserved.</em>
    </footer>
  );
}
