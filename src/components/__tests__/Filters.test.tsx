import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Filters from "../Filters";

test("renders Filters component", () => {
  const setFilter = jest.fn();
  const { getByText } = render(
    <Filters darkMode={false} filter="all" setFilter={setFilter} />
  );
  expect(getByText("All")).toBeTruthy();
  expect(getByText("Done")).toBeTruthy();
  expect(getByText("NotDone")).toBeTruthy();
});

test("changes filter to completed", () => {
  const setFilter = jest.fn();
  const { getByText } = render(
    <Filters darkMode={false} filter="all" setFilter={setFilter} />
  );
  fireEvent.press(getByText("Done"));
  expect(setFilter).toHaveBeenCalledWith("done");
});
