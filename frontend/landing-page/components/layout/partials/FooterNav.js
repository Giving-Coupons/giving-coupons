import classNames from 'classnames';
import Link from 'next/link';

const FooterNav = ({ className, ...props }) => {
  const classes = classNames('footer-nav', className);

  return (
    <nav {...props} className={classes}>
      <ul className="list-reset">
        <li>
          {/* TODO: Replaced React Link with Next link, verify that it works */}
          <Link href="/">Contact</Link>
        </li>
        <li>
          {/* TODO: Replaced React Link with Next link, verify that it works */}
          <Link href="/">About us</Link>
        </li>
        <li>
          {/* TODO: Replaced React Link with Next link, verify that it works */}
          <Link href="/">FAQ's</Link>
        </li>
        <li>
          {/* TODO: Replaced React Link with Next link, verify that it works */}
          <Link href="/">Support</Link>
        </li>
      </ul>
    </nav>
  );
};

export default FooterNav;
