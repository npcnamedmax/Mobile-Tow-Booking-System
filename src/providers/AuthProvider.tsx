import { supabase } from "@/lib/supabase";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { type Session } from "@supabase/supabase-js";

type AuthContextType = {
    session: Session | null;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    profile: any;
    signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    loading: true,
    setLoading: () => {},
    profile: null,
    signOut: () => {},
});

export default function AuthProvider({children} : PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => { //because cannot directly use async function in useEffect, since hooks cannot return a promise
            setLoading(true);
            
            const { data: {session} } = await supabase.auth.getSession();
            
            setSession(session);
            
            if(session) {    //if session exists, get profile
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(data || null);
                
            }
            setLoading(false);
        };
        fetchSession();
        supabase.auth.onAuthStateChange((event, session) => {
            fetchSession();
        });
    }, []);

    const signOut = async () => {
        setLoading(true);
        console.log('signing out');
        await supabase.auth.signOut();
        console.log('signed out');
        setLoading(false);
    }
    
    
    return (
        <AuthContext.Provider value={{session, loading, setLoading, profile, signOut}}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);