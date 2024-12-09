import { Text, View, FlatList } from 'react-native';
import anns from '@assets/data/anns';
import AnnItem from '@/components/ann/AnnItem';

export default function Ann() {
    return (
        <FlatList
        data={anns}
        renderItem={
            ({item}) => (
                <AnnItem value={item} />
            )
        }
        contentContainerStyle={
            {
                flex: 1,
                backgroundColor: 'gray',
                padding: 10,
            }
        } />
    );
};