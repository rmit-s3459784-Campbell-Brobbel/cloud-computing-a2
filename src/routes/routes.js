/**
 * Created by campbellbrobbel on 29/9/18.
 */
import React from 'react';
import {Route} from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage';
import EmployeeDashboard from '../components/pages/employee/EmployeeDashboard';
import GiveawayPage from '../components/pages/employee/EmployeeGiveawayPage';
import EmployeeAddShiftPage from "../components/pages/employee/EmployeeAddShiftPage";
import EmployeeMessagesPage from "../components/pages/employee/EmployeeMessagesPage";

const routeComponents = [
    {
        path: "/",
        exact: true,
        component: EmployeeDashboard
    },
    {
        path: "/login",
        exact: true,
        component: LoginPage
    },

	{
		path: "/giveaway",
		exact: true,
		component: GiveawayPage
	},
	{
		path: "/add",
		exact: true,
		component: EmployeeAddShiftPage
	},
	{
		path: "/messages",
		exact: true,
		component: EmployeeMessagesPage
	},
    // {
    //     path: "/",
    //     exact: true,
    //     component: Tacos,
    //     routes: [
    //         {
    //             path: "/tacos/bus",
    //             component: Bus
    //         },
    //         {
    //             path: "/tacos/cart",
    //             component: Cart
    //         }
    //     ]
    // }
];

const routes = routeComponents.map((route, index) => {
    return(<Route key={`route-${route.path}`} exact={route.exact} path={route.path} component={route.component}/>);
});

export {routes};