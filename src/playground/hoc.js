import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>this is info about: {props.info}</p>
    </div>
)

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>this is private information</p>}
            <WrappedComponent {...props} />
        </div>
    )
}

const withRequireAuth = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please authorize to see info</p>}
        </div>
    )
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = withRequireAuth(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info='some info'/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info='some info'/>, document.getElementById('app'));
