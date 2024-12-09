import {createContext, PropsWithChildren, useContext, useState} from 'react';
import { Priority, type AnnMsg } from '@/types';
import { randomUUID } from 'expo-crypto';
import dayjs from 'dayjs';

type AnnContextType = {
    annMsgs: AnnMsg[] | null;
    setAnnMsg: (id: string, updateProp: Partial<msgInp>) => void;
    addAnnMsg: (msg: AnnMsg) => void;
    delAnnMsg: (id: string) => void;
};

type msgInp = {
    title: string;
    message?: string;
    priority: Priority;
}

const AnnContext = createContext<AnnContextType>({ //initial values
  annMsgs: null,
  setAnnMsg: () => {},
  addAnnMsg: () => {},
  delAnnMsg: () => {},
});

export default function AnnProvider({ children } : PropsWithChildren) {
  const [annMsgs, setAnnMsgs] = useState<AnnMsg[]>([]);

  const addAnnMsg = ({title, message, priority} : msgInp) => {
    const newMsg = {
        id: randomUUID(),
        datetime: dayjs(),
        title,
        message: message ?? '',
        priority,
    }
    setAnnMsgs([...annMsgs, newMsg]);
  };

  const delAnnMsg = (id: string) => {
    setAnnMsgs(annMsgs.filter((msg) => msg.id !== id)); //filters out the msg that matches the id
  };

    const setAnnMsg = (id: string, updateProp: Partial<msgInp>) => { //edit msg, Partial makes all properties optional
        annMsgs.map((msg) => {
            if (msg.id === id) {
                msg = {...msg, ...updateProp}; //updateProp is the new value(s), which overwrites old value(s) of the property
            }
        });
    };

  return (
    <AnnContext.Provider value={{ annMsgs, setAnnMsg, addAnnMsg, delAnnMsg }}>
      {children}
    </AnnContext.Provider>
  );
}

export const useAnnContext = () => useContext(AnnContext);