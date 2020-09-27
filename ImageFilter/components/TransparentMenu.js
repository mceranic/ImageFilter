import React from 'react';
import { 
    View, 
    TouchableOpacity, 
    Text,
    StyleSheet
} from 'react-native';
import Overlay from 'react-native-modal-overlay';

export default class TransparentMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            menuOpen: false,
            dimensions: undefined,
        };
    }

    onPress = () => {
        if (!this.state.dimensions) {
            this.mainButton.measureInWindow( (px, py, w, h) => {
                this.setState(previousState => {
                    return {
                        menuOpen: !previousState.menuOpen,
                        dimensions: {
                            x: px,
                            y: py,
                            width: w,
                            height: h,
                        }
                    }
                });
            });
        } else {
            this.setState(previousState => {
                return {
                    menuOpen: !previousState.menuOpen,
                    dimensions: previousState.dimensions,
                }
            });
        }        
    }

    cStyles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignContent: 'stretch',
            alignSelf: 'stretch',
            width: '50%',
        },
        touchable: {
            height: 100,
            width: '100%',
            borderColor: 'white',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        overlayContainer: {
            backgroundColor: 'rgba(0,0,0,0.1)',
        },
        overlayChildrenWrapper: {
            backgroundColor: 'rgba(0,0,0,0.2)',
            position: 'absolute',
            padding: 0,
        }
    });

    render() {
        return (
            <View style={this.cStyles.container}>             
                <TouchableOpacity ref={view => { this.mainButton = view }} onPress={this.onPress} style={this.cStyles.touchable}>
                    <Text>Filters</Text>
                </TouchableOpacity>
                {this.state.dimensions &&
                <Overlay visible={this.state.menuOpen}
                    closeOnTouchOutside={true}
                    animationType='flipInX'
                    containerStyle={this.cStyles.overlayContainer}
                    childrenWrapperStyle={[
                        this.cStyles.overlayChildrenWrapper,
                        {
                            left: this.state.dimensions.x,
                            bottom: this.state.dimensions.height * 1.5,
                            width: this.state.dimensions.width,
                        }
                    ]}
                >
                    <TouchableOpacity onPress={this.onPress} style={this.cStyles.touchable}>
                        <Text>Button3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPress} style={this.cStyles.touchable}>
                        <Text>Button2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPress} style={this.cStyles.touchable}>
                        <Text>Button1</Text>
                    </TouchableOpacity>
                </Overlay>
                }
            </View>
        );
    }
};