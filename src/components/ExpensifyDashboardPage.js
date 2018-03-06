import React from 'react';
import ExpensesList from './ExpensesList';
import ExpenseListFilter from './ExpenseListFilter';

const ExpensifyDashboardPage = () => (
    <div>
        <ExpenseListFilter />
        <ExpensesList />
    </div>
);

export default ExpensifyDashboardPage;