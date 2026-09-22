import { useState } from "react";

export const Toggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <span> ▶ </span> {isOpen ? "Hide Details" : "Show Details"}
      </button>
      {isOpen && (
        <div
          style={{
            border: "1px solid",
            borderRadius: "10px",
            marginTop: "15px",
            padding: "15px",
          }}
        >
          <h3>Condition report</h3>
          <p>
            Near Mint, sleeved since purchase. Small edge wear on the bottom
            right corner, visible under direct light. Ships in a toploader.
          </p>
        </div>
      )}
    </div>
  );
};
