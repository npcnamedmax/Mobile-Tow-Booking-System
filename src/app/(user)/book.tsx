import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
  import Button from '@/components/general/Button';
  import {Pressable} from 'react-native';
  import {useState} from 'react';
  import * as ImagePicker from 'expo-image-picker';
  import { Dropdown } from 'react-native-element-dropdown';
  import { locations } from '@assets/data/locations';
  import { type locationType } from '@/types';
import { FontAwesome } from '@expo/vector-icons';

type imgType = string|undefined;

type imagesType = {
  left: imgType,
  right: imgType,
  front: imgType,
  rear: imgType,
};

const imgTypeConstants = ['left', 'right', 'front', 'rear'];

export default function Book() {
  const [imgs, setImgs] = useState<imagesType>({ //initialise
    left: undefined,
    right: undefined,
    front: undefined,
    rear: undefined,
  });
  const [loc, setLoc] = useState<locationType | null>(null);

    const pickImg = async (type: keyof imagesType) => {
      console.log(type);
        let imgRes = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            quality: 1,
        });
        if(!imgRes.canceled) {
          setImgs({
            ...imgs,
            [type]: imgRes.assets[0].uri,
          });
        }
    };
    const renderItem = (item : locationType) => {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.locName}>{item.name}</Text>
          <Text style={styles.distanceFromUser}>{item.distanceFromUser}</Text>
        </View>
      );
    };
    const currentLoc = () => { //WILL BE CHANGED
      const curLoc : locationType = { //get permission first
        id: 0,
        name: 'Current Location',
        distanceFromUser: 0,
      } ;
      setLoc(curLoc);
      console.log("Clicke");
    };

    const submit = () => {
      //check if all are valid
      let hasUndefined = Object.values(imgs).some(img => img == undefined);
      if(hasUndefined || !loc) {
        alert("Please fill in all fields");
        return;
      }

      //send req
      alert("Form submitted");
    };

    return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}> 
            <Text style={styles.title}>Form</Text>
            <View style={styles.imgCon}>
              <Text style={styles.imgConTitle}>Upload Images</Text>
              {imgTypeConstants.map((type) => (
                <Button onPress={() => pickImg(type as keyof imagesType)}>
                  Upload {type} image
                </Button>
              ))}
            </View>
             
            <View style={styles.locContainer}>
              <Dropdown //bad design ,shud separate into its own comp and use context
                data={locations}
                renderItem={renderItem}
                value={loc}
                onChange={setLoc}
                valueField="id"
                labelField="name"
                placeholder={loc?.name ?? 'Select Location'}
                search
                style={styles.dropdown}
                />
                <Pressable style={styles.locBtn} onPress={currentLoc}>
                  <FontAwesome style={{textAlign: 'center'}} name="crosshairs" size={24} color="black" />
                </Pressable>


            </View>
                <Button onPress={submit}>Submit</Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    padding: 17,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgCon: {
    padding: 15,
    flexDirection: 'column',
    gap: 10,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  imgConTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  locName: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 16,
  },
  distanceFromUser: {
    color: 'gray',
    flex: 1,
    fontSize: 12,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
    backgroundColor: 'gray',
  },
  title: {
    fontSize: 24,
  },
  locContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 16,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12, //bad design
  },
  dropdown: {
    width: '80%',
    backgroundColor: 'white',
    elevation: 0,
    height: '100%',
    borderRadius: 12,//bad design
  },
  locBtn: {
    width: '20%',
    borderRadius: 12,//bad design
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
  
