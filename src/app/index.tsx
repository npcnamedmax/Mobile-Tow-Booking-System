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

  if(!session) {
    return <Redirect href={'/signin'} />;
  }

    
  if(session.user.user_metadata.user_type == 'driver') {
    return <Redirect href={'/(driver)'} />;
  }
  else if(session.user.user_metadata.user_type == 'user') {
    return <Redirect href={'/(user)'} />;
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
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button>User</Button>
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button>Admin</Button>
      </Link>
      <Button onPress={signOut} >Sign out</Button>
      <Button onPress={tmp}>tmp</Button>
      <Text>something</Text>
    </View>
  );
};

export default index;