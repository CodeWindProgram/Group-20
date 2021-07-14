//for home page
import '../../App.css';
import React, { Component } from 'react'



export default class apii extends Component {
    constructor() {
        super();
        this.state = {
            que: [],
            searchTerm: "",
            questions: []
        };

        this.searchsetter = this.searchsetter.bind(this);
        this.a = [];

    }



    componentDidMount() {
        this.getData()
    }
    getData() {
        var url = 'http://localhost:3001/api/question-answers';
        fetch(url)
            .then(response => response.json())
            .then(response => {
                this.setState({ que: response });
                this.setState({ questions: response });
            })
            .catch(error => console.error(error))
    }
    report = () => { }


    searchsetter = (e) => {
        this.setState({ searchTerm: e.target.value });

        for (var i = 0; i < this.state.que.length; i++) {
            if (this.state.que[i].que_discription.indexOf(this.state.searchTerm) !== -1 || this.state.que[i].que_tag.indexOf(this.state.searchTerm) !== -1) {
                this.a.push(this.state.que[i]);
            }
        }
        console.log(this.a);
        this.setState({ questions: this.a });
        this.a = [];
    }


    render() {
        return (

            <div>

                <input
                    type="text"
                    placeholder="Search Questions"
                    value={this.state.searchTerm}
                    onChange={this.searchsetter}
                />

                <ul>



                    {
                        this.state.questions.map(function (questions, index) {

                            return <div className="form-wrapper2"><form><h4>id = {questions.que_id} , </h4> <h4>{questions.que_discription}</h4>

                                <p><break /><div className="tag">{questions.que_tag}</div></p>
                                <h5>{questions.ans_discription}</h5></form>
                                <input type="text" placeholder="Your answer" ></input>
                                <button>Report</button>
                            </div >

                        })
                    }
                </ul >

            </div>
        )
    }
}
