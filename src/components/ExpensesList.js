import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import SelectedExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div className='content_container'>
        <div className='list-header'>
            <div className='show-for-mobile'>Expenses</div>
            <div className='show-for-desktop'>Expense</div>
            <div className='show-for-desktop'>Amount</div>
        </div>
        <div className='list-body'>
        {
            props.expenses.length === 0 ? (
                <div className='list-item list-item--message'>
                    <span>No expenses</span>                
                </div>
            )
            : (
                props.expenses.map((expense, index) => {
                    return <ExpenseListItem {...expense} key={index} />
                })
            )
        }        
        </div>
    </div>
);

const fromStateToProp = (state) => ({
    expenses: SelectedExpenses(state.expenses, state.filter)
})

export default connect(fromStateToProp)(ExpenseList);