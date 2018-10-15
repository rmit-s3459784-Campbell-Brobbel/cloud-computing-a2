import React from 'react';
import {Route} from 'react-router-dom';


const EmployeeRoute = (userType, component, ...rest) => {

	return(<Route component={()=>{(userType === 'employee') ?  component : null}}/>);
};

const EmployerRoute = () => {};