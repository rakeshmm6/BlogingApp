import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import {db} from '../firebaseConfig'
import { collection, getDocs,doc } from 'firebase/firestore';
import Icon from 'react-native-fontawesome';
import {AntDesign} from '@expo/vector-icons'

// Card Component
const BlogCard = ({onSelect,blogs}) => {

  const[blogss,setBlogss]=useState([]);
  const imageData = [
    require('../assets/frame.png'),
    require('../assets/frame_1.png'),
    require('../assets/frame_2.png'),
    require('../assets/frame_3.png'),
    require('../assets/frame_4.png'),
    require('../assets/frame_5.png'),
  ];
  // useEffect(()=>{
  //   const fetchBlogs=async()=>{
  //     const querySnapshot = await getDocs(collection(db, "blogs"));
  //     const blogsData = querySnapshot.docs.map(doc =>({
  //       id: doc.id,
  //       ...doc.data(),
  //       randomImage: imageData[Math.floor(Math.random()*imageData.length)]
  //     }));
  //     setBlogss(blogsData);
  //   };
  //   fetchBlogs();
  // },[])
  const assignRandomImage = (blog) => {
    return {
      ...blog,
      randomImage: imageData[Math.floor(Math.random() * imageData.length)],
    };
  };
  

  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({ item }) => {
    return (
     
        <TouchableOpacity style={{ width: screenWidth / 2 - 20 }}
        onPress={()=>onSelect(item)}> 
        <View style={tw`bg-white p-4 m-2 rounded-lg shadow-lg`}>
         
        <Image
         source={item.randomImage}
         style={tw`h-24 w-full rounded-lg`}
         resizeMode="cover"
       />
       
       <Text style={tw`text-lg font-bold mt-2`}numberOfLines={1}>{item.title}</Text>
       <Text style={tw`text-gray-600 text-sm mt-1`} numberOfLines={3}>{item.description}</Text>
       <View >
        <View style={tw`flex-row items-center`}>
        <AntDesign name="calendar" style={tw`mt-2 mr-1 color-gray-300`}/>
        <Text style={tw`text-gray-400 text-xs mt-2`}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
        </View>
     </View></TouchableOpacity>
       
       
    
      
    );
  };
  const blogsWithImages = blogs.map(assignRandomImage);
  return (
    <FlatList
      data={blogsWithImages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2} // Render two cards side by side
      contentContainerStyle={tw`p-4`}
      columnWrapperStyle={tw`justify-between`}
    />
  );
};

export default BlogCard;
