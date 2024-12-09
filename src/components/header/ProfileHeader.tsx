import Colors from "@/constants/Colors";
import {FontAwesome} from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { useSegments } from "expo-router";

export default function ProfileHeader() {
    const segments = useSegments();
    console.log(segments);
    return (
        <Pressable
            onPressOut={() => {router.push('/ann')}}
        >
            {({pressed}) => (
                <FontAwesome
                    name="user"
                    size={25}
                    color={Colors.light.tint}
                    style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}
                />
            )}
            
        </Pressable>
    )
}