import Image from 'next/image'
import styles from '../styles.module.css'

export default function Index() {
  return (
    <main className={styles.container}>
      <h1>dynart</h1>
      <p>
        Images generated on the fly using <a href="https://reactjs.org/">React</a> and <a href="https://resvg.org/">Resvg</a>.
      </p>
      <Image src="/api/img/random" alt="Generated Image" width={1200} height={630} />
      <p>Built with ❤️ by <a href="https://twitter.com/ededejr">@ededejr</a></p>
    </main>
  )
}
