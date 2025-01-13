import RequestDetail from "@/components/req/RequestDetail";
import { useReqContext } from "@/providers/ReqProvider";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Button from '@/components/general/Button';

export default function Requests() {
    const { activeReq } = useReqContext();
    if(!activeReq) {
        return (<Text>No active request</Text>);
    }
    console.log(activeReq);
    return (
        <ScrollView>
            <View style={styles.container}>
                <RequestDetail req={activeReq} />
                <View style={styles.btnContainer}>
                    <Button>Track Driver</Button>
                    <Button>Call Driver</Button>
                    <Button pressableStyle={{backgroundColor: 'red'}}>Cancel</Button>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10,
    },
    btnContainer: {
        flexDirection: 'column',
        gap: 10,
    }
});