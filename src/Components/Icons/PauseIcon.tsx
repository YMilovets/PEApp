import clsx from 'clsx';
import IconProps from './Icons.type';
import outerStyle from './Icons.module.css';

function PauseIcon({
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
      viewBox="0 0 273.07 273.07"
      style={style}
      xmlSpace="preserve"
      width={width}
      height={height}
      className={clsx(className, outerStyle.pauseIcon)}
    >
      <g>
        <g>
          <path d="M85.335,0H51.2C32.435,0,17.07,15.37,17.07,34.135v204.8c0,18.765,15.365,34.135,34.13,34.135h34.135 c18.765,0,34.135-15.37,34.135-34.135v-204.8C119.47,15.37,104.1,0,85.335,0z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M221.87,0h-34.135C168.97,0,153.6,15.37,153.6,34.135v204.8c0,18.765,15.37,34.135,34.135,34.135h34.135 c18.765,0,34.13-15.37,34.13-34.135v-204.8C256,15.37,240.635,0,221.87,0z" />
        </g>
      </g>
    </svg>
  );
}

export default PauseIcon;
