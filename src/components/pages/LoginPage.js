/**
 * Created by campbellbrobbel on 24/9/18.
 */

import React, {Component} from 'react';
import {Grid, Row, Col, Alert} from 'react-bootstrap';
import {Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import fire from '../../authentication/firebase-auth';
import {appHistory} from '../../routes/appHistory';
class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: null
        };
        this.loginUser = this.loginUser.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    loginUser(e) {
		this.setState((prevState) => {
			return({
				error:null
			});
		});
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            appHistory.push('/');
        }).catch((error) => {
			this.setState((prevState) => {
				return({
					error:error.message
				});
			});
        })
    }

    handleChange(e) {
        e.persist();
        this.setState((prevState) => {
            return({
                [e.target.name]: e.target.value
            });
        });
    }

    render() {
        return (
            <Grid className="login-container">
                <Row>
                    <Col>
                <Form>
                    <FormGroup
                        controlId="formBasicText">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            type="email"
                            name="email"
                            placeholder="Enter text"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            name="password"
                            placeholder="Enter text"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                </Form>
                    </Col>
                </Row>
                <Row >
                    <Col lg={2}>
                        <Button type="submit" onClick={this.loginUser}>Login</Button>
                    </Col>
                    {this.state.error != null ? <Col><Alert bsStyle={'danger'}>{this.state.error}</Alert></Col> : null}
                </Row>

            </Grid>
        )
    }
}

export default LoginPage;