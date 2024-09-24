import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust this import path as needed
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (name === '' || email === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      //await createUserWithEmailAndPassword(auth, email, password); 
      await updateProfile(userCredential.user, { displayName: name });
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={tw`h-full`}>
      <View style={tw`flex-1 bg-white p-4`}>
        {/* Header */}
        <View style={tw`flex-row justify-between items-center mb-8`}>
          <Image source={require('../assets/logo.png')} style={tw`h-8 w-32`} resizeMode="contain" />
         
        </View>

        <Text style={tw`text-3xl font-bold mb-8 text-gray-800`}>Sign Up</Text>
        
        <TextInput
          style={tw`w-full h-12 px-4 mb-4 border border-gray-300 rounded-xl bg-gray-100`}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={tw`w-full h-12 px-4 mb-4 border border-gray-300 rounded-xl bg-gray-100`}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={tw`w-full h-12 px-4 mb-6 border border-gray-300 rounded-xl bg-gray-100`}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity 
          style={tw`w-full bg-[#6c5dd3] p-3 rounded-xl items-center`}
          onPress={handleSignup}
        >
          <Text style={tw`text-white font-bold text-lg`}>Sign Up</Text>
        </TouchableOpacity>
        
        <View style={tw`flex-row mt-4 justify-center`}><Text style={tw` text-gray-500`}>Already have an account? </Text>
          <TouchableOpacity 
          style={tw` `}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={tw`text-[#6c5dd3] font-bold`}>Login</Text>
        </TouchableOpacity></View>
      </View>
    </SafeAreaView>
  );
}