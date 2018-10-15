import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import {apiConfig} from "../../../config/api-config";
import fire from '../../../authentication/firebase-auth';
import {appHistory} from "../../../routes/appHistory";
import {Well} from 'react-bootstrap';
class EmployeeMessagesTable extends Component {

	constructor(props) {
		super(props);
		this.state = {isLoading: false};
		this.onAccept = this.onAccept.bind(this);
		this.onDecline = this.onDecline.bind(this);
		this.refreshPage = this.refreshPage.bind(this);

	}

	onAccept(e) {
		const message = this.props.messages[e.target.id];

		let data = {
			user: fire.auth().currentUser.email,
			shift_giveaway_id: message.shift_giveaway_id,
			response: "accept"
		};
		fetch(apiConfig.directory + 'giveaway-response.php', {
			method: "POST",
			body: JSON.stringify(data)
		})
			.then((res)=>{return res.json()})
			.then((data)=>{
				this.props.onClick();
			})
			.catch((error)=>{
			});
	}

	onDecline(e){
		const message = this.props.messages[e.target.id];

		let data = {
			user: fire.auth().currentUser.email,
			shift_giveaway_id: message.shift_giveaway_id,
			response: "decline"
		};
		fetch(apiConfig.directory + 'giveaway-response.php', {
			method: "POST",
			body: JSON.stringify(data)
		})
		.then((res)=>{return res.json()})
		.then((data)=>{
			this.props.onClick();
		})
		.catch((error)=>{
			console.log(error);
		});

	}

	refreshPage() {
		appHistory.push('/messages');
	}

	render() {

		const MessageTableItem = (props) => {
			return(
				<tr>
					<td>{props.message.sending_employee_id} wishes to send you the following shift</td>
					<td>{props.message.start_time}</td>
					<td>{props.message.end_time}</td>
					<td style={{display:'flex',justifyContent:'space-evenly'}}>
						<Button id={props.index} onClick={this.onAccept} bsStyle={'success'}>Accept</Button>
						<Button id={props.index} onClick={this.onDecline} bsStyle={'danger'}>Decline</Button>
					</td>

				</tr>);
		};


		const messages = this.props.messages.map((message, index) => {
			return(<MessageTableItem key={`message-${index}`} index={index} message={message}/>);
		});


		return (
			<div>
				{this.props.messages.length  > 0 ? <Table striped bordered condensed hover>
					<tbody>{messages}</tbody></Table>
					: <Well>No Messages</Well>}
			</div>
		);
	}
}


export default EmployeeMessagesTable;