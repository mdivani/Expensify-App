import React from 'react';
import { shallow } from 'enzyme';
import ExpensifyDashboardPage from '../../components/ExpensifyDashboardPage';

test('should render page not found error correctly', () => {
    const wrapper = shallow(<ExpensifyDashboardPage />);
    expect(wrapper).toMatchSnapshot();
});