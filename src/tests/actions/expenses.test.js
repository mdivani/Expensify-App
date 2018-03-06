import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

test('should remove expense action object', () => {
    const action = removeExpense('123abc');
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        expenseId: '123abc'
    });
});

test('should edit expense', () => {
    const action = editExpense('123abc', { note: 'new note value'});

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'new note value'
        }
    });
});

test('should add new expense with provided values', () => {
    const testExpense = {
        description: 'rent',
        note: 'last months rent',
        amount: 50000,
        createAt: 1000
    };
    const action = addExpense(testExpense);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...testExpense,
            id: expect.any(String)
        }
    });
});

test('should add new expense with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {           
            description: '',
            note: '',
            amount: 0,
            createAt: 0,
            id: expect.any(String)
        }
    });
});



