import Head from 'next/head';
import Chatbot from '../components/Chatbot';
import styles from '../styles/Home.module.css'; // Import the CSS module

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AI Customer Support</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>AI Customer Support Chatbot</h1>
        <div className={styles.chatContainer}>
          <Chatbot />
        </div>
        <div className={styles.interactive}>
          <button className={styles.button}>Live Demo</button>
          <button className={styles.button}>Quick Survey</button>
        </div>
      </main>
    </div>
  );
}
