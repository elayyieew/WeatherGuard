import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  TextInput,
  View,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For the eye icon
import Logo from '../components/Logo';
import OrDivider from '../components/login/orDivider';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      Alert.alert('Success', `Welcome back, ${user.email}!`);
      navigation.navigate('MainApp');
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#091A3F', '#054DEB']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo size={180} />
          <Text style={styles.title}>Stay Safe, Aware, and Connected!</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter E-mail"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Enter Password"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
            />
            <MaterialCommunityIcons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#FFFFFF" // Set the icon color explicitly to white
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            />
          </View>
          <View style={styles.forgotPasswordContainer}>
            <Text
              style={styles.forgotPasswordText}
              onPress={() => navigation.navigate('ForgotPass')}
            >
              Forgot Password?
            </Text>
          </View>
        </View>
        <Button
          mode="contained"
          onPress={handleLogin}
          buttonColor="#FCB316"
          style={styles.button}
          labelStyle={styles.buttonText}
          loading={loading}
          disabled={loading}
        >
          Log In
        </Button>
        <OrDivider />
        <Button
          mode="text"
          onPress={() => navigation.navigate('Signup')}
          textColor="white"
          labelStyle={styles.linkText}
        >
          Need an Account? REGISTER.
        </Button>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    color: 'white',
  },
  eyeIcon: {
    marginRight: 10,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginRight: 5,
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'right',
  },
  button: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#091A3F',
  },
  linkText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Login;
