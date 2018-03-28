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
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const expense = {description, note, amount, createAt };
        return database.ref(`users/${uid}/expenses`).push(expense)
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
    id: id
})

export const startRemoveExpense = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense(id));
        }).catch((error) => {
            console.log(error);
        });
    }
}
//edit expense
export const editExpense = (id, updates) => ({
    type:'EDIT_EXPENSE',
    id,
    updates
})

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    }
}

//SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`).once('value').then((snap) => {
            const expenses = [];
            snap.forEach(childSnap => {
                expenses.push({
                    id: childSnap.key,
                    ...childSnap.val()
                });
            });
            dispatch(setExpenses(expenses));
        }).catch((error)=> {
            //if user isn't signed on refresh this error gets called
        });
    }
}