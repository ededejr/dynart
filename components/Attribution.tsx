import styles from '../styles.module.css';

export default function Attribution() {
  return (
      <div className={styles.attribution}>
      <span>by <a href="https://twitter.com/ededejr">@ededejr</a></span>
      <span>{new Date("2022-10-11").toDateString()}</span>
      </div>
  )
}