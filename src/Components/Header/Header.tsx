import clsx from 'clsx';
import {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { useEvent } from 'effector-react';
import Button, { ButtonWrapper } from '../Button';

import {
  BackwardIcon, ForwardIcon, MenuIcon, SearchIcon,
} from '../Icons';
import { Input, InputGroup, InputLabel } from '../InputGroup';
import style from './Header.module.css';
import useSlider from '../../Hooks/useSlider';
import { setSliderPos } from '../../Store/events';
import useFilterSlider from '../../Hooks/useFilterSlider';

export default function Header() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const handleShowMenu = useCallback(() => {
    setIsShowMenu(!isShowMenu);
  }, [isShowMenu]);

  const [, setSearchParams] = useSearchParams();
  const handleSliderPos = useEvent(setSliderPos);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchParams({ search: e.target.value });
    handleSliderPos(0);
  }, [handleSliderPos, setSearchParams]);

  const { itemWithSearchFilter } = useFilterSlider();

  const [xPos, moveLeftSlider, moveRightSlider] = useSlider(
    itemWithSearchFilter,
    'slider-exercises',
    32,
  );

  useEffect(() => {
    handleSliderPos(xPos);
  }, [handleSliderPos, xPos]);

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

        <form className={style.searchInputForm} onSubmit={(e) => e.preventDefault()}>
          <InputGroup className={style.searchInputGroup}>
            <InputLabel linkedId="global-search" position="left">
              Найти упражнение
            </InputLabel>
            <Input
              className={style.searchInput}
              id="global-search"
              name="global-search"
              type="text"
              onChange={handleChange}
            />
            <SearchIcon
              className={style.searchInputIcon}
              width={24}
              height={24}
              style={{ '--icon-fill-color': 'var(--ui-blue-magenta-100)' }}
            />
          </InputGroup>
        </form>

        <div className={style.sliderManager}>
          <ButtonWrapper>
            <Button
              onClick={moveLeftSlider}
              status="primary"
              className={style.sliderManagerBtn}
            >
              <BackwardIcon />
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button
              onClick={moveRightSlider}
              status="primary"
              className={style.sliderManagerBtn}
            >
              <ForwardIcon />
            </Button>
          </ButtonWrapper>
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
          <li>
            <NavLink to="new">Добавить упражнение</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
