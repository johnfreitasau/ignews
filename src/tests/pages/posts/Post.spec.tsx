import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { getSession } from "next-auth/client";
import Post, { getServerSideProps } from "../../../pages/posts/[slug]";

const post = {
  slug: "my-new-post",
  title: "My new post",
  content: "<p>Post content</p>",
  updatedAt: "07 April 2021",
};

jest.mock("../../../services/prismic");
jest.mock("next-auth/client");

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("Post content")).toBeInTheDocument();
  });

  it("redirects user to / if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: "my-new-post",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({ destination: "/" }),
      })
    );
  });
});
