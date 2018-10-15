import React, {Component} from 'react';
import {Grid, Row, Table, Image, Well, FormControl, ControlLabel, Panel, Button} from 'react-bootstrap';
import {apiConfig} from "../../../config/api-config";
import fire from '../../../authentication/firebase-auth';
import Loading from 'react-loading-animation';


class EmployeeProfile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			imageChange: false,
			imageLoading: false
		};
		this.onImageClick = this.onImageClick.bind(this);
		this.imageSubmit = this.imageSubmit.bind(this);
	}

	onImageClick(e) {
		this.setState((prevState)=>{
			return({imageChange: !prevState.imageChange});
		});
	}

	imageSubmit(e) {
		e.preventDefault();
		const form = new FormData(e.target);
		const fileName = form.get("profile-image").name;
		this.setState(()=>{return {imageLoading: true}});
		fetch(apiConfig.directory + 'upload-image.php?name=' + fileName + '&user=' + fire.auth().currentUser.email, {
			method: "POST",
			body: form.get('profile-image')
		})
		.then((res)=>{return res.json()})
		.then((data)=>{
			this.props.update();
			this.setState(()=>{return {imageChange: false, imageLoading: false}});
		})
		.catch((error)=>{

		})

	}

	render() {
		return (
			<Grid fluid style={{textAlign:"center"}}>
				<Well>
					<Row style={{padding:"10px"}}>
						{!this.state.imageLoading ? <Image circle key={`image-photo`} src={this.props.user.employee_img_link} width={200}
							   style={{cursor: 'pointer'}} className={'profile-image'} onClick={this.onImageClick}/> : <Loading/>}
						{this.state.imageChange ?
							<Panel style={{textAlign:"left"}}>
							<form onSubmit={this.imageSubmit}>
								<ControlLabel>Change Profile Image</ControlLabel>
								<FormControl name={'profile-image'} type={'file'}/>
								<Button type={"submit"} bsStyle={'success'}>Submit Change</Button>
							</form></Panel> : null}
					</Row>
					<Row>
						<Table>
							<tbody>
								<tr>
									<th>Name</th>
									<td>{`${this.props.user.employee_first_name} ${this.props.user.employee_last_name}`}</td>
								</tr>
								<tr>
									<th>Email</th>
									<td>{`${this.props.user.employee_account_id}`}</td>
								</tr>
								<tr>
									<th>Employer</th>
									<td>{`${this.props.user.employer_business_name}`}</td>
								</tr>
							</tbody>
						</Table>
					</Row>
				</Well>
			</Grid>
		);
	}
}

export default EmployeeProfile;