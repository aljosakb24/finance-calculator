import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import FinanceCalculator from './App';

describe('FinanceCalculator Component', () => {

  // TEST 1: Component renders without crashing
  test('should render the calculator heading', () => {
    render(<FinanceCalculator />);
    expect(screen.getByText('Personal Finance Calculator')).toBeInTheDocument();
  });

  // TEST 2: Renders all main sections
  test('should render all main sections', () => {
    render(<FinanceCalculator />);
    
    expect(screen.getByText('Growth projection')).toBeInTheDocument();
    expect(screen.getByText('Compare scenarios')).toBeInTheDocument();
  });

  // TEST 3: Currency dropdown exists and works
  test('should have currency select with EUR default', () => {
    render(<FinanceCalculator />);
    
    const currencySelect = screen.getByDisplayValue('EUR');
    expect(currencySelect).toBeInTheDocument();
  });

  // TEST 4: Change currency
  test('should change currency when dropdown changes', () => {
    render(<FinanceCalculator />);
    
    const currencySelect = screen.getByDisplayValue('EUR');
    fireEvent.change(currencySelect, { target: { value: 'USD' } });
    
    // After change, should see USD selected
    expect(screen.getByDisplayValue('USD')).toBeInTheDocument();
  });

  // TEST 5: Save scenario button is disabled initially
  test('should disable Save scenario button when input is empty', () => {
    render(<FinanceCalculator />);
    
    const saveBtn = screen.getByText('Save scenario');
    expect(saveBtn).toBeDisabled();
  });

  // TEST 6: Save scenario input accepts text
  test('should enable Save button when scenario name is entered', () => {
    render(<FinanceCalculator />);
    
    const scenarioInput = screen.getByPlaceholderText(/Name this scenario/);
    const saveBtn = screen.getByText('Save scenario');
    
    // Type in the input
    fireEvent.change(scenarioInput, { target: { value: 'My scenario' } });
    
    // Button should now be enabled
    expect(saveBtn).not.toBeDisabled();
  });

  // TEST 7: Save scenario appears in list
  test('should save scenario and display it in list', () => {
    render(<FinanceCalculator />);
    
    const scenarioInput = screen.getByPlaceholderText(/Name this scenario/);
    const saveBtn = screen.getByText('Save scenario');
    
    // Type and save
    fireEvent.change(scenarioInput, { target: { value: 'Test plan' } });
    fireEvent.click(saveBtn);
    
    // Scenario should appear
    expect(screen.getByText('Test plan')).toBeInTheDocument();
  });

  // TEST 8: Remove scenario button appears after saving
  test('should show Remove button after scenario is saved', () => {
    render(<FinanceCalculator />);
    
    const scenarioInput = screen.getByPlaceholderText(/Name this scenario/);
    const saveBtn = screen.getByText('Save scenario');
    
    fireEvent.change(scenarioInput, { target: { value: 'Test plan' } });
    fireEvent.click(saveBtn);
    
    // Remove button should appear
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  // TEST 9: Remove scenario works
  test('should remove scenario when Remove is clicked', () => {
    render(<FinanceCalculator />);
    
    const scenarioInput = screen.getByPlaceholderText(/Name this scenario/);
    const saveBtn = screen.getByText('Save scenario');
    
    // Add scenario
    fireEvent.change(scenarioInput, { target: { value: 'Test plan' } });
    fireEvent.click(saveBtn);
    
    expect(screen.getByText('Test plan')).toBeInTheDocument();
    
    // Remove it
    const removeBtn = screen.getByText('Remove');
    fireEvent.click(removeBtn);
    
    // Should be gone
    expect(screen.queryByText('Test plan')).not.toBeInTheDocument();
  });

  // TEST 10: Export PDF button exists
  test('should have Export PDF button', () => {
    render(<FinanceCalculator />);
    
    expect(screen.getByText(/Export as PDF/)).toBeInTheDocument();
  });

});