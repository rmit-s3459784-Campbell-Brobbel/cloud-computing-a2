import React, {Component} from 'react';
import {Button, Well, FormControl, FormGroup,ControlLabel, Alert} from 'react-bootstrap';
import {apiConfig} from "../../../config/api-config";
import fire from "../../../authentication/firebase-auth";
import Loading from 'react-loading-animation';
import {appHistory} from "../../../routes/appHistory";

class EmployeeAddShiftPage extends Component {

	constructor() {
		super();
		this.state = {
			loading: false,
			hours: 1,
			error: null
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.handleHourChange = this.handleHourChange.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.target);
		this.setState(()=>{return {loading: true}});
		fetch(apiConfig.directory + 'add-shift.php?user=' + fire.auth().currentUser.email, {
			method: "POST",
			body: data
		})
		.then((res)=>{return res.json()})
		.then((data)=>{
			console.log(data);
			this.setState(()=>{return {loading: false}});
			if (data.error) {
				this.setState(()=>{return {error: data.error}});
			}
			else {
				appHistory.push('/');
			}

		})
		.catch((error)=>{
			console.log(error)
		})

	}

	handleHourChange(e) {
		const hours = e.target.value;
		this.setState(()=>{return {hours: hours}});
	}

	render() {
		return (
			<div>

				<Well>
					{this.state.loading ? <div><Loading/></div> : null}
					<form onSubmit={this.onSubmit}>
						<FormGroup controlId="startMonth">
							<ControlLabel>Start Date/Time</ControlLabel>
							<div style={{display:"flex", flexDirection: "row"}}>
							<FormControl name={'startMonth'} componentClass="select">
								<option value="1">January</option>
								<option value="2">February</option>
								<option value="3">March</option>
								<option value="4">April</option>
								<option value="5">May</option>
								<option value="6">June</option>
								<option value="7">July</option>
								<option value="8">August</option>
								<option value="9">September</option>
								<option value="10">October</option>
								<option value="11">November</option>
								<option value="12">December</option>
							</FormControl>
							<FormControl name={'startDate'} componentClass="select">
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
								<option value="27">27</option>
								<option value="28">28</option>
								<option value="29">29</option>
								<option value="30">30</option>
								<option value="31">31</option>
							</FormControl>
								<FormControl name={'startYear'} componentClass="select">
									<option value="2018">2018</option>
									<option value="2019">2019</option>
									<option value="2020">2020</option>
								</FormControl>
							</div>
							<div style={{display:"flex", flexDirection: "row"}}>
								<FormControl name={'startHour'} componentClass="select">
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
									<option value="10">10</option>
									<option value="11">11</option>
									<option value="12">12</option>
								</FormControl>
								<FormControl name={'startMinute'} componentClass="select">
									<option value="00">00</option>
									<option value="15">15</option>
									<option value="30">30</option>
									<option value="45">45</option>
								</FormControl>
								<FormControl name={'startFormat'} componentClass="select">
									<option value="am">AM</option>
									<option value="pm">PM</option>
								</FormControl>
							</div>
						</FormGroup>
						<FormGroup controlId="hours">
							<ControlLabel>Hours</ControlLabel>
							<div style={{display:"flex", flexDirection: "row"}}>
								<FormControl onChange={this.handleHourChange} value={this.state.hours} type={'number'} name={'hours'} min={1} max={24}></FormControl>
							</div>
						</FormGroup>
						<Button type={'submit'} bsStyle={'success'}>Add Shift</Button>

					</form>
				</Well>
				{this.state.error ? <Alert bsStyle="danger">{this.state.error}</Alert> : null}
			</div>
		);
	}
}

export default EmployeeAddShiftPage;