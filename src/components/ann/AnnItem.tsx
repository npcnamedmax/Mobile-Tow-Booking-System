import { View, Text, Image, StyleSheet } from 'react-native';
import { type AnnMsg } from '@/types';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

type Props = {
    value: AnnMsg;
}

export default function AnnItem({ value }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.title}>{value.title}</Text>
                <Text style={styles.date}>{value.datetime.fromNow()}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.priority}>{value.priority}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    left: {
        flexDirection: 'column',
        flex: 1,
    },
    right: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontWeight: 'bold',
    },
    date: {
        color: 'gray',
    },
    priority: {
        textAlign: 'right',
    },
});
