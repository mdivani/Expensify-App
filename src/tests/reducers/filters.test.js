import moment from 'moment';
import filterReducer from '../../reducers/filters'

test('should return default state', () => {
    const state = filterReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should sort by amount', () => {
    const action = {
        type: 'SORT_BY_AMOUNT',
        sortBy: 'amount'
    }
    const state = filterReducer(undefined, action);
    expect(state.sortBy).toBe('amount');
});

test('should sort by date', () => {
    const prevState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    }
    const action = {
        type: 'SORT_BY_DATE',
        sortBy: 'date'
    }
    const state = filterReducer(prevState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const action = {
        type: 'SET_TEXT_FILTER',
        text: 'gas'
    }
    const state = filterReducer(undefined, action);
    expect(state.text).toBe('gas');
});

test('should set start date', () => {
    const startDate = moment()
    const action = {
        type: 'SET_START_DATE',
        startDate
    }
    const state = filterReducer(undefined, action);
    expect(state.startDate).toEqual(startDate);
});

test('should set end date', () => {
    const endDate = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate
    }
    const state = filterReducer(undefined, action);
    expect(state.endDate).toEqual(endDate);
});