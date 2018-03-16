import React from 'react';
import ExpensesList from './ExpensesList';
import ExpenseListFilter from './ExpenseListFilter';
import ExpensesSummary from './ExpensesSummary';

const ExpensifyDashboardPage = () => (
    <div>
        <ExpenseListFilter />
        <ExpensesList />
        <ExpensesSummary />
    </div>
);

export default ExpensifyDashboardPage;