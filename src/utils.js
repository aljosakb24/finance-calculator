// src/utils.js
// This function calculates how much money you'll have each year
// It takes: starting money, monthly addition, number of years, and expected return rate
export const calculateProjection = (initial, monthly, years, rate) => {
  // Convert annual return rate to monthly
  const monthlyRate = rate / 100 / 12;

  // Calculate the total number of months
  const months = years * 12;

  // Create an empty array to store results
  const data = [];

  // Start with the initial amount
  let balance = initial;

  // Loop through each month from 0 to total months
  for (let month = 0; month <= months; month++) {
    // Convert month number to years (month 12 = year 1, month 24 = year 2)
    const year = Math.floor(month / 12);

    // Add this month's data to our array
    data.push({
      year: parseFloat(year.toFixed(1)), // Round to 1 decimal place
      balance: Math.round(balance), // Total money you have (rounded)
      principal: Math.round(initial + monthly * month), // Total money you contributed
    });

    // If not at the end, calculate next month's balance
    if (month < months) {
      balance = balance * (1 + monthlyRate) + monthly;
    }
  }
  // Return the array of data for each month/year
  return data;
};