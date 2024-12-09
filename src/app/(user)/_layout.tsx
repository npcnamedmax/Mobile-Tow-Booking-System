import { Stack } from "expo-router";


export default function UserStack() {
    return (
        <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="book" />
            
        </Stack>
    );
}