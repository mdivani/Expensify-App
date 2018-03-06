import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();
store.subscribe(() => {
    const state = store.getState();
    console.log(getVisibleExpenses(state.expenses, state.filter));
});

store.dispatch(addExpense({
    description: 'water bill',
    amount: 350
}));

store.dispatch(addExpense({
    description: 'Gas Bill',
    amount: 850,
    createAt: 1000
}));

store.dispatch(addExpense({
    description: 'rent',
    amount: 103500
}));


const jsx = (
    <Provider store={store}>
       <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
