import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    login,
    logout
     } from '../../actions/auth';

test('should login user', () => {
    const id = 'test123';
    expect(login(id)).toEqual({
        type: 'LOGIN',
        uid: id
    })
});  

test('should logout user', () => {
    expect(logout()).toEqual({
        type: 'LOGOUT'
    })
}); 
