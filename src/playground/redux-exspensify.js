import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//default states
const expensesReducerDefaultState = [];
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

//expense actions
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description: description,
        note: note,
        amount: amount,
        createAt: createAt
    }
});

const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    expenseId: id
})

const editExpense = (id, updates) => ({
    type:'EDIT_EXPENSE',
    id,
    updates
})

//filter actions
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
    sortBy: 'date'
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

//filter method
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || startDate >= expense.createAt;
        const endDateMatch = typeof endDate !== 'number' || endDate <= expense.createAt;
        const textMatch = expense.note.toLowerCase().includes(text.toLowerCase()) || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createAt < b.createAt ? 1 : -1;
        }
        else if( sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
        else return 0;
    });
}

//reducers
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(expense => expense.id !== action.expenseId); 
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                else {
                    return expense;
                }
            });
        default:
        return state;
    }
}

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
        return state;
    }
}

//store
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filter: filterReducer
    })
);

//subscribe dispatch calls
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filter);
    console.log(visibleExpenses);    
});

//dispatch calls

const expenseOne = store.dispatch(addExpense({
    description: 'rent',
    amount: 100,
    createAt: -21000
}));

const expenseTwo = store.dispatch(addExpense({
    description: 'coffee',
    amount: 300,
    createAt: -2000
}));


//store.dispatch(removeExpense(expenseTwo.expense.id));

//store.dispatch(editExpense(expenseOne.expense.id, { expense: 600 }));

//store.dispatch(setTextFilter('cof'));
//store.dispatch(setTextFilter());

//store.dispatch(sortByAmount());
//store.dispatch(sortByDate());

//store.dispatch(setStartDate(125));
//store.dispatch(setStartDate());
//store.dispatch(setEndDate(1250));


//demo code
const demoState = {
    expenses: [{
        id: 'dsdsdsdd',
        description: 'January Rent',
        note: 'this was final payment for the address',
        amount: 54500,
        createAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //sort by amount or date
        startDate: undefined,
        endDate: undefined
    }
};

const user = {
    name: 'tamara',
    age: 27
}

console.log({
    ...user,
    location: 'Tbilisi',
    age: 28
})

