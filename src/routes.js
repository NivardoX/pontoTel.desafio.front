import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import AuthService from './services/AuthService';
import MasterLayout from './components/masterLayout/MasterLayout'

import Home from './pages/home/Home';
import About from './pages/about/About';
import {UsersList ,UsersAdd ,UsersEdit, UsersView} from './pages/users/Users';





import { NotFound } from "./pages/utils/Utils";
import Login from "./pages/login/Login";
import {CompaniesAdd, CompaniesEdit, CompaniesList, CompaniesView} from "./pages/companies/Companies";

const Auth = new AuthService();

/*----------------------------------------------------------------------------------------------------*/

function PrivateRoute({ component: Component, ...rest })
{
	return (
		<Route {...rest} render=
			{
				props =>
					Auth.loggedIn() ?
					( <Component {...props} /> ) :
					( <Redirect to={{ pathname: "/login", state: { from: props.location } }} /> )
			}
		/>
	);
}

/*----------------------------------------------------------------------------------------------------*/

function Routes()
{
	return (
		<Router>
			<MasterLayout>
				{
					props =>
						<Switch>


							<PrivateRoute exact path="/" component={ (privateRouteProps) => (<Home {...privateRouteProps} {...props} />) } />
							<PrivateRoute path="/about" component={ (privateRouteProps) => (<About {...privateRouteProps} {...props} />) } />

							<PrivateRoute path="/users/list" component={ (privateRouteProps) => (<UsersList {...privateRouteProps} {...props} />) } />
							<PrivateRoute path="/users/add" component={ (privateRouteProps) => (<UsersAdd {...privateRouteProps} {...props} />) } />
							<PrivateRoute path="/users/edit" component={ (privateRouteProps) => (<UsersEdit {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/users/view" component={ (privateRouteProps) => (<UsersView {...privateRouteProps} {...props} />)} />

							<PrivateRoute path="/companies/list" component={ (privateRouteProps) => (<CompaniesList {...privateRouteProps} {...props} />) } />
							<PrivateRoute path="/companies/add" component={ (privateRouteProps) => (<CompaniesAdd {...privateRouteProps} {...props} />) } />
							<PrivateRoute path="/companies/edit" component={ (privateRouteProps) => (<CompaniesEdit {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/companies/view" component={ (privateRouteProps) => (<CompaniesView {...privateRouteProps} {...props} />)} />


							{/*<PrivateRoute path="/map-test" component={ (privateRouteProps) => (<MapTest {...privateRouteProps} {...props} />) } />*/}

							<Route path="/login" component={ Login } />


							<Route path='*' exact={true} component={NotFound} />

						</Switch>
				}

			</MasterLayout>
		</Router>
	);
}

/*----------------------------------------	------------------------------------------------------------*/

export default Routes;
