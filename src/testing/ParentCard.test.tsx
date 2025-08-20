// src/testing/ParentCard.test.tsx
import { render, screen } from "@testing-library/react";
import ParentCard from "../components/Day18/ParentCard";

// Mock fetch before tests run
// Make a fake fetch
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]), // return empty array
    })
  ) as jest.Mock;
});

test("renders loading text", () => {
  render(<ParentCard />);
  const loadingText = screen.getByText(/Loading/i);
  expect(loadingText).toBeInTheDocument();
});