import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator, ScrollView, Linking } from 'react-native';
import ImageView from "react-native-image-viewing";
import { useState, useEffect } from 'react';
import RequestField from '@/components/req/RequestField';
import { getDistance } from 'geolib';
import { useReqContext } from '@/providers/ReqProvider';
import { type TowReq } from '@/types';

type props = {
    req: TowReq;
}

export default function RequestDetail({ req }: props) {
    const [visible, setIsVisible] = useState<boolean>(false);
    const [selectedImgIdx, setSelectedImgIdx] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const { curLoc, getCurLoc } = useReqContext();
    
    useEffect(() => {
        getCurLoc();
    }, []);

    const images = Object.entries(req.img).map(([key, value]) => ({ uri: value }));
    let tmpIdx = selectedImgIdx;
    
    const towdist = Math.round(getDistance( 
                    { latitude: req.userLoc.coord.lat, longitude: req.userLoc.coord.lng }, 
                    { latitude: req.destLoc.coord.lat, longitude: req.destLoc.coord.lng }) / 100) / 10;

    const pickupDist = curLoc ? Math.round(getDistance( 
                    { latitude: req.userLoc.coord.lat, longitude: req.userLoc.coord.lng }, 
                    { latitude: curLoc.coord.lat, longitude: curLoc.coord.lng }) / 100) / 10
                    : undefined;
    return (
            <View style={styles.container}>
                <ImageView
                    images={images}
                    imageIndex={selectedImgIdx}
                    visible={visible}
                    onRequestClose={() => {
                        setIsVisible(false);
                        setSelectedImgIdx(tmpIdx);
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
                <View style={styles.details}>
                    <RequestField label="DateTime" value={req.datetime.format('YYYY-MM-DD HH:mm A')} />
                    <View style={styles.trip}>
                        <Text style={styles.locationText}>{req.userLoc.name} → {req.destLoc.name}</Text>
                        {curLoc && <Text style={styles.pickupDist}>Towing Distance: {pickupDist} km</Text>}
                    </View>
                    <RequestField label="Towing Distance" value={`${towdist} km`} />
                    <RequestField label="Car" value={`${req.userCar.carMake} ${req.userCar.carModel} (${req.userCar.carPlate})`} />
                </View>
            </View>
        
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 4,
        width: '100%',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
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
    details: {
        flex: 6,
        marginTop: 10,
        gap: 10,
    },
    trip: {
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'grey',
    },
    locationText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    pickupDist: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
});