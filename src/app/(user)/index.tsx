import ProfileHeader from "@/components/header/ProfileHeader";
import AnnHeader from "@/components/header/AnnHeader";
import { router, Stack } from "expo-router";
import { View, Text } from "react-native";
import Button from "@/components/general/Button";
import * as ImagePicker from 'expo-image-picker';


export default function Index() {
    const opensForm = () => {
        router.push("./book");
    }
    
    return (
        <View style={{flex: 1}}>          
                <Stack.Screen options={
                    {
                        headerRight: () => (
                            <View style={{flexDirection: "row",}}>
                                <ProfileHeader />
                                <AnnHeader />
                            </View>
                        ),
                        headerShown: true
                    }
                } />
            
            
            <Button onPress={opensForm}>Hi</Button>
        </View>
    );
}

