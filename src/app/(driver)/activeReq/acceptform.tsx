import { type imagesType, imgTypeConstants } from "@/types";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import PickImgBtn from "@/components/general/PickImgBtn";
import Button from "@/components/general/Button";


export default function AcceptForm() { //get the current time
    const [imgs, setImgs] = useState<imagesType>({
        left: undefined,
        right: undefined,
        front: undefined,
        rear: undefined,
    });

    const handleImgSubmit = (type: keyof imagesType, uri: string) => {   
        setImgs({
          ...imgs,
          [type]: uri,
        });  
    };

    const handleFormSubmit = () => {
        //send timestamps, driverid, reqid, imgs to backend
    };


    return (
        <View style={styles.container}>
            {imgTypeConstants.map((type, idx) => (
                  <PickImgBtn type={type} key={idx} onPress={handleImgSubmit} />
            ))}
            <Button onPress={handleFormSubmit}>Next</Button>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
});