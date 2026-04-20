import type { PackingItem } from "../../types";
import Icon from "../Utils/Icon";

export default function InventoryPanel({ items }: { items: PackingItem[] }) {
  return (
    <div className="inventory-panel">
      {items.map((item) => (
        <div>
          <p>{item.icon}</p>
          <Icon icon={item.icon} color="--blue-dark" key={item.id} />
        </div>
      ))}
    </div>
  );
}
