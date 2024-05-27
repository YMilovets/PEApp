import clsx from "clsx";
import style from "./Panel.module.css";
import { PanelProps } from "./Panel.type";

function Panel({ children, title, className }: PanelProps) {
  return (
    <section className={clsx(style.panel_content, className)}>
      <header className={style.panel_content_header}>
        <h1 className={style.panel_content_title}>{title}</h1>
      </header>
      {children}
    </section>
  );
}

export default Panel;
