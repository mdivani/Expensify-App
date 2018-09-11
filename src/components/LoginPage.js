import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/Auth';

export const LoginPage = ({ startLogin }) => {
    return (
        <div className='box_layout'>
            <div className='box_layout__box'>
                <h1 className='heading heading--brand'>
                    <span className='heading--brand__first'>Mo</span>
                    <span className='heading--brand__second'>Bill</span>
                </h1>
                <p>track your expenses effectively</p>
                <button className='button' onClick={startLogin}>Login with Google</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);