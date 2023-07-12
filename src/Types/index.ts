type ExerciseItem = {
  img: string;
  title: string;
  action: string;
  link: string;
};

type TranslateProp = string | number | symbol;
type TranslateValue = TranslateProp;

export type { ExerciseItem, TranslateProp, TranslateValue };
