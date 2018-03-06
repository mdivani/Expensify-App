import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        <p>404 <Link to='/' activeClassName='is-active'>Go home</Link> </p>
    </div>
);

export default NotFoundPage;