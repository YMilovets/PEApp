import { createPortal } from 'react-dom';
import { PortalProps } from './Portal.type';

function Portal({ children }: PortalProps) {
  return createPortal(children, document.body);
}

export default Portal;
