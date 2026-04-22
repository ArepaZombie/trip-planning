export default function InventoryPanel({
  icon,
  color,
}: {
  icon: string;
  color?: string;
}) {
  return (
    <i
      className={`fa-solid ${icon}`}
      style={{ color: color ? `var(${color})` : "" }}
    />
  );
}
