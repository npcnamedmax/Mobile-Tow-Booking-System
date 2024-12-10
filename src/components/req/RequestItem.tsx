import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { type TowReq } from '@/types';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';


dayjs.extend(relativeTime);

type Props = {
    item: TowReq;
}

export default function RequestItem({ item }: Props) {
    const segments = useSegments();
    return (
        <Link href={`/${segments[0]}/requests/${item.id}`} asChild>
            <Pressable style={styles.itemContainer}>
              <View style={styles.topRow}>
                <Text style={styles.dateText}>{item.datetime.format('YYYY-MM-DD HH:mm')}</Text>
              </View>
              <View style={styles.middleRow}>
                <Text style={styles.locationText}>{item.userLoc.name} → {item.destLoc.name}</Text>
              </View>
              <View style={styles.bottomRow}>
                <Text style={styles.carText}>{item.userCar.carMake} {item.userCar.carModel} ({item.userCar.carPlate})</Text>
                {item.img.front && <Image source={{ uri: item.img.front }} style={styles.thumbnail} />}
              </View>
            </Pressable>
        </Link>
      );
}

const styles = StyleSheet.create({
    itemContainer: {
      padding: 10,
      marginBottom: 10,
      backgroundColor: 'white',
      borderRadius: 8,
      elevation: 3,
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    dateText: {
      fontSize: 14,
      color: 'gray',
    },
    statusText: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    middleRow: {
      marginBottom: 5,
    },
    locationText: {
      fontSize: 16,
      color: 'black',
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    carText: {
      fontSize: 14,
      color: 'darkgray',
    },
    thumbnail: {
      width: 50,
      height: 50,
      borderRadius: 4,
    },
  });
  
