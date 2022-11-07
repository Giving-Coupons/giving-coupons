import { useSpring, animated } from 'react-spring';

export interface AnimatedNumberProps {
  initialAmount: number;
  finalAmount: number;
}

const AnimatedNumber = ({ initialAmount, finalAmount }: AnimatedNumberProps) => {
  const { number } = useSpring({
    from: { number: initialAmount },
    number: finalAmount,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  const AnimatedDiv = animated.div;

  return <AnimatedDiv>{number.to((n: number) => n.toFixed(0))}</AnimatedDiv>;
};

export default AnimatedNumber;
