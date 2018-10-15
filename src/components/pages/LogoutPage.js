/**
 * Created by campbellbrobbel on 24/9/18.
 */

import React, {Component} from 'react';
import fire from '../../authentication/firebase-auth';

class LogoutPage extends Component {

    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser() {
        fire.auth().signOut();
    }

    componentDidMount() {
        this.logoutUser();
    }

    render() {
        return (
            <div>
                Signing Out
            </div>
        )
    }
}

export default LogoutPage;