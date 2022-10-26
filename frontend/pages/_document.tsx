import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  const PUBLIC_URL = process.env.NEXT_PUBLIC_BASE_CLIENT_URL;

  const wesiteDescription =
    'Giving Coupons aims to increase the fundraising ROI on charitable donations and raise awareness about charities that the donor wishes to support by giving out donation coupons. Recipients of the coupon get to decide which charity receives the money specified and can choose to top it up with their own money. The end goal of Giving Coupons is to encourage more Singaporeans to donate.';

  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href={`${PUBLIC_URL}/favicon.ico`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta property="description" content={`${wesiteDescription}`} />
        <meta property="og:title" content="Giving Coupons" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PUBLIC_URL} />
        <meta property="og:image" content={`${PUBLIC_URL}/og-giving-coupons.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:description" content={`${wesiteDescription}`} />
        <meta property="og:site_name" content="Giving Coupons" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
