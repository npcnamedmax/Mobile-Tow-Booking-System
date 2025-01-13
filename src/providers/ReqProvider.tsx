import {createContext, PropsWithChildren, useContext, useState} from 'react';
import { randomUUID } from 'expo-crypto';
import { type locationType, type TowReq } from '@/types';
import * as Location from 'expo-location';

type ReqContextType = {
    curLoc: locationType|null;
    getCurLoc: () => void;
    activeReq: TowReq|null;
    setActiveReq: (active: TowReq|null) => void;
};


const ReqContext = createContext<ReqContextType>({ //initial values
  curLoc: null,
  getCurLoc: () => {},
  activeReq: null,
  setActiveReq: () => {},
});

export default function ReqProvider({ children } : PropsWithChildren) {
  
  const [curLoc, setCurLoc] = useState<locationType | null>(null);
  const [activeReq, setActiveReq] = useState<TowReq|null>(null);
  const [locPerm, setLocPerm] = useState<boolean>(false);

  const getLocPerm = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync(); //get permission
    if(status == 'granted') {
      setLocPerm(true);
    }
    setLocPerm(false);
  };

  const getCurLoc = async () => { 
    try {
      if(!locPerm) 
        await getLocPerm(); //if loc perm not granted, ask for it
      //const perm = await getLocPerm(); //do this instead of using anohter useState for locPerm since its update is async, so it will not be updated immediately, and
                                       //await doesnt work since it is not a promise, but rather a state managed by react
      
      if(locPerm == false) { //unable to get loc perm
        alert('Permission to access location was denied');
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

  return (
    <ReqContext.Provider value={{ curLoc, getCurLoc, activeReq, setActiveReq }}>
      {children}
    </ReqContext.Provider>
  );
}

export const useReqContext = () => useContext(ReqContext);