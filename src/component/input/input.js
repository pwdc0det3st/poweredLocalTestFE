import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import local_constants from './res';
import { colors } from '../../../config/colors';

export default class Input extends Component {

	constructor(props) {
		super(props);
		this.init();
	}

	init() {
		this._animatedIsFocused = new Animated.Value(0);

		let initState = {
			labelStyle: { ...styles.generalLabelStyle },
			isError: false,
			errorText: null,
			isFocused: false
		};

		this.initlabelAnimatedProps(initState.labelStyle);

		this.state = initState;
		this.state.value = '';
	}

	initlabelAnimatedProps(prop) {
		prop.top = this._animatedIsFocused.interpolate({
			inputRange: [0, 1],
			outputRange: [28, 8],
		});

		prop.fontSize = this._animatedIsFocused.interpolate({
			inputRange: [0, 1],
			outputRange: [19, 13],
		});

		prop.color = this._animatedIsFocused.interpolate({
			inputRange: [0, 1],
			outputRange: [colors.grey, colors.lightBlue],
		});
	}

	componentDidUpdate() {
		this.state.value === '' && Animated.timing(this._animatedIsFocused, {
			toValue: this.state.isFocused ? 1 : 0,
			duration: 200,
		}).start();
	}

	handleFocus = () => {
		let state = this.state;

		state.isFocused = true;

		this.setState(state);
	}

	handleBlur = () => {
		let state = this.state;

		state.isFocused = false;

		this.setState(state);
	}

	handleTextChange = (text) => {
		this.state.value = text;
		this.props.handleTextChange && this.props.handleTextChange(text);
	}

	render = () => {

		const { containerStyle, fieldName, inputType, label, isRequired, isRequiredFlagDisplay, inputStyle, ...props } = this.props;

		const inputStyle = { ...styles.inputStyle, ...inputStyle }
		const nContainerStyle = { ...styles.containerStyle, ...containerStyle }

		return (
			<div style={nContainerStyle}>
				<div>
					<label style={this.state.labelStyle}>
						{label + (isRequiredFlagDisplay === 'true' ? (isRequired === 'true' ? ' (Required)' : ' (optional)') : '')}
						<input type={inputType}
							name={fieldName}
							onchange={this.handleTextChange}
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
							style={inputStyle}
							{...this.props.textInputProps} />
					</label>
				</div>
				{
					this.state.isError &&
					<div>
						<p>{this.state.errorText}</p>
					</div>
				}
			</div>
		)
	}
}

Input.propTypes = {
	textInputStyles: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.number,
		PropTypes.shape({}),
	]),
	label: PropTypes.string.isRequired
}

Input.defaultProps = {
	textInputStyle: styles.inputStyle,
	containerStyle: styles.containerStyle,
	labelStyle: styles.labelStyle,
	isRequired: local_constants.isRequired,
	isRequiredFlagDisplay: local_constants.isRequiredFlagDisplay
}