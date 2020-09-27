import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center', 
		margin: 20,
		borderWidth: 0,
		padding: 5
	},
	button: {
		padding: 10,
		alignItems: 'stretch'
	},
	text : {
		fontSize: 18,
		textAlign: 'left',
		padding : 10
	},
	textH : {
		fontSize: 18,
		textAlign: 'left',
		padding : 10,
		fontWeight : 'bold'
	},
	header : {
		backgroundColor: 'grey',
		padding: 5,
		margin: 0
	},
	zasebniView : {
		backgroundColor: 'white',
		padding: 5
	},
	images : {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image : {
		width: 50,
		height: 50
	},
	textB : {
		fontSize: 18,
		textAlign: 'left',
		padding : 10,
		fontWeight : 'bold'
	}
});

export default styles;