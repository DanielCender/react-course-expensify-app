import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return the correct total value of expenses', () => {
	const correct = 114195;
	const result = selectExpensesTotal(expenses);
	expect(result).toBe(correct);
});

test('should return 0 if expenses are empty', () => {
	const correct = 0;
	const result = selectExpensesTotal([]);
	expect(result).toBe(correct);
});

test('should return single amount if given 1 expense', () => {
	const correct = 195;
	const result = selectExpensesTotal([expenses[0]]);
	expect(result).toBe(correct);
});
