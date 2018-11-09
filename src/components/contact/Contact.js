import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Consumer} from "../../context";
import axios from 'axios';
import {Link} from 'react-router-dom';
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo: false
        }
    }

    onShowClick = (e) => {
        e.preventDefault();
        this.setState({showInfo: !this.state.showInfo})
    }
    onDeleteClick = (id, dispatch) => {
        try {


            axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => {
                console.log(res)
                dispatch({
                    type: 'DELETE_CONTACT',
                    payload: id
                });
            })
        } catch (e) {
            dispatch({
                type: 'DELETE_CONTACT',
                payload: id
            });
        }
    }

    render() {
        const {contact} = this.props;
        return (
            <Consumer>
                {value => {
                    return (
                        <div className="card card-body mb-3">
                            <h4>
                                {contact.name}
                                <i onClick={this.onShowClick} className="fas fa-sort-down" style={{cursor: 'pointer'}}/>
                                <i onClick={this.onDeleteClick.bind(this, contact.id, value.dispatch)}
                                   className="fas fa-times"
                                   style={{cursor: 'pointer', color: 'red', float: 'right'}}/>
                              <Link to={`/editContact/${contact.id}`}>
                                  <i className="fas fa-pencil-alt" style={{cursor:'pointer',float:'right',color:'black',marginRight:'1rem'}}></i>
                              </Link>

                            </h4>
                            {this.state.showInfo ?
                                <ul className="list-group">
                                    <li className="list-group-item">{"Email " + contact.email}</li>
                                    <li className="list-group-item">{"Contact " + contact.contact}</li>
                                </ul>
                                : null}
                        </div>
                    );
                }}
            </Consumer>
        );

    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default Contact;
