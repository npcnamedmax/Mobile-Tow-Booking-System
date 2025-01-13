import { Stack } from "expo-router";
import ReqProvider from "@/providers/ReqProvider";


export default function UserStack() {
    return (
        <Stack>
            <Stack.Screen name="acceptform" options={ {presentation: 'modal',} }/>
            <Stack.Screen name="index" options={ {headerShown: false,} }/>
        </Stack>
        
    );
}