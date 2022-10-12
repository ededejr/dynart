import { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps, router }: AppProps) {
  const { m } = router.query || {};
  const imageRoute = m && typeof m === 'string' && verifyModelParam(m) ? `/api/img/s/${m}` : '/api/img/random';

	return (
		<>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{meta.title}</title>
        <meta name="googlebot" content="follow, index, noarchive" />
        <meta name="robots" content="follow, index, noarchive" />
        <link rel="canonical" href={meta.url} />

        <meta name="description" content={meta.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={`@${meta.owner.twitter}`} />
        <meta name="twitter:site" content={`@${meta.owner.twitter}`} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={imageRoute} />
        
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_us" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" itemProp="image" content={imageRoute} />
        <meta property="og:url" content={meta.url} />
      </Head>
      <Component {...pageProps} />
		</>
	);
}

const meta = {
  title: 'dynart',
  description: 'Images generated on the fly using React and Resvg.',
  image: '/api/img/random',
  url: 'https://dynart.edede.ca',
  owner: {
    twitter: 'ededejr',
  }
}

function verifyModelParam(model: string) {
  return ['clock', 'de-logo', 'dynamic-colorful-polylines', 'gradients-and-flat-colors'].includes(model)
}