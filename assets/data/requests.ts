import dayjs from 'dayjs';
import { type TowReq } from '@/types';

export const requests: TowReq[] = [
    {
        id: '1',
        datetime: dayjs('2021-10-01T10:00:00'),
        img: {
            left: 'https://placehold.co/150/orange/white?text=left+img&font=roboto',
            right: 'https://placehold.co/150/orange/white?text=right+img&font=roboto',
            front: 'https://placehold.co/150/orange/white?text=front+img&font=roboto',
            rear: 'https://placehold.co/150/orange/white?text=rear+img&font=roboto',
        },
        userLoc: {
            coord: {
                lat: 3.1319,
                lng: 101.6841,
            },
            name: 'KL',
        },
        destLoc: {
            name: "Mid Valley workshop 2",
            coord: {
                lat: 3.1172,
                lng: 101.6781,
            }
        },
        userCar: {
            carMake: 'Toyota',
            carModel: 'Vios',
            carPlate: 'WTF1234',
            carYear: '2010',
            carColor: 'Black',
        },
        status: 'pending',
    },
    {
        id: '2',
        datetime: dayjs('2022-10-01T10:00:00'),
        img: {
            left: 'https://placehold.co/150/red/white?text=left+img&font=roboto',
            right: 'https://placehold.co/150/red/white?text=right+img&font=roboto',
            front: 'https://placehold.co/150/red/white?text=front+img&font=roboto',
            rear: 'https://placehold.co/150/red/white?text=rear+img&font=roboto',
        },
        userLoc: {
            name: "Pavillion workshop 3",
            coord: {
                lat: 3.1490,
                lng: 101.7134,
            }
        },
        destLoc: {
            name: "MMU workshop 4",
            coord: {
                lat: 2.9278,
                lng: 101.6419,
            }
        },
        userCar: {
            carMake: 'Honda',
            carModel: 'Vios',
            carPlate: 'WTF134',
            carYear: '2010',
            carColor: 'Black',
        },
        status: 'pending',
    },
    {
        id: '3',
        datetime: dayjs('2023-10-01T10:00:00'),
        img: {
            left: 'https://placehold.co/150/blue/white?text=left+img&font=roboto',
            right: 'https://placehold.co/150/blue/white?text=right+img&font=roboto',
            front: 'https://placehold.co/150/blue/white?text=front+img&font=roboto',
            rear: 'https://placehold.co/150/blue/white?text=rear+img&font=roboto',
        },
        userLoc: {
            name: "Location 5 workshop 5",
            coord: {
                lat: 1.2,
                lng: 101.6666,
            }
        },
        destLoc: {
            name: "Mid Valley workshop 2",
            coord: {
                lat: 3.1172,
                lng: 101.6781,
            }
        },
        userCar: {
            carMake: 'Lamborghini',
            carModel: 'Vios',
            carPlate: 'WTF1234',
            carYear: '2010',
            carColor: 'Black',
        },
        status: 'pending',
    },
    {
        id: '4',
        datetime: dayjs('2024-10-01T10:00:00'),
        img: {
            left: 'https://dummyimage.com/1600x900/9c2d9c/fff.png&text=ba',
            right: 'https://dummyimage.com/1600x900/9c2d9c/fff.png&text=aa',
            front: 'https://placehold.co/150/orange/white?text=front+img&font=roboto.png',
            rear: 'https://placehold.co/150/orange/white?text=rear+img&font=roboto.png',
        },
        userLoc: {
            coord: {
                lat: 3.1319,
                lng: 101.6841,
            },
            name: 'KL',
        },
        destLoc: {
            name: "Mid Valley workshop 2",
            coord: {
                lat: 3.1172,
                lng: 101.6781,
            }
        },
        userCar: {
            carMake: 'Ferrari',
            carModel: 'Vios',
            carPlate: 'WTF12',
            carYear: '2010',
            carColor: 'Black',
        },
        status: 'pending',
    },
];