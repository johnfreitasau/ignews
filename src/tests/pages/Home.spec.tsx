import { render, screen } from "@testing-library/react";
import Home, { getStaticProps } from "../../pages";
import { mocked } from "ts-jest/utils";
import { stripe } from "../../services/stripe";

jest.mock("next/router");
jest.mock("next-auth/client", () => {
  return {
    useSession: () => [null, false],
  };
});
jest.mock("../../services/stripe");

describe("Home page", () => {
  it("renders correctly", () => {
    render(
      <Home product={{ priceId: "fake-price-id", amount: "AUD$10.00" }} />
    );

    expect(screen.getByText(/AUD\$10.00/i)).toBeInTheDocument();
  });

  it("loads the initial data", async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    // console.log("response:", response);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$10.00",
          },
        },
      })
    );
  });
});
