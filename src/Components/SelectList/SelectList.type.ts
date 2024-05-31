import { ReactNode } from "react";

type SelectListData = {
  id: number | string;
  children: (headerIdAria: string, descriptionIdAria: string) => ReactNode;
};

export interface SelectListProps {
  className?: string;
  style?: Record<string, string | number>;
  data: Array<SelectListData>;
  onSelect?: (selectId: string | number) => void;
  isDisableSelected?: boolean;
  title?: string;
}
