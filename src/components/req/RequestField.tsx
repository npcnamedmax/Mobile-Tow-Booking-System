import { Text, View, StyleSheet } from 'react-native';
type Props = {
    label: string|number;
    value: string|number;
};

export default function RequestField( {label, value} : Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        borderRadius: 10,
        padding: 10,
    },
    label: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 12,
    },
    value: {
        color: 'black',
        fontSize: 16,
    },
});