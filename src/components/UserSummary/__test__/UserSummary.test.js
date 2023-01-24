import { render, screen } from "@testing-library/react";
import UserSummary from "../UserSummary";

const mockData = [
  { id: 1, userId: 1, amount: 249, date: "2022-11-25" },
  { id: 2, userId: 8, amount: 343, date: "2022-12-22" },
  { id: 3, userId: 1, amount: 78, date: "2022-08-16" },
];
const mockDate = "2022-12-05";

describe("User Component", () => {
  it("should show loading message while loading", () => {
    render(<UserSummary transData={mockData} endDate={mockDate} userId={1} />);
    const loadingElement = screen.getByText(/loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it("should render monthly summaries given valid data set", async () => {
    render(<UserSummary transData={mockData} endDate={mockDate} userId={1} />);
    const summaryElement = await screen.findByTestId(
      "monthly-summary",
      {},
      {
        timeout: 1500,
      }
    );
    expect(summaryElement).toBeInTheDocument();
  });

  it("should render monthly points for each month in time period", async () => {
    render(
      <UserSummary
        transData={mockData}
        endDate={mockDate}
        monthSpan={6}
        userId={1}
      />
    );
    const summaryList = await screen.findAllByTestId(
      "summary-month",
      {},
      {
        timeout: 1500,
      }
    );
    expect(summaryList.length).toEqual(6);
  });

  it("should not render monthly summaries given invalid data set", async () => {
    render(<UserSummary transData={mockData} endDate={mockDate} userId={2} />);
    const noSummaryElement = await screen.findByTestId(
      "no-summary",
      {},
      { timeout: 1500 }
    );
    expect(noSummaryElement).toBeInTheDocument();
  });

  it("should render user transactions given valid data set", async () => {
    render(<UserSummary transData={mockData} endDate={mockDate} userId={1} />);
    const transactionElement = await screen.findByTestId(
      "user-transactions",
      {},
      { timeout: 1500 }
    );
    const transactionsList = await screen.findAllByTestId(
      "transaction-item",
      {},
      { timeout: 1500 }
    );
    expect(transactionElement).toBeInTheDocument();
    expect(transactionsList.length).toEqual(1);
  });

  it("should not render user transactions given invalid data set", async () => {
    render(<UserSummary transData={mockData} endDate={mockDate} userId={2} />);
    const noTransactionElement = await screen.findByTestId(
      "no-transactions",
      {},
      { timeout: 1500 }
    );
    expect(noTransactionElement).toBeInTheDocument();
  });
});
