import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ImagePicker } from 'expo';

export default class HomeScreen extends React.Component {
    chooseImage = async () => {
        let imagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true
        });

        if (imagePickerResult.cancelled)
            return; // korisnik cancellao biranje slike

        let { uri, base64, width, height } = imagePickerResult;

        this.props.navigation.navigate('Edit', {
            'uri': uri,
            'base64': base64, // base64 saljemo bez data:image/jpeg;base64,
            'width': width,
            'height': height,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Home</Text>
                <Button 
                    title="Choose an image"
                    onPress={this.chooseImage}/>
                <Button raised
                    title='Help'
                    borderRadius={25}
                    backgroundColor={'#ff6666'}
                    containerViewStyle={{ alignSelf:'left',marginTop: 5, marginBottom: 5}}
                    buttonStyle={{width:325, height: 50}}
                    textStyle={{fontWeight:'bold'}}
                    // icon={{name: 'arrow-right', type: 'font-awesome'}}
                    onPress={() => this.props.navigation.navigate('Help')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});