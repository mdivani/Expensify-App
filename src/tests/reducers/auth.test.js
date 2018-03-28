import authReducer from '../../reducers/auth';

test('should set login state', () => {
    const actions = {
        type: 'LOGIN',
        uid: 'test123'
    }
    const state = authReducer(undefined, actions);
    expect(state).toEqual({
        uid: 'test123'
    });
});

test('should set logout state', () => {
    const actions = {
        type: 'LOGOUT'
    }
    const state = authReducer({uid: 'anything'}, actions);
    expect(state).toEqual({});
});