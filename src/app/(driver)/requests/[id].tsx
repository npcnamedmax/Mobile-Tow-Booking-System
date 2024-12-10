//add a button here to start nav, use Linking,openURL(google.navigation:q=37.484847,-122.148386)
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { requests } from '@assets/data/requests';
import ImageView from "react-native-image-viewing";
import { useState } from 'react';
import Button from '@/components/general/Button';
import RequestField from '@/components/req/RequestField';
import { getDistance } from 'geolib';


export default function TowReqDetail() {    
    const id = useLocalSearchParams().id;
    const req = requests.find((req) => req.id === id);
    if(!req) {
        return (
            <View>
                <Text>Request not found</Text>
            </View>
        );
    };
    const [visible, setIsVisible] = useState<boolean>(false);
    const [selectedImgIdx, setSelectedImgIdx] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const images = Object.entries(req.img).map(([key, value]) => ({ uri: value }));
    let tmpIdx = selectedImgIdx; //for image index change, (will be assigned to selectedImgIdx on image view close, if not it will keep rerendering if call setSelectedImgIdx directly in onImageIndexChange)
    
    const distFromDriver = () => 
        Math.round(getDistance( //calc dist bet chosen loc and user loc (straight line distance)
        {latitude: req.userLoc.coord.lat, longitude: req.userLoc.coord.lng}, 
        {latitude: userLoc.coord.lat, longitude: userLoc.coord.lng}) / 100) / 10
    

    return (
        <ScrollView style={styles.container}>
            <ImageView
                images={images}
                imageIndex={selectedImgIdx}
                visible={visible}
                onRequestClose={() => {
                    setIsVisible(false)
                    setSelectedImgIdx(tmpIdx)
                }}
                swipeToCloseEnabled={false}
                onImageIndexChange={(idx) => tmpIdx = idx}
            />
            <Pressable
                onPress={() => setIsVisible(true)}
                style={styles.imageContainer}
            >
                {loading && (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="black" />
                    </View>
                )}
                <Image
                    source={{ uri: images[selectedImgIdx].uri }}
                    style={styles.image}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    resizeMode='contain'
                />
            </Pressable>
            <View style={styles.lowerInnerCon}>
                <RequestField label={'DateTime'} value={req.datetime.format('YYYY-MM-DD HH:mm')} /> 
                <RequestField label={'User Location'} value={req.userLoc.name} /> 
                <Button>Accept</Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
    },
    imageContainer: {
        flex: 3,
        width: '100%',
        borderWidth: 2,
        borderColor: 'blue',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    loader: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    lowerInnerCon: {
        flex: 7,
    }
});
