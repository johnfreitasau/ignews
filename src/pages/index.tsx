import { GetServerSideProps } from "next";
import Head from "next/head";
import { stripe } from "../services/stripe";
import { SubscribeButton } from "../SubscribeButton";
import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>igNews | Home</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Hey, welcome 👋 </span>
          <h1>
            News about the <span>React</span> world.
            <p>
              Get access to all the publications <br />
              <span>for only {product.amount} / month</span>
            </p>
            <SubscribeButton priceId={product.priceId} />
          </h1>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve("price_1Ib8hgBOqMJ1Q63hZIrEQpwL");
  // const price = await stripe.prices.retrieve("price_1Ib8hgBOqMJ1Q63hZIrEQpwL", {
  //   expand: ["product"],
  // });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(price.unit_amount / 100),
  };

  console.log("product:", product);

  return {
    props: {
      product,
    },
  };
};
