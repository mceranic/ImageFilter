import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import { StyleSheet } from 'react-native';
import {AppRegistry, Text, View, Button, FlatList, ScrollView, Image} from 'react-native';
//import styles from '../styles';

export class helpcomponent extends React.Component {
    static navigationOptions = {
		title: 'Način korištenja aplikacije za korisnike',
 	};
	render() {
    	return(
			<ScrollView contentContainerStyle = { styles.container }>
				<View style={styles.zasebniView}>
					<Text style={styles.text}>
						Aplikaciju je moguće koristiti bez posjedovanja (i unošenja) korisničkih podataka.
					</Text>
				</View>
				<View style={styles.header}>
					<Text style = { styles.textH }>
                	    Prikaz informacija o Imagefilter aplikaciji
                	</Text>
				</View>
				<View style={styles.zasebniView}>
					<Text style = { styles.text }>
                	   Na početnom ekranu korisnik može izabrati sliku koju želi urediti.
						{"\n"}{"\n"}
						 Na sliku može primjeniti različite filtere.
						{"\n"}{"\n"}
                		Korisnik sliku može objaviti na društvenim mrežama.
					</Text>
				</View>
				<View style={styles.zasebniView}>
					<Text style = { styles.text }>
                	    Kada korisnik izvrši editovanje slike istu može spasiti na memoriju svog mobilnog uređaja.
					</Text>
				</View>
				<View style={styles.header}>
					<Text style = { styles.textH }>
						Ostale mogućnosti
                	</Text>
				</View>
				<View style={styles.zasebniView}>
					<Text style = { styles.text }>
                	    Korisniku je u svakom trenutku omogućeno share-ovanje slike na društvene mreže.
					</Text>
				</View>
				<Button raised
                    title='Nazad'
                    borderRadius={25}
                    backgroundColor={'#ff6666'}
                    containerViewStyle={{ alignSelf:'center',marginTop: 5, marginBottom: 5}}
                    buttonStyle={{width:325, height: 50}}
                    textStyle={{fontWeight:'bold'}}
                    // icon={{name: 'arrow-right', type: 'font-awesome'}}
                    onPress={() => this.props.navigation.navigate('Home')}/>
            </ScrollView>
    	);
 	}
}

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

export default Project = StackNavigator({
	HelpScreen: {screen: helpcomponent}
    //HelpPage: {screen: korisnik}
});
AppRegistry.registerComponent('helpcomponent', () => helpcomponent);
//AppRegistry.registerComponent('korisnik', () => korisnik)