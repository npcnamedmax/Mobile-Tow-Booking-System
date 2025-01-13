import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator, ScrollView, Linking } from 'react-native';
import { requests } from '@assets/data/requests';
import Button from '@/components/general/Button';
import { useReqContext } from '@/providers/ReqProvider';
import RequestDetail from '@/components/req/RequestDetail';

export default function TowReqDetail() {    
    const id = useLocalSearchParams().id;
    const req = requests.find((req) => req.id === id);
    const {activeReq, setActiveReq} = useReqContext();
    if (!req) {
        return (
            <View style={styles.centered}>
                <Text>Request not found</Text>
            </View>
        );
    }

    

    const handleStartNav = () => {
        const url = `google.navigation:q=${req.destLoc.coord.lat},${req.destLoc.coord.lng}`;
        Linking.openURL(url).catch(err => console.error('Error opening navigation:', err));
    };

    const handleAccept = () => {
        //handle request, if it is accepted, set activereq to true
        //send timestamp to server
        console.log('Request accepted');
        setActiveReq(req); 
    }

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
                <RequestDetail req={req} />
                    <View style={styles.buttons}>
                        <Button onPress={handleStartNav}>Start Navigation</Button>
                        <Button onPress={handleAccept} disabled={activeReq!=null}>Accept</Button>
                    </View>
                </View>
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        padding: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    buttons: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

