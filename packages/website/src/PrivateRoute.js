import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthUtil from './util/auth-util'

const PrivateRoute = ({ component: Component, ...rest }) => ( 
	<Route 
		{...rest}
		 render={props => 
			AuthUtil.getauthtoken ? (
				<Component {...props} />
				) : (
				<Redirect to= {{
			 	pathname: "/Adminlogin",
			 	state: { from: props.location }
			 }}
			 />
			)
		}
	/>
);

export default PrivateRoute;