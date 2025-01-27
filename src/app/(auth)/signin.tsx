import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from '@/components/general/Button';
import { Link } from 'expo-router';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) setError(error.message);
  }

  const validateInput = () => {
    setError('');
    if (!email) {
      setError('Please enter a username');
      return false;
    }
    if (!password) {
      setError('Please enter a password');
      return false;
    }
    return true;
  };

  const onSignIn = () => {
    if (!validateInput()) return;
    signIn();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome!</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <Text style={styles.error}>{error}</Text>
          <Button onPress={onSignIn} disabled={loading}>
            {loading ? <Text>Signing In...</Text> : <Text>Sign In</Text>}
          </Button>
          <View style={styles.signUpRow}>
            <Text>Don't have an account? </Text>
            <Link href="./signup" style={styles.link}>
              Sign up now
            </Link>
          </View>
          <View style={styles.signUpRow}>
            <Text>Forgot password? </Text>
            <Link href="./signup" style={styles.link}>
              Click here
            </Link>
          </View>
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
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  link: {
    color: 'blue',
  },
  signUpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});
