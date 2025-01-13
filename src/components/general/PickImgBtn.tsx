import { type imagesType } from "@/types";
import * as ImagePicker  from "expo-image-picker";
import Button from "@/components/general/Button";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useState } from "react";
import React from "react";

type props = {
    key: number;
    type: keyof imagesType;
    onPress: (type: keyof imagesType, uri: string) => void;
};

export default function PickImgBtn({type, onPress, key}: props) {
    const [pickedImg, setPickedImg] = useState<string | undefined>(undefined);

    const pickImg = async (type: keyof imagesType) => {
        let imgRes = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            quality: 1,
            aspect: [16,9],
        });
        if(!imgRes.canceled) {
            setPickedImg(imgRes.assets[0].uri);
          onPress(type, imgRes.assets[0].uri);
        }
    };

    const handleImgRemove = () => {
        setPickedImg(undefined);
        onPress(type, ''); //chg ltr
    };

    return (
        <Pressable key={key} onPress={() => pickImg(type)} style={styles.container}>
            { pickedImg ? 
            <>
                <Pressable onPress={handleImgRemove} style={styles.removeBtn}><Text adjustsFontSizeToFit style={styles.removeTxt}>Remove</Text></Pressable>
                <Image source={{uri: pickedImg}} style={styles.img} />
            </> :
            <Text adjustsFontSizeToFit style={styles.text}>{type} photo</Text> 
            }
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 10,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: 'black',
        aspectRatio: 1/1,
    },
    text: {
        color: 'black',
    },
    removeBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'black',
        width: '35%',
        height: '15%',
        zIndex: 2,
        color: 'white',
        opacity: 0.5,
        borderRadius: 10,
    },
    removeTxt: {
        color: 'white',
        
        textAlign: 'center',
        margin: 'auto',
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    }
});