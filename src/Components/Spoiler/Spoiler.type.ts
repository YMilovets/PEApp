import { ReactNode } from 'react';

interface SpoilerProps {
  children: ReactNode;
  caption?: string | ReactNode;
  className?: string;
  style?: Record<string, string>;
  captionRenderFn?: ReactNode;
  onClick?: () => void;
}

export default SpoilerProps;
