import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  ScrollView,
} from "react-native";
import Button from "@/components/general/Button";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { userLocations, workshopLocations } from "@assets/data/locations";
import { type locationType, type TowReq } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { imgTypeConstants, type imagesType } from "@/types";
import { getDistance } from "geolib";
import { useReqContext } from "@/providers/ReqProvider";
import PickImgBtn from "@/components/general/PickImgBtn";
import dayjs from "dayjs";
import { FlatGrid } from "react-native-super-grid";
import { Stack } from 'expo-router';

export default function Book() {
  const [imgs, setImgs] = useState<imagesType>({
    left: undefined,
    right: undefined,
    front: undefined,
    rear: undefined,
  });

  const { curLoc, getCurLoc, activeReq, setActiveReq } = useReqContext();

  const [chosenUserLoc, setChosenUserLoc] = useState<locationType | null>(null);
  const [chosenDestLoc, setChosenDestLoc] = useState<locationType | null>(null);

  useEffect(() => {
    getCurLoc();
  }, []);

  const handleImgSubmit = (type: keyof imagesType, uri: string) => {
    setImgs({ ...imgs, [type]: uri });
  };

  const renderUserLoc = (item: locationType) => {
    const dist = curLoc
      ? Math.round(
          getDistance(
            { latitude: item.coord.lat, longitude: item.coord.lng },
            { latitude: curLoc.coord.lat, longitude: curLoc.coord.lng }
          ) / 100
        ) / 10
      : undefined;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.locName}>{item.name}</Text>
        {dist && <Text style={styles.distanceFromUser}>{dist} km</Text>}
      </View>
    );
  };

  const renderWorkshopLoc = (item: locationType) => {
    if (!chosenUserLoc) {
      return null;
    }
    const dist =
      Math.round(
        getDistance(
          { latitude: item.coord.lat, longitude: item.coord.lng },
          { latitude: chosenUserLoc.coord.lat, longitude: chosenUserLoc.coord.lng }
        ) / 100
      ) / 10;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.locName}>{item.name}</Text>
        <Text style={styles.distanceFromUser}>{dist} km</Text>
      </View>
    );
  };

  const setCurrentLoc = () => {
    getCurLoc();
    if (curLoc) {
      setChosenUserLoc({
        name: "Current Location",
        coord: curLoc.coord,
      });
    }
  };

  const submit = () => {
    let hasUndefined = Object.values(imgs).some((img) => img == undefined);
    if (hasUndefined || !chosenUserLoc || !chosenDestLoc) {
      alert("Please fill in all fields");
      return;
    }

    let towReq: TowReq = {
      id: "1",
      userLoc: chosenUserLoc,
      destLoc: chosenDestLoc,
      img: imgs,
      datetime: dayjs(),
      userCar: {
        carVin: "123456789",
        carColor: "Red",
        carYear: "2010",
        carMake: "Toyota",
        carModel: "Vios",
        carPlate: "ABC123",
      },
      status: "pending",
    };

    alert("Form submitted");
    let request = "accepted";
    if (request == "accepted") {
      setActiveReq(towReq);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        <Stack.Screen options={{ title: "Book Tow Request" }} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Book Tow Request</Text>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upload Images</Text>
              <FlatGrid
                itemDimension={140}
                data={imgTypeConstants}
                style={styles.gridView}
                renderItem={({ item, index: idx }) => (
                  <PickImgBtn type={item} key={idx} onPress={handleImgSubmit} />
                )}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pickup Location</Text>
              <View style={styles.locContainer}>
                <Dropdown
                  data={userLocations}
                  renderItem={renderUserLoc}
                  value={chosenUserLoc}
                  onChange={setChosenUserLoc}
                  valueField="coord"
                  labelField="name"
                  placeholder={chosenUserLoc?.name ?? "Select Current Location"}
                  search
                  style={styles.dropdown}
                />
                <Pressable style={styles.locBtn} onPress={setCurrentLoc}>
                  <FontAwesome name="crosshairs" size={24} color="white" />
                </Pressable>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Destination</Text>
              <Dropdown
                data={workshopLocations}
                renderItem={renderWorkshopLoc}
                value={chosenDestLoc}
                onChange={setChosenDestLoc}
                valueField="coord"
                labelField="name"
                placeholder={chosenDestLoc?.name ?? "Select Panel Workshop"}
                search
                style={styles.dropdown}
              />
            </View>

            <Button onPress={submit} style={styles.submitBtn}>
              Submit
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  gridView: {
    marginTop: 10,
  },
  locContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  locBtn: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtn: {
    marginTop: 20,
    backgroundColor: "#007BFF",
  },
});
