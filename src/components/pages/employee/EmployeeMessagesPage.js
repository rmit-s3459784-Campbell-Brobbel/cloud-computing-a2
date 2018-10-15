import React, {Component} from 'react';
import EmployeeMessagesTable from './EmployeeMessagesTable';
import {apiConfig} from "../../../config/api-config";
import fire from "../../../authentication/firebase-auth";
import Loading from "react-loading-animation";
class EmployeeMessagesPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: null,
			messages: [],
			isLoading: false
		};
		this.onAuthChange = this.onAuthChange.bind(this);
		this.refreshMessages = this.refreshMessages.bind(this);
	}

	componentDidMount() {
		this.setState(()=>{return {isLoading: true}});
		this.refreshMessages();

		if (fire.auth().currentUser == null) {
			this.onAuthChange();
		}

	}

	onAuthChange() {
		fire.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState((prevState) => {
					return({isLoading: true});
				});
				this.refreshMessages();
			}
		});

	}

	refreshMessages() {
		if (fire.auth().currentUser) {
			fetch(apiConfig.directory + 'messages.php?user=' + fire.auth().currentUser.email, {})
				.then((res)=>{return res.json()})
				.then((data)=>{
					this.setState((prevState) => {
						return({messages: data, isLoading: false});
					});
				})
				.catch((error)=>{

				});
		}
		else {
			this.setState((prevState) => {
				return({isLoading: false});
			});
		}
	}
	render() {

		return (
			<div>
				<h1>Messages</h1>
				{this.state.isLoading ? <Loading/> :null}
				{this.state.messages ? <EmployeeMessagesTable onClick={this.refreshMessages} messages={this.state.messages}/> :
					<div>No message to display</div>}
			</div>
		);
	}
}

export default EmployeeMessagesPage;