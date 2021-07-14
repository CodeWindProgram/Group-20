
import React, { Component } from 'react';
import '../../App.css';
import '../Button.css';
import Apii from './Apii'
//import contacts from 'http://localhost:3001/api/question-answers';

class Home extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);

    }





    render() {
        return < div className="Home">
            <center>
                <i className="search icon"></i>
                <Apii />

            </center>
        </div >
    }
}

export default Home;
