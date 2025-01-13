import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from '@/components/general/Button';
import {Pressable, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';

import { Dropdown } from 'react-native-element-dropdown';
import { userLocations, workshopLocations } from '@assets/data/locations';
import { type locationType, type TowReq } from '@/types';
import { FontAwesome } from '@expo/vector-icons';
import { imgTypeConstants, type imagesType } from '@/types';
import { getDistance } from 'geolib';
import { useReqContext } from '@/providers/ReqProvider';
import PickImgBtn from '@/components/general/PickImgBtn';
import dayjs from 'dayjs';
import { FlatGrid } from 'react-native-super-grid';
 

export default function Book() {

  const [imgs, setImgs] = useState<imagesType>({ //initialise
    left: undefined,
    right: undefined,
    front: undefined,
    rear: undefined,
  });
  
  const { curLoc, getCurLoc, activeReq, setActiveReq } = useReqContext(); //user loc state based on gps

  const [chosenUserLoc, setChosenUserLoc] = useState<locationType | null>(null); //chosen user loc 
  const [chosenDestLoc, setChosenDestLoc] = useState<locationType | null>(null); //chosen dest loc 
  

  useEffect(() => { //as kfor loc perm when this page entered
    getCurLoc();
  }, []);

    const handleImgSubmit = (type: keyof imagesType, uri: string) => {   
        setImgs({
          ...imgs,
          [type]: uri,
        });  
    };

    const renderUserLoc = (item : locationType) => {
      const dist = curLoc ? Math.round(getDistance( //calc dist bet chosen loc and user loc (straight line distance)
        {latitude: item.coord.lat, longitude: item.coord.lng}, 
        {latitude: curLoc.coord.lat, longitude: curLoc.coord.lng}) / 100) / 10
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


    const setCurrentLoc = () => { //sets chosen loc as user's loc
      getCurLoc();
      if(curLoc) {
        setChosenUserLoc({
          name: 'Current Location',
          coord: curLoc.coord,
        });
      }
    };

    const submit = () => { //async to wait for request to be accepted/rejected to set activeTowReq
      //check if all are valid
      let hasUndefined = Object.values(imgs).some(img => img == undefined);
      if(hasUndefined || !chosenUserLoc || !chosenDestLoc) {
        alert("Please fill in all fields");
        return;
      }

      //SIMULATE PAYMENT IF APPLICABLE
      //if payment required, show payment modal, generate draft invoice and allow use to pay if applicable

      let towReq : TowReq = { //id will be generated at server, so only submit img, policyNum, userID, locations
        id: '1',
        userLoc: chosenUserLoc,
        destLoc: chosenDestLoc,
        img: imgs,
        datetime: dayjs(),
        userCar: {
          carVin: '123456789',
          carColor: 'Red',
          carYear: '2010',
          carMake: 'Toyota',
          carModel: 'Vios',
          carPlate: 'ABC123',
        },
        status: 'pending',
      };

      //send req and go back to requests.tsx
      alert("Form submitted");
      let request = "accepted";
      if(request == 'accepted') {
        setActiveReq(towReq); 
      }
    };

    return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
              <Text style={styles.title}>Form</Text>
              <View style={styles.imgCon}>
                <Text style={styles.imgConTitle}>Upload Images</Text>
                <FlatGrid
                  itemDimension={140}
                  data={imgTypeConstants}
                  style={styles.gridView}
                  renderItem={({item, index: idx}) => {
                    return (
                      <PickImgBtn type={item} key={idx} onPress={handleImgSubmit} />
                    )
                  }}
                  />
              </View>

              <Dropdown //TO CHOOSE WHICH CAR TO BOOK FOR
                data={workshopLocations}
                renderItem={renderWorkshopLoc}
                value={chosenDestLoc}
                onChange={setChosenDestLoc}
                valueField="coord"
                labelField="name"
                placeholder={chosenDestLoc?.name ?? 'Select Panel Workshop'}
                search
                disable = {chosenUserLoc == null}
                style={styles.dropdownDest}
                />
        
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
                data={workshopLocations}
                renderItem={renderWorkshopLoc}
                value={chosenDestLoc}
                onChange={setChosenDestLoc}
                valueField="coord"
                labelField="name"
                placeholder={chosenDestLoc?.name ?? 'Select Panel Workshop'}
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
  container: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
    backgroundColor: 'gray',
    gap: 10,
  },
  itemContainer: {
    flexDirection: 'column',
    padding: 17,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgCon: {
    padding: 15,
    gap: 10,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  gridView: {
    flex: 1,
    width: '100%',
    

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
  
