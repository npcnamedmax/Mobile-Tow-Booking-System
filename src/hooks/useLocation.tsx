import { useState } from 'react';
import * as Location from 'expo-location';
import { type locationType } from '@/types';

export default function useLocation() { //hook that returns location state and getLoc
    
    const [curLoc, setCurLoc] = useState<locationType | null>(null); //current loc state based on gps

    const getLocPerm = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync(); //get permission
        console.log("waiting");
        if(status == 'granted') {
          return true;
        }
        alert('Permission to access location was denied');
        return false;
      };

      const getCurLoc = async () => { 
        try {
          const perm = await getLocPerm(); //do this instead of using anohter useState for locPerm since its update is async, so it will not be updated immediately, and
                                           //await doesnt work since it is not a promise, but rather a state managed by react
          
          if(perm == false) { //unable to get loc perm
            console.log("unable");
            return;
          }
          const location = await Location.getCurrentPositionAsync({}); //get current loc
          setCurLoc({
            name: 'Current Location',
            coord: {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            }
          });
        } catch (error) {
          console.log(error);
        }
        
      };

    return { curLoc, getCurLoc };

}