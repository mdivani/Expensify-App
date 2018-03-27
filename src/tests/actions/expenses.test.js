import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
     startAddExpense, 
     addExpense, 
     removeExpense, 
     editExpense, 
     setExpenses, 
     startSetExpenses,
     startRemoveExpense,
     startEditExpense
     } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({id, description, note, amount, createAt}) => {
        expenseData[id] = { description, note, amount, createAt };
    });
    database.ref('expenses').set(expenseData).then(() => done());
});

test('should remove expense action object', () => {
    const action = removeExpense('123abc');
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore();
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense(id)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        done();
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

test('should edit data to firebase', () => {
    const store = createMockStore();
    const id = expenses[0].id;
    const updates = {
        description: 'updated data',
        amount: 12500
    }
    store.dispatch(startEditExpense(id, updates)).then((done) => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id: id,
            updates
        });
        done();
    })
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

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

