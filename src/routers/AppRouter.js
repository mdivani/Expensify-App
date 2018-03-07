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
                <Route path='/' component={ExpensifyDashboardPage} exact={true} />    
                <Route path='/create' component={AddExpensePage} />
                <Route path='/edit/:id' component={EditExpensePage} />
                <Route path='/help' component={HelpPage} /> 
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;