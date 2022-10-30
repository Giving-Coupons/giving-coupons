import Cta from '../components/sections/Cta';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import Hero from '../components/sections/Hero';
import Testimonial from '../components/sections/Testimonial';

const Home = () => {
  return (
    <>
      <Hero className="illustration-section-01" />
      <FeaturesTiles />
      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
      <Testimonial topDivider />
      <Cta split />
    </>
  );
};

export default Home;
