import React from 'react';
import {Link} from 'react-router-dom';
import { startLogout } from '../actions/Auth';
import { connect } from 'react-redux';

export const Header = ({startLogout}) => (
    <header className='header'>
    <div className='content_container'>
        <div className='header__content'>
            <Link className='header__title' to='/dashboard'>
                <h1 className='heading heading--brand'>
                    <span className='heading--brand__first'>Mo</span>
                    <span className='heading--brand__second'>Bill</span>
                </h1>
            </Link>
            <button className='button button--link' onClick={startLogout}>Logout</button>
        </div>    
    </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);