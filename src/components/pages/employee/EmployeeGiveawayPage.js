import React, {Component} from 'react';
import qs from 'query-string';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Alert} from 'react-bootstrap';
import {apiConfig} from "../../../config/api-config";
import fire from '../../../authentication/firebase-auth';
import {appHistory} from "../../../routes/appHistory";
import Loading from 'react-loading-animation';

class EmployeeGiveawayPage extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			error: null,
			isLoading: false
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		let data = new FormData(e.target);
		this.setState(()=>{return {isLoading: true}});

		fetch(apiConfig.directory + 'shift-giveaway.php', {
			method: "POST",
			body: data
		})
		.then((res)=>{return res.json()})
		.then((data)=>{
			this.setState(()=>{return {isLoading: false}});

			if(data.error) {
				this.setState((prevState)=>{
					return({error: data.error});
				});
			}
			else {
				appHistory.push('/');
			}
		})
		.catch((error)=>{
			console.log(error.message);
		})

	}

	render() {
		let value = qs.parse(this.props.location.search)['id'];
		return (
			<Grid fluid>
				<Row>
					{this.state.isLoading ? <Loading/> :null}
					<Col lg={12} style={{margin:"20px"}}>
						<form onSubmit={this.handleSubmit}>
							<FormGroup>
								<ControlLabel>Send To</ControlLabel>
								<FormControl name={'receiver-id'} type={'input'} placeholder={'Employee ID (e.g. johnsmith@hotmail.com'}/>
								<FormControl name={'shift-id'} type={'hidden'} value={value}/>
								{fire.auth().currentUser ?
									<FormControl name={'sender-id'} type={'hidden'} value={fire.auth().currentUser.email}/>
									: null}

							</FormGroup>
							<Button bsStyle={'primary'} type="submit">Send</Button>
						</form>
					</Col>
				</Row>
				<Row>
					<Col lg={12} style={{margin:"20px"}}>
						{this.state.error ? <Alert bsStyle={'danger'}><div style={{display:'flex', flexDirection:'column'}}>
						<span>{this.state.error}</span></div></Alert> : null}
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default EmployeeGiveawayPage;