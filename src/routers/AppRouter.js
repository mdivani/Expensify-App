import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ExspensifyDashboardPage from '../components/ExspensifyDashboardPage';
import AddExspensePage from '../components/AddExpensePage';
import EditExspensePage from '../components/EditExspensePage';
import HelpPage from '../components/HelpPage';
import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path='/' component={ExspensifyDashboardPage} exact={true} />    
                <Route path='/create' component={AddExspensePage} />
                <Route path='/edit/:id' component={EditExspensePage} />
                <Route path='/help' component={HelpPage} /> 
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;