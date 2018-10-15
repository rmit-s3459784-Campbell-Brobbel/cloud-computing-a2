import React, {Component} from 'react';
import {Grid, Table, Well} from 'react-bootstrap';
import * as dateFormatter from "../../../other/date-formatting";
import {Button} from 'react-bootstrap';


class EmployeeShiftTable extends Component {

	constructor(props) {
		super(props);
		this.timeformat = this.timeformat.bind(this);
		this.giveawayShift = this.giveawayShift.bind(this);
	}

	componentDidMount() {

	}

	timeformat(date) {
		var h = date.getHours();
		var m = date.getMinutes();
		var x = h >= 12 ? 'pm' : 'am';
		h = h % 12;
		h = h ? h : 12;
		m = m < 10 ? '0'+m: m;
		var mytime= h + ':' + m + ' ' + x;
		return mytime;
	}

	giveawayShift(e) {
		console.log(this.props.shifts[e.target.id]);

	}

	render() {

		const shifts = this.props.shifts.map((shift, index)=>{

			let start = new Date(shift.start_time);
			let end = new Date(shift.end_time);

			return(
				<tr key={`shift-${shift.shift_id}`}>
					<td>{`${dateFormatter.dayNames[start.getDay()]} ${start.getDate()} ${dateFormatter.monthNames[start.getMonth()]}`}</td>
					<td>{`${this.timeformat(start)}`}</td>
					<td>{`${dateFormatter.dayNames[end.getDay()]} ${end.getDate()} ${dateFormatter.monthNames[end.getMonth()]}`}</td>
					<td>{`${this.timeformat(end)}`}</td>
					<td><Button id={index} bsStyle={'primary'} href={`/giveaway?id=${shift.shift_id}`}>Giveaway Shift</Button></td>

				</tr>);
		});
		return (
			<Grid fluid>
				<Well>
				<h1 style={{textAlign:"center"}}>Upcoming Shifts</h1>
				<Table>
					<thead>
						<tr>
							<th>Start Date</th>
							<th>Start Time</th>
							<th>End Date</th>
							<th>End Time</th>
						</tr>
					</thead>
					<tbody>
					{shifts}
					</tbody>
				</Table>
				</Well>
			</Grid>
		);
	}
}

export default EmployeeShiftTable;