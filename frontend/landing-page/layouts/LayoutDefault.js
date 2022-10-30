import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Banner from '../components/layout/partials/Banner';

const LayoutDefault = ({ children }) => (
  <>
    <Header navPosition="right" className="reveal-from-bottom" />
    <main className="site-content">{children}</main>
    <Banner />
    <Footer />
  </>
);

export default LayoutDefault;
