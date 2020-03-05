import React from "React";
import { Redirect, Route } from from "react-router-dom";


const token = localStorage.getItem('token')
const PrivateRoute = ({ component: Component, ...rest }) => {
	return(
	<Route {...rest} render={props => (
			token ? 
				<Component {...props} />
			 : <Redirect to= "/Adminlogin"/>
			)
		}/>
	);
};
export default PrivateRoute;