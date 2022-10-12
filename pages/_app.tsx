import Head from 'next/head';

export default function App({ Component, pageProps }) {
	return (
		<>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />

        <link rel="canonical" href={meta.url} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="dynart" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" itemProp="image" content={meta.image} />
        <meta property="og:url" content={meta.url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={`@${meta.owner.twitter}`} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
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