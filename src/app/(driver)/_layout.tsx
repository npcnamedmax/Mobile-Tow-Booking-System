import { Stack } from "expo-router";


export default function UserStack() {
    return (
        <Stack>
            <Stack.Screen name="index" options={ {headerShown: false,} }/>
            <Stack.Screen name="requests" options={ {headerShown: false,} }/>
        </Stack>
    );
}