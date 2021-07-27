import { render, screen, fireEvent } from "@testing-library/react";
import { signIn } from "next-auth/client";
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

jest.mock("next-auth/client", () => {
  return {
    useSession() {
      return [null, false];
    },
    signIn: jest.fn(), //it means an empty function. We only need to know if the function was called.
  };
});

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        push: jest.fn(),
      };
    },
  };
});

describe("Subscribe Component", () => {
  it("renders Subscribe button correctly", () => {
    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirects user to sign in page when not authenticated", () => {
    const signInMocked = mocked(signIn);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toBeCalled();
  });

  it("redirects to posts when user has an active subscription", () => {
    const useRouterMocked = mocked(useRouter);

    const pushMock = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toBeCalled();
  });
});
