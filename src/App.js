import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactList from './components/contact/ContactList'
import Header from './components/layout/Header'
import About from './components/layout/About'
import NotFound from './components/layout/NotFound'
import AddContact from './components/contact/AddContact'
import EditContact from './components/contact/EditContact'
import {Provider} from "./context";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
class App extends Component {

    render() {
        return (
            <Provider>
                <Router>
            <div className="App">
                <Header title={"Contact Manager"}/>
                <div className="container">
                    <Switch>
                        <Route path={"/"} component={ContactList} exact/>
                        <Route path={"/about"} component={About} exact/>
                        <Route path={"/addContact"} component={AddContact}/>
                        <Route path={"/editContact/:id"} component={EditContact}/>
                        <Route component={NotFound}/>
                    <AddContact/>
                   <ContactList/>
                    </Switch>
                </div>
            </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
