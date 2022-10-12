import { GetServerSideProps } from 'next'
import Head from 'next/head';
import Image from 'next/image'
import styles from '../../styles.module.css'

export default function Page({ id, title, description, metaImage, isVerified, imageRoute }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="twitter:title" content={title} />
        <meta property="og:title" content={title} />

        <meta property="description" content={description} />
        <meta property="twitter:description" content={description} />
        <meta property="og:description" content={description} />

        <meta property="twitter:image" content={metaImage} />
        <meta property="og:image" itemProp="image" content={metaImage} />
      </Head>
      <main className={styles.container}>
        <h1>dynart</h1>
        {isVerified ? (
          <p>
            The following image is generated using the <code>{id}</code> model.
          </p>
        ) : null}
        <Image src={imageRoute} alt="Generated Image" width={1200} height={630} />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async function (context) {
  const id = context.query.id;
  const isVerified = Boolean(id && typeof id === 'string' && verifyModelParam(id));
  const imageRoute = isVerified ? `/api/img/s/${id}` : '/api/img/random';
  const metaImage = `${getHostname()}${imageRoute}`;
  const title = isVerified ? `dynart - ${id}` : 'dynart';
  const description = isVerified ? `Image generated with ${id} model` : 'Images generated on the fly using React and Resvg.';

  return {
    props: {
      id,
      title,
      description,
      metaImage,
      imageRoute,
      isVerified
    }
  }
}

function verifyModelParam(model: string) {
  return ['clock', 'de-logo', 'dynamic-colorful-polylines', 'gradients-and-flat-colors'].includes(model)
}

const getHostname = () => process.env.NODE_ENV === 'development' ? '' : 'https://dynart.edede.ca';