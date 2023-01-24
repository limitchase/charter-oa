import database from "../db/database";

export function getRewardPoints(amount) {
  amount = Math.floor(amount);
  let points = 0;
  if (amount > 100) {
    points = 2 * (amount - 100) + 50;
  } else if (amount >= 50) {
    points = amount - 50;
  } else {
    points = 0;
  }
  return points;
}

export const getStartDate = (finalDate, monthCount = 3) => {
  const endDate = finalDate ? new Date(finalDate) : new Date();
  const startDate = new Date(endDate);
  startDate.setDate(1);
  startDate.setMonth(startDate.getMonth() - monthCount + 1);
  startDate.setHours(0, 0, 0, 0);
  return startDate;
};

export function getUserByUserId(userId) {
  return database.users.find((record) => record.userId === userId);
}

export function getUsers() {
  return database.users;
}

export function getUserTransactions(userId, startDate, endDate) {
  return database.transactions
    .filter(
      (t) => t.userId === userId && t.date >= startDate && t.date <= endDate
    )
    .sort((a, b) => getDateTime(a.date) - getDateTime(b.date));
}

export function getDateTime(date) {
  return new Date(date).getTime();
}

export function getAllTransactionsSorted() {
  return database.transactions.sort(
    (a, b) => getDateTime(a.date) - getDateTime(b.date)
  );
}

// simulate async call
export function getTransactionsAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getAllTransactionsSorted());
    }, 1000);
  });
}

export function getUserTransactionsAsync(userId, startDate, endDate) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getUserTransactions(userId, startDate, endDate));
    }, 1000);
  });
}

export function getUsersAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getUsers());
    }, 1000);
  });
}
