
import '../../App.css';
import '../Button.css';
//import img1 from '../images/question.jpg';
import React, { Component } from "react";


const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};

class AskQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Question: null,
            Tags: null,
            formErrors: {
                Question: "",
                Tags: ""
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        if ((formValid(this.state.formErrors)) && (this.state.Question != null && this.state.Tags != null)) {
            let data = {
                Question: this.state.Question,
                Tags: this.state.Tags
            };
            var request = new Request('http://localhost:3001/api/new-country', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json', "mode": "no-cors" }),
                body: JSON.stringify(data)
            })
            fetch(request)
                .then(function (response) {
                    response.json()
                        .then(function (data) {
                            console.log(data);
                            alert('We have submitted your question');

                        })
                        .catch(function (err) {
                            console.log(err)
                        })
                })

        }
        else {
            alert(` ` + this.state.formErrors.question + `` + this.state.formErrors.tags);
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        let formErrors = this.state.formErrors;
        switch (name) {
            case 'Question':
                var n = /[?]$/.test(value);
                if (!n) {
                    formErrors.question = "Enter Question mark";
                }
                else {
                    formErrors.question = "";
                }
                break;
            case 'Tags':
                if ((value.indexOf(' ') >= 0) || (value.indexOf(',') >= 0)) {
                    formErrors.tags = "Enter only one tag";
                }
                else {
                    formErrors.tags = "";
                }
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };
    render() {
        return <div className="wrapper">
            <div className="form-wrapper">

                <h1>Ask your Question</h1>
                <br />
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="question">
                        <lable htmlFor="question">Question</lable>
                        <input type="text"
                            className=""
                            placeholder="Enter Question"
                            name="Question"
                            style={{
                                height: 60
                            }}
                            onChange={this.handleChange}
                            noValidate
                        />

                    </div>
                    <br />
                    <div className="tags">
                        <lable htmlfor="tags">Tag</lable>
                        <input type="text"
                            className=""
                            placeholder="Enter tag"
                            name="Tags"
                            onChange={this.handleChange}
                            noValidate
                        />
                        <small>Only one tag allowed</small>

                    </div>
                    <br />
                    <button type="submit" className="btn"
                        style={{
                            justifyContent: "center",
                            alignContent: "center",
                            marginLeft: 120
                        }}>
                        Ask
                    </button>

                </form>

            </div>
        </div >
    }
}

export default AskQuestion;