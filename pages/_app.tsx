import { AppProps } from 'next/app';
import styles from '../styles.module.css'
import Head from 'next/head';

export default function App({ Component, pageProps, router }: AppProps) {
  const isModelPage = router.pathname === '/model/[id]';

	return (
		<>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/index.css" />
        <title>{meta.title}</title>
        <meta property="googlebot" content="follow, index, noarchive" />
        <meta property="robots" content="follow, index, noarchive" />
        <link rel="canonical" href={meta.url} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content={meta.owner.twitter} />
        <meta property="twitter:site" content={meta.owner.twitter} />
        
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_us" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:url" content={meta.url} />

        {!isModelPage ? (
          <>
            <meta property="description" content={meta.description} />
            <meta property="twitter:description" content={meta.description} />
            <meta property="og:description" content={meta.description} />
    
            <meta property="og:title" content={meta.title} />
            <meta property="twitter:title" content={meta.title} />
            
            <meta property="twitter:image" content={meta.image} />
            <meta property="og:image" itemProp="image" content={meta.image} />
          </>
        ) : null}
      </Head>
      <main className={styles.container}>
        <Component {...pageProps} />
      </main>
		</>
	);
}

const meta = {
  title: 'dynart',
  description: 'Images generated on the fly using React and Resvg.',
  image: 'https://dynart.edede.ca/api/img/random',
  url: 'https://dynart.edede.ca',
  owner: {
    twitter: '@ededejr',
  }
};