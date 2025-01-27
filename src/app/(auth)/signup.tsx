import { ScrollView, View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Pressable, Alert } from 'react-native';
import Button from '@/components/general/Button';
import React from 'react';
import SwitchSelector from "react-native-switch-selector";
import { Link } from 'expo-router';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { IconButton } from 'react-native-paper';

export default function SignUp() {
  // General fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [icNum, setIcNum] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // User-specific fields
  const [policyNums, setPolicyNums] = useState(['']); // For multiple policy numbers

  // Driver-specific fields
  const [towTruckPlateNumber, setTowTruckPlateNumber] = useState('');
  const [towCompanyName, setTowCompanyName] = useState('');

  const [forUser, setForUser] = useState(true); // Render correct fields

  const addPolicyField = () => {
    setPolicyNums([...policyNums, '']);
  };

  const removePolicyField = (idx: number) => {
    if(policyNums.length > 1) {
      setPolicyNums(policyNums.filter((_, i) => i !== idx));
    }
  }

  const handleChgPolicyNum = (index: number, value: string) => {
    if(index >= 0 && index < policyNums.length) 
      setPolicyNums(policyNums.map((policyNum, i) => i === index ? value : policyNum)); //copy and replace value at idx
  };

  const createAlert = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
    );
  };

  const validateFields = () => {
    if(!email || !password || !fullName || !phoneNumber) {
      createAlert('Error', 'Please enter an email');
      return false;
    }
    if(forUser && policyNums.some(policyNum => !policyNum)) {
      createAlert('Error', 'Please enter all policy numbers');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if(validateFields())
      /*
      supabase.auth.signUp({ //add metadata
        email,
        password,
      });*/
      for(let i = 0; i < policyNums.length; i++) {
        console.log(policyNums[i]);
      }
    }

  

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <SwitchSelector
              options={[
                { label: "User", value: "user" },
                { label: "Driver", value: "driver" },
              ]}
              initial={0}
              onPress={(value: string) => setForUser(value === "user")}
              buttonColor="#4CAF50"
              style={styles.switchSelector}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
            />
            <Text style={styles.label}>IC Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your IC number"
              value={icNum}
              onChangeText={setIcNum}
            />
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            {forUser && (
              <>
                <Text style={styles.label}>Policy Numbers</Text>
                {policyNums.map((policyNum, index) => (
                  <View key={index} style={styles.policyNumField}>
                    <TextInput
                      style={[styles.input, styles.policyTextInput]}
                      placeholder={`Policy Number ${index + 1}`}
                      value={policyNum}
      
                      onChangeText={(value: string) => handleChgPolicyNum(index, value)}
                    />
                    <IconButton icon='minus-box' size={20} onPress={() => removePolicyField(index)} />
                  </View>
                ))}
                <Pressable style={styles.addButton} onPress={addPolicyField}>
                  <Text style={styles.addButtonText}>+ Add Policy Number</Text>
                </Pressable>
              </>
            )}
            {!forUser && (
              <>
                <Text style={styles.label}>Tow Truck Plate Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your tow truck plate number"
                  value={towTruckPlateNumber}
                  onChangeText={setTowTruckPlateNumber}
                />
                <Text style={styles.label}>Tow Company Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your tow company name"
                  value={towCompanyName}
                  onChangeText={setTowCompanyName}
                />
              </>
            )}
            <Button onPress={handleSubmit}>
              <Text>Sign Up</Text>
            </Button>
            <Link href="./signin" style={styles.signInLink}>
              Already have an account? Sign In
            </Link>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  switchSelector: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 14,
    color: '#555',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  addButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  signInLink: {
    marginTop: 20,
    color: '#007BFF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  policyNumField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  policyTextInput: {
    width: '80%',
  }
});

