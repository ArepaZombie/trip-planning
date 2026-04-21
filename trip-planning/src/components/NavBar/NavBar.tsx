import Icon from "../Utils/Icon";
import "./NavBar.css";

export default function NavBar({
  previous,
  menu,
  next,
}: {
  previous: string;
  menu: string;
  next: string;
}) {
  return (
    <div className="nav-bar">
      <a href={previous}>
        <Icon icon="fa-chevron-left" color="--stone-light" />
      </a>
      <a href={menu}>
        <Icon icon="fa-window-close" color="--stone-light" />
      </a>
      <a href={next}>
        <Icon icon="fa-chevron-right" color="--stone-light" />
      </a>
    </div>
  );
}
