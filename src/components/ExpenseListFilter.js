import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilter extends React.Component {
    state = {
        calendarFocused: null
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }))
    }

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }
    
    onSortChange = (e) => {
        const sortBy = e.target.value;
            if(sortBy === 'date') {
                this.props.sortByDate();
            }
            else if(sortBy === 'amount') {
                this.props.sortByAmount();
            }
    }
    
    render() {
        return (
            <div>
                <input type='text' value={this.props.filter.text} onChange={this.onTextChange} />
                <select 
                    value={this.props.filter.sortBy}
                        onChange={this.onSortChange}
                >
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filter.startDate}
                    endDate={this.props.filter.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                 />
            </div>
        );
    }
}


const fromStateToProp = (state) => {
    return {
        filter: state.filter
    }
}

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate),
    sortByAmount: () => dispatch(sortByAmount),
    setStartDate: (date) => dispatch(setStartDate(date)),
    setEndDate: (date) => dispatch(setEndDate(date))
})

export default connect(fromStateToProp, mapDispatchToProps)(ExpenseListFilter);

