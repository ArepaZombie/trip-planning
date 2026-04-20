import type { PackingItem } from "../../types";
import Icon from "../Utils/Icon";

export default function InventoryPanel({ items }: { items: PackingItem[] }) {
  return (
    <div className="inventory-panel">
      <h2>ITEMS</h2>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.icon}</p>
          <Icon icon={item.icon} color="--blue-dark" />
        </div>
      ))}
    </div>
  );
}
