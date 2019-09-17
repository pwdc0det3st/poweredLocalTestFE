import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Form from 'react-bootstrap/lib/Form';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import { Dropdown, MenuItem } from 'react-bootstrap/lib';
import ErrorAlert from 'react-bootstrap/lib/Alert';
import Modal from 'react-bootstrap/lib/Modal';
import signupController from './controller';
import InputGroupAddon from 'react-bootstrap/lib/InputGroupAddon';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import CheckBox from 'react-bootstrap/lib/Checkbox';
import './style.css';

export default class LoginScreen extends Component {
	constructor(props) {
		super(props);

		this.init();
	}

	init() {
		let initState = {
			firstName : '',
			lastName : '',
 			email: '',
			phone: '',
			address: '',
			gender: 'Gender',
			emailInvalidLabelClass: '',
			phoneInvalidLabelClass: '',
			formValid: {
				emailValid: false,
				phoneValid: false,
				genderSelected: false
			},
			formInvalidText: '',
		};
		this.state = initState;
	}
	handleFirstNameChange = (firstName) => {let state = this.state; state.firstName = firstName; this.setState(state)}
	handleLastNameChange = (lastName) => {let state = this.state; state.lastName = lastName; this.setState(state)}
	handleAddressChange =(address) => {let state = this.state; state.address = address; this.setState(state)}
	handleEmailChange = (emailText) => {
		let state = this.state,
			emailIsValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailText);

		if (emailIsValid) {
			state.emailInvalidLabelClass = ''
			state.formValid.emailValid = true
		} else {
			state.emailInvalidLabelClass = 'glyphicon glyphicon-warning-sign form-control-feedback'
		}
		state.email = emailText;
		this.setState(state);
	}
	handlePhoneNumberChange = (phoneNumber) => {
		let state = this.state,
			phoneIsValid = /^\d+$/.test(phoneNumber) && phoneNumber.length == 9
		console.log(phoneIsValid);
		if (phoneIsValid) {
			state.phoneInvalidLabelClass = ''
			state.formValid.phoneValid = true
		} else {
			state.phoneInvalidLabelClass = 'glyphicon glyphicon-warning-sign form-control-feedback'
		}
		state.phone = phoneNumber;
		this.setState(state);
	}

	handleGenderSelect = (keySelected) => {
		const genderMap = {
			0: 'Male',
			1: 'Female'
		};
		let state = this.state;
		state.gender = genderMap[keySelected];
		state.formValid.genderSelected = true;
		this.setState(state);

	}

	handleSubmit = async () => {
		let state = this.state,
			formIsValid = Object.keys(state.formValid).reduce((accumalatedState, currentValue) => accumalatedState && state.formValid[currentValue], true);
		console.log(state.formValid);
		if (formIsValid) {
			console.log('Form is Valid');
			const prospect = {
				firstName: state.firstName,
				lastName: state.lastName,
				email: state.email,
				gender: state.gender,
				address: state.address,
				phone: state.phone
			}
			console.log(prospect);
			await signupController.submit(prospect)
				.then(result => {
					if(!result.status == 200)
						state.formInvalidText = result.body.message;
				})
				
		}
		else {
			console.log('form is invalid')
			state.formInvalidText = 'Form is invalid'
		}
		this.setState(state);
	}

	render() {
		return (
			<div className="bg">
				<Panel className="loginPanel col-md-4 col-md-pull-4" id="pnlLogin">
					<h3 id="lblPanel">Signup for news letter</h3>
					{/* <div className="line"></div> */}
					<h5 className="inputLabel panelMargin">First Name</h5>
					<InputGroup>
						<InputGroupAddon className="inputGRP glyphicon glyphicon-user "></InputGroupAddon>
						<input type="text" className="form-control" name="email" id="txtEmail"
							onChange={(event) => this.handleFirstNameChange(event.target.value)} placeholder="John"
							aria-describedby="basic-addon1"></input>
					</InputGroup>
					<h5 className="inputLabel panelMargin">Last Name</h5>
					<InputGroup>
						<InputGroupAddon className="inputGRP glyphicon glyphicon-user"></InputGroupAddon>
						<input type="text" className="form-control" name="email" id="txtEmail"
							onChange={(event) => this.handleLastNameChange(event.target.value)} placeholder="Wick"
							aria-describedby="basic-addon1"></input>
					</InputGroup>
					<h5 className="inputLabel panelMargin">Email Address</h5>
					<InputGroup>
						<InputGroupAddon className="inputGRP glyphicon glyphicon-envelope "></InputGroupAddon>
						<input type="text" className="form-control" name="email" id="txtEmail"
							onChange={(event) => this.handleEmailChange(event.target.value)} placeholder="somebody@somemail.com"
							aria-describedby="basic-addon1"></input>
						<span id='lblEmailInvalid' class={this.state.emailInvalidLabelClass}></span>

					</InputGroup>
					<h5 className="inputLabel panelMargin">Phone</h5>
					<InputGroup>
						<InputGroupAddon >+92</InputGroupAddon>
						<input type="text" className="form-control" name="email" id="txtEmail"
							onChange={(event) => this.handlePhoneNumberChange(event.target.value)} placeholder="9 Digit phone"
							maxLength="9"
							aria-describedby="basic-addon1"></input>
						<span id='lblEmailInvalid' class={this.state.phoneInvalidLabelClass}></span>
					</InputGroup>
					<h5 className="inputLabel panelMargin">Address</h5>
					<InputGroup>
						<InputGroupAddon className="inputGRP glyphicon glyphicon-home"></InputGroupAddon>
						<input type="text" className="form-control" name="email" id="txtEmail"
							onChange={(event) => this.handleAddressChange(event.target.value)} placeholder="House Street City"
							aria-describedby="basic-addon1"></input>
					</InputGroup>
					<h5 className="inputLabel panelMargin">Gender</h5>


					<DropdownButton onSelect={(evtKey, evt) => this.handleGenderSelect(evtKey)} title={this.state.gender}>
						<MenuItem eventKey={0}>Male</MenuItem>
						<MenuItem eventKey={1}>Female</MenuItem>
					</DropdownButton>

					<Button className="btnSubmit" onClick={this.handleSubmit}>Submit</Button>
					<h5 class='lblFormInvalid'>{this.state.formInvalidText}</h5>
				</Panel>
			</div>
		);
	}
}



