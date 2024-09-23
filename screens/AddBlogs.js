import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, uploadBytes,ref, getStorage, uploadBytesResumable } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

import { storage } from '../firebaseConfig';

const AddBlogScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const[image,setImage] = useState(null);
 
  
  const pickImage= async ()=>{
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    if(!result.canceled && result.assets && result.assets.length > 0){
     
      setImage(result.assets[0].uri);
      //console.log('Image Selected : ',selectedImageUri);
    }
  }catch(error){console.error('Error Selecting image: ',error)}
  }
  const uploadImage = async ()=>{
    if(!image) return null;
    try{
      //console.log("Starting image upload, image URI:", image)


      
      // const fileref = ref(storage,`blogImages/${new Date().getTime()}`);
      const response = await fetch(image)
      const blob = await response.blob();
     

      const fileRef = ref(storage,`blogImages/${new Date().getTime()}`);
      await uploadBytes(fileRef, blob);
      
      return await getDownloadURL(fileRef); 
    }catch(e){
      console.error("Image upload failed : ",e);
      return null;
    }
    
  }

  const handleSave = async () => {
    try {
      const imageURL = await uploadImage();

      const docRef = await addDoc(collection(db, "blogs"), {
        id: docRef.id,
        title: title,
        imageURL: imageURL || null,
        description: description,
        date: new Date().toISOString(),
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.goBack();
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
          style={tw`bg-gray-200 p-3 rounded-md mb-4`}
          onPress={pickImage}
        >
          <Text style={tw`text-center font-bold`}>Select Image</Text>
        </TouchableOpacity>
        
        {image && (
          <Image source={{ uri: image }} style={tw`w-full h-40 rounded-md mb-4`} />
        )}

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