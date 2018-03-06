import uuid from 'uuid';

//add expense
export const addExpense = (
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
//remove expense
export const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    expenseId: id
})
//edit expense
export const editExpense = (id, updates) => ({
    type:'EDIT_EXPENSE',
    id,
    updates
})