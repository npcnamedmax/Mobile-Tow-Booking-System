import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
  import Button from '@/components/general/Button';
  import {useState} from 'react';

  export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function signUp() {
      console.log("signup");
    }
  
    const validateInput = () => {
      setError('');
      if (!username) {
        setError('Please enter a username');
        return false;
      }
      if (!password) {
        setError('Please enter a password');
        return false;
      }
      return true;
    };
  
    const onSignUp = () => {
      if (!validateInput()) return;
      signUp();
      console.log('Sign up!');
    };
  
    return ( //view that avoids keyboard
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}> 
            <Text style={styles.title}>New Username</Text>
            <TextInput
              style={styles.input}
              placeholder="username"
              value={username}
              onChangeText={setUsername}
            />

            <Text style={styles.title}>New Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Text style={styles.error}>{error}</Text>
            <Button text="Sign Up" onPress={onSignUp} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      height: 50,
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
    link: {
      color: 'blue',
      textAlign: 'center',
      marginTop: 10,
    },
  });
  
  