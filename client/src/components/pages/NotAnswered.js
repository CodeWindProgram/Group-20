import '../../App.css';
import '../Button.css';
import React, { Component } from 'react'
export default class NotAnswered extends Component {

    constructor() {
        super();
        //  this.report = this.report.bind(this);
        //this.upvote = this.upvote.bind(this);
        this.state = {
            'que': []

        }
        this.state.report = null

    }


    componentDidMount() {
        this.getData()
    }
    getData() {
        var url = 'http://localhost:3001/api/not-answered';
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({ 'que': response }))
            .catch(error => console.error(error))
    }

    render() {
        return (
            <ul>
                {
                    this.state.que.map(function (que, index) {
                        return <center><div className="form-wrapper2"><form><h4>{que.que_id})</h4> <h4>{que.que_discription}</h4>
                            <p><break /><div className="tag">{que.que_tag}</div></p>
                        </form>
                            <input type="text" placeholder="Your answer" ></input>
                        </div ><button className="btn">Report</button> <button className="btn">Upvote</button></center>
                    })
                }
            </ul >
        )
    }
}