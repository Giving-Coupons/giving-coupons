import { useEffect, useRef } from 'react';
import LayoutDefault from './layouts/LayoutDefault';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import Home from './views/Home';

const App = () => {
  const childRef = useRef();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded');
    childRef.current.init();
    // eslint-disable-next-line react-hooks/exhaustive-depe
  }, [location]);

  return (
    <ScrollReveal ref={childRef} children={() => <AppRoute exact path="/" component={Home} layout={LayoutDefault} />} />
  );
};

export default App;
