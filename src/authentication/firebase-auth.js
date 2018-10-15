/**
 * Created by campbellbrobbel on 24/9/18.
 */
import firebase from "firebase";
var config = {
    apiKey: "AIzaSyA0ZUW60_EZZtjk0YTLcK4cHSNWvNr9ZzM",
    authDomain: "shift-manager-41992.firebaseapp.com",
    databaseURL: "https://shift-manager-41992.firebaseio.com",
    projectId: "shift-manager-41992",
    storageBucket: "shift-manager-41992.appspot.com",
    messagingSenderId: "457851947914"
};
const fire = firebase.initializeApp(config);
export default fire;