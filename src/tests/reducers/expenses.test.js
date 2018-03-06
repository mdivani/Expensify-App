import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
})

test('should remove expnese by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expenseId: expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expnese if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expenseId: -1
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        description: 'water bill',
        note: '',
        amount: 2250,
        createAt: 560001000
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense: expense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([
        ...expenses,
        expense
    ])
})

test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            description: 'updated rent'
        }
     }
     const state = expensesReducer(expenses, action);
     expect(state[0]).toEqual({
         ...expenses[0],
         ...action.updates
     });   
});

test('should not edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: "-1",
        updates: {
            description: 'updated rent'
        }
     }
     const state = expensesReducer(expenses, action);
     expect(state).toEqual(expenses);       
})