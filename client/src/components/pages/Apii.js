import '../../App.css';
import React, { Component } from 'react'

export default class apii extends Component {
    constructor() {
        super();
        this.state = {
            'que': []
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        var url = 'http://localhost:3001/api/question-answers';
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({ 'que': response }))
            .catch(error => console.error(error))
    }
    report = () => {
        console.log("Heloo")
    }
    render() {
        return (
            <ul>
                {
                    this.state.que.map(function (que, index) {

                        return <div className="form-wrapper2"><form> <h4>{que.que_discription}</h4>

                            <p><break /><div className="tag">{que.que_tag}</div></p>
                            <h5>{que.ans_discription}</h5></form>
                            <input type="text" placeholder="Your answer" ></input>
                            <button>Report</button>
                        </div >

                    })
                }
            </ul >
        )
    }
}