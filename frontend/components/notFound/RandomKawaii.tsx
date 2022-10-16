import React from 'react';
import {
  Backpack,
  Browser,
  CreditCard,
  File,
  Ghost,
  IceCream,
  KawaiiMood,
  KawaiiProps,
  Planet,
  SpeechBubble,
} from 'react-kawaii';
import { getRandomItem } from '../../utils/array';
import { theme } from '../../utils/theme';

interface Props {
  isHappy: boolean;
  size?: number;
  color?: string;
}

const icons: React.ComponentType<KawaiiProps>[] = [
  Backpack,
  Browser,
  CreditCard,
  File,
  Ghost,
  IceCream,
  Planet,
  SpeechBubble,
];

const sadMoods: KawaiiMood[] = ['sad', 'shocked', 'ko'];
const happyMoods: KawaiiMood[] = ['blissful', 'happy', 'excited'];

function RandomKawaii({ isHappy, size, color = theme.palette.primary.main }: Props) {
  const Kawaii = getRandomItem(icons);
  const moodChoices = isHappy ? happyMoods : sadMoods;
  const mood = getRandomItem(moodChoices);

  return <Kawaii size={size} mood={mood} color={color} />;
}

export default RandomKawaii;
