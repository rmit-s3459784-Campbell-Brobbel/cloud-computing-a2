import React, { Component } from 'react';
import {routes} from './routes/routes';
import {Grid} from 'react-bootstrap';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import './App.css';
import fire from './authentication/firebase-auth';
import {employeeNav, staticNav} from './config/nav-config'
import {Router} from 'react-router-dom';
import {appHistory} from './routes/appHistory';
import {apiConfig} from './config/api-config';
import {NavLink} from 'react-router-dom';
class App extends Component {

    constructor(props){
        super(props);
        this.authListen = this.authListen.bind(this);
        console.log("Constructor");
        this.state = {
            user : null,
            navConfig: staticNav
        };
        this.signoutUser = this.signoutUser.bind(this);
    }

    componentDidMount() {
    	if (!this.state.user) {
			this.authListen();
		}
    }
    authListen(e) {
        fire.auth().onAuthStateChanged((user) => {

            // If the user is successfully logged in. Download their account details.
            if (user) {
				fetch(apiConfig.directory + 'userType.php?user=' + user.email)
					.then((resp) => {return resp.json()})
					.then((data) => {
						this.setState((prevState) => {
							return({
								user: data,
								navConfig: user === null ? staticNav : employeeNav
							});
						});

					});
            }
            // Otherwise set user state data to null.
            else {
				this.setState((prevState) => {
					return({
						user: null,
						navConfig: user === null ? staticNav : employeeNav
					});
				});
            }
            // Redirect to login page if there is no user logged in.
			if (!user) {
				appHistory.push('/login');
			}
        })
    }

    signoutUser() {
        fire.auth().signOut();
    }
    render() {

        const navLinksLeft = this.state.navConfig.left.map((navItem, index) => {
            return(
                <li key={`app-nav-right-item-${index}`}>
					<NavLink to={navItem.link}>{navItem.title}</NavLink>
                </li>
            );
        });
        const navLinksRight = this.state.navConfig.right.map((navItem, index) => {
            return(
            <NavItem key={`app-nav-right-item-${index}`} eventKey={`nav-item-right-${index}`} href={navItem.link}>
                {navItem.title}
            </NavItem>
            );
        });

        return (
			<Router history={appHistory}>

			<div className="App">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <NavLink to={this.state.navConfig.brand.link}>{this.state.navConfig.brand.title}</NavLink>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <ul className={'nav navbar-nav'}>
                        {navLinksLeft}
                    </ul>
                    <Nav pullRight>
                        {navLinksRight}
                        {this.state.user === null ? <NavItem key={'app-nav-login'} eventKey={`nav-item-right-auth`} href="/login">
                            Login
                        </NavItem> :
                            <NavItem key={'app-nav-logout'} eventKey={`nav-item-right-auth`} onClick={this.signoutUser}>
                                <span>Logout</span>
                            </NavItem>}
                    </Nav>
                </Navbar>
                    <Grid>
                        {routes}
                    </Grid>
            </div>
			</Router>

		);
      }
}

export default App;
