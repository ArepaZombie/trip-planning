import { useEffect, useState } from "react";
import type { PackingItem } from "../../types";
import Icon from "../Utils/Icon";
import "./InventoryPanel.css";

export default function InventoryPanel({
  items,
  checkItemHandler,
}: {
  items: PackingItem[];
  checkItemHandler: any;
}) {
  return (
    <div className="inventory-container">
      <h2>ITEMS</h2>
      <div className="inventory-panel">
        {items.map((item, i) => (
          <InventoryItem
            key={i}
            item={item}
            index={i}
            checkItemHandler={checkItemHandler}
          />
        ))}
      </div>
    </div>
  );
}

function InventoryItem({
  item,
  index,
  checkItemHandler,
}: {
  item: PackingItem;
  index: number;
  checkItemHandler: any;
}) {
  const [checked, setChecked] = useState<boolean>(item.checked);

  useEffect(() => {
    checkItemHandler(index, checked);
  }, [checked]);

  const checkHandler = () => {
    setChecked(!checked);
  };

  return (
    <div
      key={item.id}
      className={`icon-cell ${checked && "checked"}`}
      onClick={checkHandler}
    >
      <Icon icon={item.icon} color={checked ? "--blue-light" : "--blue-dark"} />
    </div>
  );
}
