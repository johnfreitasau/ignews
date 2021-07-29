import { render, screen, fireEvent } from "@testing-library/react";
import { signIn, useSession } from "next-auth/client";
import { mocked } from "ts-jest/utils";
import { useRouter } from "next/router";
import { SubscribeButton } from "../SubscribeButton";

// jest.mock("next-auth/client", () => {
//   return {
//     useSession() {
//       return [null, false];
//     },
//   };
// });

// jest.mock("next/router", () => {
//   return {
//     useRouter() {
//       return {
//         push: jest.fn(),
//       };
//     },
//   };
// });

jest.mock("next-auth/client");

jest.mock("next/router");

describe("Subscribe Component", () => {
  it("renders Subscribe button correctly", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirects user to sign in page when not authenticated", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    const signInMocked = mocked(signIn);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toBeCalled();
  });

  it("redirects to posts when user has an active subscription", () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: "John Doe",
          email: "johndoe@gmail.com",
        },
        activeSubscription: "fake-active-subscription",
        expires: "expire-test",
      },
      false,
    ]);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toBeCalled();
  });
});
