import { Stack, Redirect } from "expo-router";
import ReqProvider from "@/providers/ReqProvider";
import { useAuth } from "@/providers/AuthProvider";

export default function UserStack() {
    const { session } = useAuth();
        if(!session) {
            return <Redirect href={'/'} />;
        }
    return (
       <ReqProvider>
        <Stack>
            <Stack.Screen name="index" options={ {headerShown: false,} }/>
            <Stack.Screen name="requests" options={ {headerShown: false,} }/>
            <Stack.Screen name="activeReq" options={ {headerShown: false,} }/>
        </Stack>
        </ReqProvider>
    );
}