import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TopQuestion from './components/pages/TopQuestion';
import Notification from './components/pages/Notification';
import AskQuestion from './components/pages/AskQuestion';
import Answered from './components/pages/Answered';
import NotAnswered from './components/pages/NotAnswered';
import MyQuestions from './components/pages/MyQuestions';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/My-Questions' component={MyQuestions} />
        <Route path='/Top-Questions' component={TopQuestion} />
        <Route path='/Notification-Us' component={Notification} />
        <Route path='/Ask-Question' component={AskQuestion} />
        <Route path='/Answered' component={Answered} />
        <Route path='/Not-Answered' component={NotAnswered} />
      </Switch>
    </Router>
  );
}

export default App;
