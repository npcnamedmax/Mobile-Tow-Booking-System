import { View, Text } from 'react-native';
import { useReqContext } from '@/providers/ReqProvider';

export default function Tracking() {
    const activeReq = useReqContext();
    return (
        <View>
            <Text>Tracking</Text>
        </View>
    );
}