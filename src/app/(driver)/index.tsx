import Button from "@/components/general/Button";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
    return (
        <View>
            <Link href={'./requests'} asChild>
                <Button>Requests</Button>
            </Link>
            <Link href={'./activeReq'} asChild>
                <Button>Accepted Request</Button>
            </Link>
        </View>
    );
}

