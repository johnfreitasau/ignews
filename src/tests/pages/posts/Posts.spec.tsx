import { mocked } from "ts-jest/utils";
import { getPrismicClient } from "../../../services/prismic";
import { getStaticProps } from "../../../pages";

const posts = [
  {
    slug: "my-new-post",
    title: "My new post",
    summary: "Post summary",
    updatedAt: "July, 10",
  },
];

jest.mock("../../../services/prismic");

describe("Posts page", () => {
  it("renders correctly", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "paragraph", text: "My new post" }],
              content: "my-post-content",
            },
            last_publication_date: "04-07-2021",
          },
        ],
      }),
    } as any);
    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My new post",
              summary: "Post summary",
              updatedAt: "July, 10",
            },
          ],
        },
      })
    );
  });
});

// it("renders correctly", () => {
//   render(
//     <Home product={{ priceId: "fake-price-id", amount: "AUD$10.00" }} />
//   );

//   expect(screen.getByText(/AUD\$10.00/i)).toBeInTheDocument();
// });

// it("loads the initial data", async () => {
//   const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);

//   retrieveStripePricesMocked.mockResolvedValueOnce({
//     id: "fake-price-id",
//     unit_amount: 1000,
//   } as any);

//   const response = await getStaticProps({});

//   // console.log("response:", response);

//   expect(response).toEqual(
//     expect.objectContaining({
//       props: {
//         product: {
//           priceId: "fake-price-id",
//           amount: "$10.00",
//         },
//       },
//     })
//   );
// });
// });
