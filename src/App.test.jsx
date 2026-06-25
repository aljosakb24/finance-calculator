
import { describe, test, expect } from 'vitest';
import { calculateProjection } from './utils';

// Group all tests for calculateProjection together
describe('calculateProjection', () => {
  
  // TEST 1: Basic calculation with initial amount only
  test('should calculate balance with initial amount and no contributions', () => {
    // Arrange: set up inputs
    const result = calculateProjection(1000, 0, 1, 5); // €1000, no monthly, 1 year, 5% return
    
    // Assert: after 1 year (12 months) with 5% return, should grow
    const finalBalance = result[12].balance; // Month 12 = end of year 1
    
    // With 5% annual return, €1000 should become around €1050
    expect(finalBalance).toBeGreaterThan(1000);
    expect(finalBalance).toBeLessThan(1100);
  });

  // TEST 2: Monthly contributions (0% return for simplicity)
  test('should add monthly contributions correctly', () => {
    // Arrange: €0 starting, €100/month, 1 year, 0% return
    const result = calculateProjection(0, 100, 1, 0);
    
    // Assert: after 12 months with €100/month = €1200 contributed
    const finalPrincipal = result[12].principal;
    expect(finalPrincipal).toBe(1200);
  });

  // TEST 3: Zero initial amount
  test('should handle zero initial amount', () => {
    // Arrange
    const result = calculateProjection(0, 500, 1, 7);
    
    // Assert: should still return data
    expect(result.length).toBe(13); // 0-12 months = 13 data points
    expect(result[0].balance).toBe(0);
  });

  // TEST 4: Returns correct number of data points
  test('should return correct number of months for given years', () => {
    // Arrange: 20 years should give 20*12 + 1 = 241 data points (months 0-240)
    const result = calculateProjection(5000, 500, 20, 7);
    
    // Assert: 20 years * 12 months + 1 (month 0) = 241 points
    expect(result.length).toBe(241);
  });

  // TEST 5: Growth is positive with positive return rate
  test('should grow balance with positive return rate', () => {
    // Arrange: €5000, €500/month, 10 years, 7% return
    const result = calculateProjection(5000, 500, 10, 7);
    
    // Get final balance and contributions
    const finalBalance = result[result.length - 1].balance;
    const totalContributions = result[result.length - 1].principal;
    
    // Assert: balance should be more than contributions (growth > 0)
    expect(finalBalance).toBeGreaterThan(totalContributions);
  });

  // TEST 6: Year field is calculated correctly
  test('should calculate year field correctly', () => {
    // Arrange
    const result = calculateProjection(1000, 0, 2, 5);
    
    // Assert: month 0 = year 0, month 12 = year 1, month 24 = year 2
    expect(result[0].year).toBe(0);
    expect(result[12].year).toBe(1);
    expect(result[24].year).toBe(2);
  });
});