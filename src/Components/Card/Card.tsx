import { Link } from 'react-router-dom';
import { ExercisesListProps } from './Card.type';
import style from './Card.module.css';

function Card({
  img, title, action, link,
}: ExercisesListProps) {
  return (
    <article className={style.card}>
      <img className={style.cardImage} src={img} alt="Здесь рыбы нет" />
      <div className={style.cardContainer}>
        <div className={style.cardContent}>
          <h3 className={style.cardTitle}>{title}</h3>
          <p className={style.cardText}>{action}</p>
        </div>
        <Link to={`exercise/${link}`} className={style.cardButton}>
          Выбрать
        </Link>
      </div>
    </article>
  );
}

export default Card;
