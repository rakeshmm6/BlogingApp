import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
import { collection, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, uploadBytes,ref, getStorage, uploadBytesResumable } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

import { storage } from '../firebaseConfig';

const AddBlogScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const[image,setImage] = useState(null);
 
  
  

  const handleSave = async () => {
    try {
      

      const docRef = await addDoc(collection(db, "blogs"), {
       // id: docRef.id,
        title: title,
        //imageURL: imageURL || null,
        description: description,
        date: new Date().toISOString(),
      });
      await setDoc(docRef,{id:docRef.id},{merge:true});
      console.log("Document written with ID: ", docRef.id);
      navigation.navigate('Home');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      <View style={tw`flex-row justify-between items-center p-4 bg-white ml-6`}>
        <Image source={require('../assets/logo.png')} style={tw`mx-auto`} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-2 mt-2`}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold mb-4`}>Add New Blog</Text>
        <TextInput
          style={tw`border border-gray-300 p-2 rounded-md mb-4`}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={tw`border border-gray-300 p-2 rounded-md mb-4 h-32`}
          placeholder="Description"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity
          style={tw`bg-purple-600 p-3 rounded-md`}
          onPress={handleSave}
        >
          <Text style={tw`text-white text-center font-bold`}>Save Blog</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddBlogScreen;