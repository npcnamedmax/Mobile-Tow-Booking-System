import { useAuth } from '@/providers/AuthProvider';
import {Stack} from 'expo-router';
import {Redirect} from 'expo-router';




export default function AuthStack() {
    const {session} = useAuth();
    if(session) {
        return <Redirect href={'/'} />
    }
    return (
    <Stack>
        <Stack.Screen name="signin" options={{
            title: "Log in",
        }} />
        <Stack.Screen name="signup" options={{
            title: "Sign Up",
        }}/>
    </Stack>
    );
}