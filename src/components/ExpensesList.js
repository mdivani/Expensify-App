import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import SelectedExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            )
            : (
                props.expenses.map((expense, index) => {
                    return <ExpenseListItem {...expense} key={index} />
                })
            )
        }
    </div>
);

const fromStateToProp = (state) => ({
    expenses: SelectedExpenses(state.expenses, state.filter)
})

export default connect(fromStateToProp)(ExpenseList);