import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, TextInput, RadioButton } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';


// Invoice List Page
export default function Invoices() {
  const [method, setMethod] = React.useState('Credit Card');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [holderName, setHolderName] = React.useState('');

  return (
    <View style={styles.containerPayment}>
      <Stack.Screen options={{title: 'Payment'}} />
      <Text style={styles.detailText}>Select Payment Method:</Text>
      <RadioButton.Group onValueChange={(value) => setMethod(value)} value={method} defaultChecked>
        <View style={styles.radioGroup}>
          <RadioButton value="Credit Card" />
          <Text>Credit Card</Text>
        </View>
        <View style={styles.radioGroup}>
          <RadioButton value="PayPal" />
          <Text>Touch N' Go</Text>
        </View>
        <View style={styles.radioGroup}>
          <RadioButton value="ss" />
          <Text>Online Banking</Text>
        </View>
      </RadioButton.Group>

      {method === 'Credit Card' && (
        <>
          <TextInput
            label="Cardholder Name"
            value={holderName}
            onChangeText={setHolderName}
            style={styles.input}
          />
          <TextInput
            label="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.rowContainer}>
            <TextInput
              label="Expiry Date"
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholder="MM/YY"
              keyboardType="numeric"
              style={[styles.input, styles.halfInput]}
            />
            <TextInput
              label="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              secureTextEntry
              style={[styles.input, styles.halfInput]}
            />
          </View>
        </>
      )}

      <Button mode="contained" style={styles.button} onPress={() => alert('Payment Successful!')}>
        Pay Now
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  containerDetails: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    gap: 12,
  },
  containerPayment: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  invoiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tripText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  datetimeText: {
    fontSize: 12,
    color: 'grey',
    marginTop: 4,
  },
  invoiceStatus: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  paid: {
    color: 'green',
  },
  unpaid: {
    color: 'red',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 8,
  },
  detailFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  fieldLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  fieldValue: {
    fontSize: 16,
    textAlign: 'right',
  },
  button: {
    marginVertical: 8,
  backgroundColor: '#007BFF',
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  input: {
    marginVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
});
