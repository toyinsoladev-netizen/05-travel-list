export function Stats({ numItems, numPacked, percentagePacked }) {
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
