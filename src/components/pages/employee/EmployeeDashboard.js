/**
 * Created by campbellbrobbel on 24/9/18.
 */

import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import EmployeeProfile  from './EmployeeProfile';
import EmployeeShiftTable from './EmployeeShiftTable';
import fire from '../../../authentication/firebase-auth';
import Loading from 'react-loading-animation';
import {apiConfig} from '../../../config/api-config';

class EmployeeDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            json: null,
			user: null
        };
        this.onAuthChange = this.onAuthChange.bind(this);
		this.updateProfile = this.updateProfile.bind(this);
    }

	updateProfile() {
    	fetch(apiConfig.directory + 'user.php?user=' + fire.auth().currentUser.email)
			.then((res) => {return res.json()})
			.then((data) => {
				this.setState((prevState) => {
					return({
						json: data
					});
				});
			})
			.catch((error)=>{
				console.log(error.message)
			})
	}

    onAuthChange() {
    	fire.auth().onAuthStateChanged((user)=>{
			if (user) {
				this.updateProfile()
			}
		})
	}


    componentDidMount() {
    	this.onAuthChange();
    }

    render() {
        return (
            <Grid>
				{this.state.json ?
					<Row>
						<Col lg={6}>
							{this.state.json ? <EmployeeProfile update={this.updateProfile} user={this.state.json.user}/> : null}
						</Col>
						<Col lg={6}>
							{this.state.json ? <EmployeeShiftTable shifts={this.state.json.shifts}/> : null }
						</Col>
					</Row>
					: <Row><Loading/></Row>}


			</Grid>
        )
    }
}

export default EmployeeDashboard;