export default (expenses = []) => {
    let total = 0;
    expenses.forEach((expense) => {
        total += expense.amount || 0;
    })
    return total;
}