import React, {Component} from 'react';
import {Consumer} from "../../context";
import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: '',
            errors: {}
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => {
            this.setState({
                name: res.data.name,
                email: res.data.email,
                phone: res.data.contact
            })
        })
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (dispatch, e) => {
        e.preventDefault();
        const {name, email, phone} = this.state;
        if (name === '') {
            this.setState({errors: {name: 'Name is Required'}});
        }
        else if (email === '') {
            this.setState({errors: {email: 'Email is Required'}});
        }
        else if (phone === '') {
            this.setState({errors: {phone: 'Phone is Required'}});
        }
        else {
            const id = this.props.match.params.id;
            const newContact = {
                name,
                email,
                contact: phone
            };
            axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, newContact).then(res => {
                dispatch({type: 'UPDATE_CONTACT', payload: res.data});
                this.props.history.push("/");
            })
        }
    }

    render() {
        const {name, email, phone, errors} = this.state;
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">
                                <h1>Edit Contact</h1>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup name={"name"} placeholder={"Enter Name..."} value={name}
                                                    onChange={this.onChange} label={"Name"} error={errors.name}/>
                                    <TextInputGroup name={"email"} placeholder={"Enter Email..."} value={email}
                                                    onChange={this.onChange} label={"Email"} type={"email"}
                                                    error={errors.email}/>
                                    <TextInputGroup name={"phone"} placeholder={"Enter Phone..."} value={phone}
                                                    onChange={this.onChange} label={"Phone"} error={errors.phone}/>
                                    <input type="submit" value="Update Contact" className="btn btn-light btn-block"/>
                                </form>

                            </div>

                        </div>
                    );
                }}
            </Consumer>
        )

    }
}

EditContact.propTypes = {};

export default EditContact;
