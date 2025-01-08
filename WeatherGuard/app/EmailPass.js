import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const EmailPass = () => {
  const [email, setEmail] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email || '');
    }
  }, []);

  const handleSendPasswordReset = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Password reset email sent! Check your inbox.');
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email and Password</Text>

      <View style={styles.emailContainer}>
        <Text style={styles.label}>Registered Email:</Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>

      {!isChangingPassword && (
        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={() => setIsChangingPassword(true)}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      )}

      {isChangingPassword && (
        <View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSendPasswordReset}>
            <Text style={styles.buttonText}>Send Password Reset Link</Text>
          </TouchableOpacity>
        </View>
      )}

      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091A3F',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  },
  emailContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#000',
  },
  changePasswordButton: {
    backgroundColor: '#123264',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#123264',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  message: {
    marginTop: 20,
    fontSize: 14,
    color: '#88C0D0',
    textAlign: 'center',
  },
});

export default EmailPass;
