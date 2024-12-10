import Button from "@/components/general/Button";
import { router } from "expo-router";
import { View } from "react-native";

export default function Index() {
    const showReqList = () => {
       router.push("./requests");
    };
    return (
        <View>
            <Button onPress={showReqList}>Press me</Button>
        </View>
    );
}

