import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { FaGithub } from "react-icons/fa";
import { mocked } from "ts-jest/utils";
import { isJsxText } from "typescript";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

// jest.mock("next-auth/client", () => {
//   return {
//     useSession() {
//       return [null, false];
//     },
//   };
// });
jest.mock("next-auth/client");

describe("SignInButton Component", () => {
  it("renders corrently when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);
    //Confirm with debug
    // const { debug } = render(<SignInButton />);
    // debug();

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "John Doe", email: "johndoe@gmail.com" },
        expires: "expire-test",
      },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
