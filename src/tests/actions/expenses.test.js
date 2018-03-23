import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, removeExpense, editExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'mouse',
        amount: 3000,
        note: 'wild mouse',
        createAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(()=> {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        database.ref(`expenses/${action[0].expense.id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        })
    });
});

test('should add expense with defaults to database and store', () => {
    const store = createMockStore({});

    store.dispatch(startAddExpense()).then(()=> {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                description: '',
                note: '',
                amount: 0,
                createAt: 0
            }
        });
        database.ref(`expenses/${action[0].expense.id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual({
                description: '',
                note: '',
                amount: 0,
                createAt: 0
            });
            done();
        })
    });
});

// test('should add new expense with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {           
//             description: '',
//             note: '',
//             amount: 0,
//             createAt: 0,
//             id: expect.any(String)
//         }
//     });
// });



