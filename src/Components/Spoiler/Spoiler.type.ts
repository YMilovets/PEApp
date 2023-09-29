import { ReactNode } from 'react';

interface SpoilerProps {
  children: ReactNode;
  caption?: string | ReactNode;
  className?: string;
  style: Record<string, string>;
  captionRenderFn?: ReactNode;
}

export default SpoilerProps;
