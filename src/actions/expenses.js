import uuid from 'uuid';
import database from '../firebase/firebase';

//add expense
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createAt = 0
    } = {}
) => {
    return (dispatch) => {
        const expense = {description, note, amount, createAt };
        return database.ref('expenses').push(expense)
                      .then((ref) => {
                        dispatch(addExpense({
                            id: ref.key,
                            ...expense
                        }))
                      });
    }
}

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