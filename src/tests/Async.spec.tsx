import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Async } from "../components/Async";

test("it renders page correctly", async () => {
  render(<Async />);

  expect(screen.getByText("Hello world!")).toBeInTheDocument();

  expect(await screen.findByText("button")).toBeInTheDocument(); //default timeout 1 sec. this can be changed here

  await waitFor(() => {
    return expect(expect(screen.getByText("button")).toBeInTheDocument());
  });

  await waitForElementToBeRemoved(screen.queryByText("Button"));

  //NOT in the document
  // await waitFor(() => {
  //   return expect(expect(screen.queryByText("button")).not.toBeInTheDocument());
  // });
});
