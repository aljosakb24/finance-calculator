import { useState } from 'react';
import './App.css';

export default function FinanceCalculator() {
  // These are state variables - they store data that can change
  const [initialAmount, setInitialAmount] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(20);
  const [currency, setCurrency] = useState('EUR');
  const [returnRate, setReturnRate] = useState(7);

  // This object maps currency codes to their symbols for display
  const currencySymbols = { EUR: '€', USD: '$', RSD: 'дин' };
  const symbol = currencySymbols[currency];

  // This func calculates how much monet you'll have each yeat
  // It takse: starting money, monthly addition, number of years, and expected return rate

  const calculateProjection = (initial, monthly, years, rate) => {
    // Convert annual return rate to monthly
    const monthlyRate = rate / 100 / 12;

    // Calculate the total number of months
    const months = years * 12;

    //  create an empty array to store results
    const data = [];

    //  Start with the initial amount
    let balance = initial;

    // Loop through each month from 0 to total months
    for ( let month =0; month <= months; month++){

      // convert month number to years (month 12 = year 1, month 24 = year 2)
      const year = Math.floor(month / 12);

      // Add this months data to our array
      data.push({
        year: parseFloat(year.toFixed(1)), // Round to 1 decimal place
        balance: Math.round(balance), // Total money you have (rounded)
        principal: Math.round(initial + monthly * month), //Total money you contributed
      });

      // If not at the end, calculate next months balance
      if (month < months) {
        balance = balance * (1 + monthlyRate) + monthly;
      }
    }
    // return the array of data for each month/year
    return data;
  }

  // Call the function with current values and store results
  const projection = calculateProjection(initialAmount, monthlyContribution, years, returnRate);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Personal Finance Calculator</h1>
      
      {/* LEFT PANEL - All the input controls */}
      <div style={{ maxWidth: '400px', marginBottom: '2rem' }}>
        
        {/* INPUT 1: Starting Amount */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Starting amount ({currency})
          </label>
          
          {/* Slider - drag to adjust, ranges from 0 to 100,000 */}
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={initialAmount}
            onChange={(e) => setInitialAmount(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
          
          {/* Number input - type exact numbers */}
          <input
            type="number"
            value={initialAmount}
            onChange={(e) => setInitialAmount(Number(e.target.value))}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          
          {/* Display the current value */}
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F766E' }}>
            {symbol}{initialAmount.toLocaleString()}
          </div>
        </div>

        {/* INPUT 2: Monthly Contribution */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Monthly contribution ({currency})
          </label>
          
          <input
            type="range"
            min="0"
            max="5000"
            step="50"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
          
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F766E' }}>
            {symbol}{monthlyContribution.toLocaleString()}
          </div>
        </div>

        {/* INPUT 3: Years */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Time horizon (years)
          </label>
          
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
          
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F766E' }}>
            {years} years
          </div>
        </div>

        {/* INPUT 4: Currency Dropdown */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Currency
          </label>
          
          {/* Select dropdown - user picks which currency to use */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', fontSize: '14px' }}
          >
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
            <option value="RSD">RSD (дин)</option>
          </select>
        </div>

        {/* INPUT 5: Return Rate Buttons */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 'bold' }}>
            Expected return
          </label>
          
          {/* Three buttons for different risk levels */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {/* Conservative button */}
            <button
              onClick={() => setReturnRate(4)}
              style={{
                padding: '0.5rem',
                backgroundColor: returnRate === 4 ? '#0F766E' : '#f0f0f0',
                color: returnRate === 4 ? 'white' : 'black',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px',
                fontWeight: 'bold',
              }}
            >
              Conservative (4%)
            </button>

            {/* Moderate button */}
            <button
              onClick={() => setReturnRate(7)}
              style={{
                padding: '0.5rem',
                backgroundColor: returnRate === 7 ? '#0F766E' : '#f0f0f0',
                color: returnRate === 7 ? 'white' : 'black',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px',
                fontWeight: 'bold',
              }}
            >
              Moderate (7%)
            </button>

            {/* Aggressive button */}
            <button
              onClick={() => setReturnRate(10)}
              style={{
                padding: '0.5rem',
                backgroundColor: returnRate === 10 ? '#0F766E' : '#f0f0f0',
                color: returnRate === 10 ? 'white' : 'black',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px',
                fontWeight: 'bold',
              }}
            >
              Aggressive (10%)
            </button>
          </div>

          {/* Show which rate is selected */}
          <div style={{ marginTop: '0.75rem', fontSize: '14px', color: '#666' }}>
            Selected: {returnRate}%
          </div>
        </div>

      </div>

      {/* TEMPORARY: Show all state values so you can see they're updating */}
      <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', marginTop: '2rem' }}>
        <h3>Current state (for testing):</h3>
        <p>Starting: {symbol}{initialAmount.toLocaleString()}</p>
        <p>Monthly: {symbol}{monthlyContribution.toLocaleString()}</p>
        <p>Years: {years}</p>
        <p>Currency: {currency}</p>
        <p>Return Rate: {returnRate}%</p>
        <p>FInal balance after {years} years: {symbol}{projection[projection.length -1].balance.toLocaleString()}</p>
        {/* projection[projection.length - 1] gets the last item in our array (the final year)
.balance gets the balance amount from that year
toLocaleString() formats it nicely with commas (e.g., €145,000 instead of €145000) */}
      </div>
    </div>
  );
}