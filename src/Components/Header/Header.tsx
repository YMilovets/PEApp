import clsx from "clsx";
import { useCallback, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../Button";
import { BackwardIcon, ForwardIcon, MenuIcon, SearchIcon } from "../Icons";
import { Input, InputGroup, InputLabel } from "../InputGroup";
import style from "./Header.module.css";

export default function Header() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const handleShowMenu = useCallback(() => {
    setIsShowMenu(!isShowMenu);
  }, [isShowMenu]);

  return (
    <header className={style.headerPage}>
      <nav className={style.navigation}>
        <Button onClick={handleShowMenu} status="primary">
          <MenuIcon />
        </Button>
        <div className="logo ms-3">
          <Link className={style.navigationLogo} to="/">
            PEApp
          </Link>
          <div className={style.navigationMotto}>Движение - жизнь</div>
        </div>

        <InputGroup>
          <InputLabel linkedId="global-search" position="left">
            Найти упражнение
          </InputLabel>
          <Input
            className={style.searchInput}
            id="global-search"
            name="global-search"
            type="text"
          />
          <SearchIcon
            className={style.searchInputIcon}
            width={24}
            height={24}
            style={{ "--color-light": "#747bff" }}
          />
        </InputGroup>
        <div className={style.sliderManager}>
          <Button status="primary" className={style.sliderManagerBtn}>
            <BackwardIcon />
          </Button>
          <Button status="primary" className={style.sliderManagerBtn}>
            <ForwardIcon />
          </Button>
        </div>
      </nav>
      <nav
        className={clsx(style.collapseMenu, {
          [style.collapseMenuActive]: isShowMenu,
        })}
        id="collapse-menu"
      >
        <ul className={style.collapseMenuBar}>
          <li className="nav-item mx-4">
            <NavLink to="about">О приложении</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
