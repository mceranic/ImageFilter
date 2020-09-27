import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Button, 
    Image, 
    TouchableOpacity, 
    Dimensions,
    CameraRoll,
    PixelRatio
} from 'react-native';
import { FileSystem } from 'expo';
import Expo  from 'expo';
import ExpoPixi, { PIXI } from 'expo-pixi';
import { TransparentMenu } from '../Components.js';
const { width, height } = Dimensions.get('window');
const scale = PixelRatio.get();

function filter(filters) {
  const output = new PIXI.filters.ColorMatrixFilter();
  if (Array.isArray(filters)) {
    filters.map(item => {
      if (typeof item === 'string') {
        output[item]();
      } else {
        const { name, props } = item;
        output[name](...props);
      }
    });
  } else {
    return filter([filters]);
  }
  return output;
}

const colorMatrix = [
  { name: 'reset' },
  {
    name: 'brightness',
    tools: [{ type: 'number', min: 0, max: 1, standard: 0.3 }],
  },
  {
    name: 'greyscale',
    tools: [{ type: 'number', min: 0, max: 1, standard: 0.6 }],
  },
  { name: 'blackAndWhite' },
  { name: 'hue', tools: [{ type: 'number', min: 0, max: 360, standard: 180 }] },
  {
    name: 'contrast',
    tools: [{ type: 'number', min: 0, max: 1, standard: 0.8 }],
  },
  {
    name: 'saturate',
    tools: [{ type: 'number', min: 0, max: 1, standard: 0.8 }],
  },
  { name: 'desaturate' },
  { name: 'negative' },
  { name: 'sepia' },
  { name: 'technicolor', tools: [{ type: 'boolean', standard: true }] },
  { name: 'polaroid' },
  { name: 'toBGR' },
  { name: 'kodachrome', tools: [{ type: 'boolean', standard: true }] },
  { name: 'browni', tools: [{ type: 'boolean', standard: true }] },
  { name: 'vintage', tools: [{ type: 'boolean', standard: true }] },
  {
    name: 'colorTone',
    tools: [
      { type: 'number', min: 0, max: 1, standard: 0.5 },
      { type: 'number', min: 0, max: 1, standard: 0.5 },
      { type: 'color', standard: 0xff0000 },
      { type: 'color', standard: 0x000011 },
    ],
  },
  { name: 'night', tools: [{ type: 'number', min: 0, max: 1, standard: 0.5 }] },
  {
    name: 'predator',
    tools: [{ type: 'number', min: 0, max: 1, standard: 0.5 }],
  },
  { name: 'lsd' },
].map(({ name, tools }) => {
  return filter({
    name: name,
    props: (tools || []).map(tool => tool.standard),
  });
});

const filters = [
  new PIXI.filters.ColorReplaceFilter(0x000000, 0xff0000),
  new PIXI.filters.DotFilter(0.5),
  new PIXI.filters.EmbossFilter(),
  new PIXI.filters.PixelateFilter(),
  new PIXI.filters.CrossHatchFilter(),
  new PIXI.filters.NoiseFilter(),
  new PIXI.filters.OldFilmFilter(),
  new PIXI.filters.RGBSplitFilter(),

  new PIXI.filters.GlowFilter(30, 2, 0.5, 0xff0000),
  new PIXI.filters.BulgePinchFilter([0.5, 0.2], 300, 1),
  new PIXI.filters.MotionBlurFilter([54, 40], 15, 0),
  new PIXI.filters.DropShadowFilter(),
  new PIXI.filters.RadialBlurFilter(45, [width * scale / 2, height * scale / 2], 8, width),
  new PIXI.filters.AdvancedBloomFilter(),
  new PIXI.filters.BlurFilter(),
  new PIXI.filters.TwistFilter(400, 4, 20),
  new PIXI.filters.BloomFilter(),
  new PIXI.filters.OutlineFilter(20, 0x00fc00, 1),
  new PIXI.filters.ZoomBlurFilter(),

  // new PIXI.filters.AlphaFilter(),
  // new PIXI.filters.AsciiFilter(),
  // new PIXI.filters.ConvolutionFilter(),
  // new PIXI.filters.DisplacementFilter(),
  // new PIXI.filters.TiltShiftFilter(),
  // new PIXI.filters.GodrayFilter(),
  // new PIXI.filters.SimpleLightmapFilter(),
  // new PIXI.filters.MultiColorReplaceFilter(),
  // new PIXI.filters.ShockwaveFilter(),

  ...colorMatrix,
];
export default class EditScreen extends React.Component {
    state = {
    index: 0,
    };
    onConfirm = async () => {
        const { status } = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);
        if(status === 'granted'){
            CameraRoll.saveToCameraRoll(this.props.navigation.getParam('uri')).then(function(result) {
                console.log('save succeeded ' + result);
                alert(result);
                }).catch(function(error) {
                console.log('save failed ' + error);
                alert(error);
                });
                console.log('FINISHED');
            }
         //await FileSystem.copyAsync({
         //    from: this.props.navigation.getParam('uri'),
         //    to: FileSystem.documentDirectory + 'image.jpg'
        //}).catch(function(er){ console.log(er); });
        /**
         * OVDJE TREBA SPASAVATI SLIKU
         */

        this.props.navigation.navigate('Share', {
            'uri': this.props.navigation.getParam('uri'),
            'base64': this.props.navigation.getParam('base64')
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <ExpoPixi.FilterImage 
                      source={require('./images/lion.png')} 
                      resizeMode={'cover'}
                      style={styles.image}
                      filters={filters[this.state.index]}/>
                </View>
                <View style={styles.menuContainer}>
                    <View style={styles.upperMenu}>
                        <TransparentMenu style={styles.tMenu}></TransparentMenu>
                        <TransparentMenu style={styles.tMenu}></TransparentMenu>
                    </View>
                    <View style={styles.lowerMenu}>
                        <Button title='Undo' onPress={() => this.props.navigation.navigate('Home')} />
                        <Button title='Save' onPress={this.onConfirm}/>
                    </View>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    tMenu: {
        flex: 1,
        position: 'absolute',
        overflow: 'visible',
    },
    upperMenu: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 2,
    },
    lowerMenu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 2,
    },
    imageContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    menuContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignContent: 'space-around',
    },
    container: {
        marginTop: 24,
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    touchable: {
    flex: 1,
    backgroundColor: 'green',
  },
    image: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
});