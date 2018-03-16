import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectedExpenses from '../selectors/expenses';
import totalExpensesSelector from '../selectors/expenses-total';

export const ExpensesSummary = (props) => {
    const totallingExpenses = numeral(totalExpensesSelector(props.expenses)/100).format('$0,0.00');
    const totalExpenses = props.expenses.length;
return (
    <div>
        {totalExpenses > 0 && <p>
            {
            props.expenses.length === 1 ? 
            `Viewing 1 expense totalling ${totallingExpenses}` : 
            `Viewing ${totalExpenses} expenses totalling ${totallingExpenses}`
            }
        </p>
        }
</div>
)
}

const fromStateToProp = (state) => ({
    expenses: selectedExpenses(state.expenses, state.filter)
})

export default connect(fromStateToProp)(ExpensesSummary);