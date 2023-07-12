import { TranslateProp, TranslateValue } from "../Types";
import { NotificationText } from "./notificationText";

export function translate(
  root: string,
  layerProp: TranslateProp
): TranslateValue {
  const listDictionaries: Record<
    string,
    Record<TranslateProp, TranslateValue>
  > = { NotificationText };
  return listDictionaries[root] ? listDictionaries[root][layerProp] : "";
}
