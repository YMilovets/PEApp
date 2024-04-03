import style from './Panel.module.css';
import { PanelProps } from './Panel.type';

function Panel({ children, title }: PanelProps) {
  return (
    <section className={style.panel_content}>
      <header className={style.panel_content_header}>
        <h1 className={style.panel_content_title}>{title}</h1>
      </header>
      {children}
    </section>
  );
}

export default Panel;
