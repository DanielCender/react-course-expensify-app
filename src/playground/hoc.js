import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//	Higher Order Component (HOC) - A component that renders another component
//	Goal is to reuse code
//	Redner hijacking
//	Prop manipulation
//	Abstract state

const Info = props => (
	<div>
		<h1>Info</h1>
		<p>The info is: {props.info}</p>
	</div>
);

const withAdminWarning = WrappedComponent => {
	return props => (
		<div>
			{props.isAdmin && <p>This is private info. Please don't share!</p>}
			<WrappedComponent {...props} />
		</div>
	);
};

const requireAuthentication = WrappedComponent => {
	return props => (
		<div>
			{props.isAuthenticated ? (
				<WrappedComponent {...props} />
			) : (
				<p>User is not authenticated!</p>
			)}
		</div>
	);
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(
	<AuthInfo isAuthenticated={true} info="These are the details" />,
	document.getElementById('app'),
);
