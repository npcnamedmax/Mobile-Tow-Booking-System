import { useReqContext } from "@/providers/ReqProvider";
import { Text, StyleSheet, View, ScrollView, Linking } from "react-native";
import RequestDetail from "@/components/req/RequestDetail";
import Button from "@/components/general/Button";
import { Link, useSegments } from "expo-router";
import { LinkButton } from "@/components/general/LinkButton";

export default function Index() {
    const { activeReq } = useReqContext();
    const segments = useSegments();
    if(!activeReq) return ( //checks if thrs an active req
        <Text>No active request</Text>
    );

    const handleMsg = () => {
        //start messaging function
    };

    const handleArrived = () => {
        //handle arrived
    };

    const handleMapLaunch = () => {
        //launch map
        Linking.openURL(`google.navigation:q=${activeReq.destLoc.coord.lat},${activeReq.destLoc.coord.lng}`);
    };

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
                <RequestDetail req={activeReq} />
                <View style={styles.buttons}>
                    <Button onPress={handleMsg}>Message User</Button>
                    <Button onPress={handleMapLaunch}>Show on map</Button>
                    <LinkButton href={`/${segments[0]}/activeReq/acceptform`} asChild>Arrived</LinkButton>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        padding: 10,
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
})