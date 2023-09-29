import clsx from 'clsx';
import IconProps from './Icons.type';
import outerStyle from './Icons.module.css';

function ForwardIcon({
  width = 16, height = 16, className, style,
}: IconProps) {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 42 42"
      xmlSpace="preserve"
      className={clsx(outerStyle.forwardIcon, className)}
      style={style}
      width={width}
      height={height}
    >
      <path d="M35.5,0c-0.552,0-1,0.447-1,1v18.095L7.068,0.177C6.762-0.034,6.364-0.057,6.035,0.114C5.706,0.287,5.5,0.628,5.5,1v40 c0,0.372,0.206,0.713,0.535,0.886C6.181,41.962,6.341,42,6.5,42c0.199,0,0.397-0.06,0.568-0.177L34.5,22.905V41c0,0.553,0.448,1,1,1 s1-0.447,1-1V1C36.5,0.447,36.052,0,35.5,0z" />
    </svg>
  );
}

export default ForwardIcon;
