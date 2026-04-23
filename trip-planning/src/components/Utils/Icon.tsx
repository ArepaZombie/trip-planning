export default function InventoryPanel({
  icon,
  color,
  onClick,
  style,
}: {
  icon: string;
  color?: string;
  onClick?: any;
  style?: any;
}) {
  return (
    <i
      className={`fa-solid ${icon}`}
      style={{ color: color ? `var(${color})` : "", ...style }}
      onClick={onClick}
    />
  );
}
