import { StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';

export default StyleSheet.create({
	containerStyle: {
		justifyContent: 'center',
        alignItems: 'center',
	},
	generalLabelStyle: {
		position: 'absolute',
		left: 15,
	},
	focusedLabelStyle: {
		top: 0,
		fontSize: 12,
		color: colors.blue,
	},
	unfocusedLabelStyle: {
		top: 15,
		fontSize: 16,
		color: colors.grey,
	},
	textInputStyle: {
		fontSize: 19,
		paddingTop: 15,
		paddingBottom: 2,
		borderBottomWidth: 1,
		borderBottomColor: colors.lightBlue
	}

})