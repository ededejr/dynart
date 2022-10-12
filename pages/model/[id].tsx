import Head from 'next/head';
import Image from 'next/image'
import { useRouter } from 'next/router';
import styles from '../../styles.module.css'

export default function Page() {
  const router = useRouter();
  const { id } = router?.query || {};
  const isVerifed = id && typeof id === 'string' && verifyModelParam(id);
  const imageRoute = isVerifed ? `/api/img/s/${id}` : '/api/img/random';
  const title = isVerifed ? `dynart - ${id}` : 'dynart';
  const description = isVerifed ? `Image generated with ${id} model` : 'Images generated on the fly using React and Resvg.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="twitter:title" content={title} />
        <meta property="og:title" content={title} />

        <meta name="description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />

        <meta name="twitter:image" content={imageRoute} />
        <meta property="og:image" itemProp="image" content={imageRoute} />
      </Head>
      <main className={styles.container}>
        <h1>dynart</h1>
        {isVerifed ? (
          <p>
            The following image is generated using the <code>{id}</code> model.
          </p>
        ) : null}
        <Image src={imageRoute} alt="Generated Image" width={1200} height={630} />
      </main>
    </>
  )
}

function verifyModelParam(model: string) {
  return ['clock', 'de-logo', 'dynamic-colorful-polylines', 'gradients-and-flat-colors'].includes(model)
}