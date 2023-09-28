import { TranslateProp, TranslateValue } from "../Types";
import { ExerciseText } from "./exerciseText";
import { NotificationText } from "./notificationText";

export function translate(
  root: string,
  layerProp: TranslateProp
): TranslateValue {
  const listDictionaries: Record<
    string,
    Record<TranslateProp, TranslateValue>
  > = { NotificationText, ExerciseText };
  return listDictionaries[root] ? listDictionaries[root][layerProp] : "";
}
