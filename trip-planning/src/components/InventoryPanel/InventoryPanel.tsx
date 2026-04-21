import { useState } from "react";
import type { PackingItem } from "../../types";
import Icon from "../Utils/Icon";
import "./InventoryPanel.css";

export default function InventoryPanel({ items }: { items: PackingItem[] }) {
  const [checked, setChecked] = useState<boolean>(false);

  const checkHandler = () => {
    setChecked(!checked);
  };

  return (
    <div className="inventory-container">
      <h2>ITEMS</h2>
      <div className="inventory-panel">
        {items.map((item) => (
          <div
            key={item.id}
            className={`${checked && "checked"}`}
            onClick={checkHandler}
          >
            <Icon
              icon={item.icon}
              color={checked ? "--blue-light" : "--blue-dark"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
