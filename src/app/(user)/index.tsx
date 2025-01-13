import ProfileHeader from "@/components/header/ProfileHeader";
import AnnHeader from "@/components/header/AnnHeader";
import { Stack } from "expo-router";
import { View, Text } from "react-native";
import {LinkButton} from '@/components/general/LinkButton';
import Button from '@/components/general/Button';
import { useAuth } from '@/providers/AuthProvider';

export default function Index() {
    const {signOut} = useAuth();
    
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
            
            
            <LinkButton href='/book'>Book a truck</LinkButton>
            <LinkButton href='/request'>Active request</LinkButton>
            <LinkButton href='/request'>Past request</LinkButton>
            <Button onPress={signOut}>Sign out</Button>
        </View>
    );
}

