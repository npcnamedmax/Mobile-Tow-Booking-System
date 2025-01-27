import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '@/components/general/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';



const index = () => {
  const {session, loading, signOut} = useAuth();
  if(loading) {
    return <ActivityIndicator />;
  }
    

  
/*
  const tmp = async () => {
    console.log(session.user.id);
    const {data: stateUser, error: stateUserError} = await supabase
    .from('customers')
    .select('policy_number')
    .eq('id', session.user.id)
    .single();
    if(stateUserError) {
      console.log(stateUserError);
      return;
    }
    console.log(stateUser);
    
    const { data, error } = await supabase
    .from("customers")
    .update({
      policy_number: [
        ...stateUser?.policy_number, // previous JSON objects
        'newPolicy',
      ],
    })
    .eq("id", session.user.id)
    .select();
    if(error) {
      console.log(error);
      return;
    }
    console.log(data);
  }
  */
  return (
    <Redirect href='/signup'/>
  );
};

export default index;