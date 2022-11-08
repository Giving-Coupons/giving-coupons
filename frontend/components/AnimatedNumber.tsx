import { animated, useSpring } from 'react-spring';

export interface AnimatedNumberProps {
  initialAmount: number;
  finalAmount: number;
  numToString?: (n: number) => string;
}

const AnimatedNumber = ({
  initialAmount,
  finalAmount,
  numToString = (n: number) => n.toFixed(0),
}: AnimatedNumberProps) => {
  const { number } = useSpring({
    from: { number: initialAmount },
    number: finalAmount,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  const AnimatedDiv = animated.div;

  return <AnimatedDiv>{number.to(numToString)}</AnimatedDiv>;
};

export default AnimatedNumber;
