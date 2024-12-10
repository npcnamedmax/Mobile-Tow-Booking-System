import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
  import Button from '@/components/general/Button';
  import {Pressable, ScrollView} from 'react-native';
  import {useEffect, useState} from 'react';
  import * as ImagePicker from 'expo-image-picker';
  import { Dropdown } from 'react-native-element-dropdown';
  import { userLocations, workshopLocations } from '@assets/data/locations';
  import { type locationType } from '@/types';
import { FontAwesome } from '@expo/vector-icons';
import { imgTypeConstants, type imagesType, type locCoord } from '@/types';
import { getDistance } from 'geolib';
import * as Location from 'expo-location';


export default function Book() {
  const [imgs, setImgs] = useState<imagesType>({ //initialise
    left: undefined,
    right: undefined,
    front: undefined,
    rear: undefined,
  });
  const [locPerm, setLocPerm] = useState<boolean>(false); //loc permission state
  const [chosenUserLoc, setChosenUserLoc] = useState<locationType | null>(null); //chosen user loc 
  const [userLoc, setuserLoc] = useState<locationType | null>(null); //user loc state based on gps
  const [chosenDestLoc, setChosenDestLoc] = useState<locationType | null>(null); //chosen dest loc

  useEffect(() => { //as kfor loc perm when this page entered
    getLocPerm();
  }, []);

    const pickImg = async (type: keyof imagesType) => {
        let imgRes = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            quality: 1,
            aspect: [16,9],
        });
        if(!imgRes.canceled) {
          setImgs({
            ...imgs,
            [type]: imgRes.assets[0].uri,
          });
        }
    };
    const getLocPerm = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync(); //get permission
      if(status == 'granted') {
        
        setLocPerm(true);
        return;
      }
      alert('Permission to access location was denied');
    };

    const renderUserLoc = (item : locationType) => {
      const dist = locPerm && userLoc ? Math.round(getDistance( //calc dist bet chosen loc and user loc (straight line distance)
        {latitude: item.coord.lat, longitude: item.coord.lng}, 
        {latitude: userLoc.coord.lat, longitude: userLoc.coord.lng}) / 100) / 10
        : undefined;
      return ( //only show distance if userLoc is not null
        <View style={styles.itemContainer}>
          <Text style={styles.locName}>{item.name}</Text>
          {dist &&
          <Text style={styles.distanceFromUser}>{dist} km</Text>
          }
        </View>
      );
    };

    const renderWorkshopLoc = (item : locationType) => {
      if(!chosenUserLoc) { //makes sure user has chosen pickup loc
        return null;
      }
      const dist = Math.round(getDistance( //calc dist bet chosen loc and user loc (straight line distance)
        {latitude: item.coord.lat, longitude: item.coord.lng}, 
        {latitude: chosenUserLoc.coord.lat, longitude: chosenUserLoc.coord.lng}) / 100) / 10;

        return (
          <View style={styles.itemContainer}>
            <Text style={styles.locName}>{item.name}</Text>
            <Text style={styles.distanceFromUser}>{dist} km</Text>
          </View>
        );
    };

    const getUserLoc = async () => { 
      try {
        getLocPerm();
        if(locPerm == false) { //unable to get loc perm
          return;
        }

        const location = await Location.getCurrentPositionAsync({}); //get current loc
        setuserLoc({
          name: 'Current Location',
          coord: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          
          }
        });
        console.log("Clicke");
      } catch (error) {
        console.log(error);
      }
      
    };

    const setCurrentLoc = () => { //sets chosen loc as user's loc
      getUserLoc();
      if(userLoc) {
        setChosenUserLoc({
          name: 'Current Location',
          coord: userLoc.coord,
        });
      }
    }

    const submit = () => {
      //check if all are valid
      let hasUndefined = Object.values(imgs).some(img => img == undefined);
      if(hasUndefined || !chosenUserLoc || !chosenDestLoc) {
        alert("Please fill in all fields");
        return;
      }

      //send req
      alert("Form submitted");
    };

    return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
              <Text style={styles.title}>Form</Text>
              <View style={styles.imgCon}>
                <Text style={styles.imgConTitle}>Upload Images</Text>
                {imgTypeConstants.map((type, idx) => (
                  <Button key={idx} onPress={() => pickImg(type as keyof imagesType)}>
                    Upload {type} image
                  </Button>
                ))}
              </View>
        
              <View style={styles.locContainer}>
                <Dropdown //bad design ,shud separate into its own comp and use context
                  data={userLocations}
                  renderItem={renderUserLoc}
                  value={chosenUserLoc}
                  onChange={setChosenUserLoc}
                  valueField="coord"
                  labelField="name"
                  placeholder={chosenUserLoc?.name ?? 'Select Current Location'}
                  search
                  style={styles.dropdownUser}
                  />
                  <Pressable style={styles.locBtn} onPress={setCurrentLoc}>
                    <FontAwesome style={{textAlign: 'center'}} name="crosshairs" size={24} color="black" />
                  </Pressable>
              </View>
              <Dropdown //bad design ,shud separate into its own comp and use context
                data={userLocations}
                renderItem={renderWorkshopLoc}
                value={chosenDestLoc}
                onChange={setChosenDestLoc}
                valueField="coord"
                labelField="name"
                placeholder={chosenUserLoc?.name ?? 'Select Panel Workshop'}
                search
                disable = {chosenUserLoc == null}
                style={styles.dropdownDest}
                />
                <Button onPress={submit}>Submit</Button>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
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
  dropdownUser: {
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
  },
  dropdownDest : {
    width: '100%',
    backgroundColor: 'white',
    elevation: 0,
    height: 50, //bad design
    borderRadius: 12, //bad design
    },
});
  
