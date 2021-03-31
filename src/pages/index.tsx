import Head from "next/head";
import { SubscribeButton } from "../SubscribeButton";
import styles from "./home.module.scss";
export default function Home() {
  return (
    <>
      <Head>
        <title>igNews | Home</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Hey, welcome 👋</span>
          <h1>
            News about the <span>React</span> world.
            <p>
              Get access to all the publications <br />
              <span>for only $9.90 / month</span>
            </p>
            <SubscribeButton />
          </h1>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}
