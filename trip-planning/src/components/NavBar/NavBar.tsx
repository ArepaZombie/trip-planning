import Icon from "../Utils/Icon";
import "./NavBar.css";

export default function NavBar({
  previous,
  menu,
  next,
}: {
  previous: any;
  menu: any;
  next: any;
}) {
  return (
    <div className="nav-bar">
      {previous ? (
        <a href={previous}>
          <Icon icon="fa-chevron-left" color="--stone-light" />
        </a>
      ) : (
        <p></p>
      )}
      {menu ? (
        <a href={menu}>
          <Icon icon="fa-window-close" color="--stone-light" />
        </a>
      ) : (
        <p></p>
      )}
      {next ? (
        <a href={next}>
          <Icon icon="fa-chevron-right" color="--stone-light" />
        </a>
      ) : (
        <p></p>
      )}
    </div>
  );
}
