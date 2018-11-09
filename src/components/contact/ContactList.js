import React, {Component} from 'react';
import Contact from './Contact';
import {Consumer} from "../../context";

class ContactList extends Component {
    render() {

        return (
            <Consumer>
                {value => {
                    return (
                        <div>
                            <h1 className="display-4 mb-2"> <span className="text-danger">Contact</span> List</h1>
                            {
                                value.contacts.map((data, i) => {
                                    return <Contact contact={data} key={data.id}/>
                                })
                            }
                        </div>
                    )
                }
                }
            </Consumer>

        );
    }
}

ContactList.propTypes = {};

export default ContactList;
