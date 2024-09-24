import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image,TouchableOpacity, SafeAreaView, Pressable, Button,TextInput } from 'react-native';
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../firebaseConfig'; 
import { db } from '../firebaseConfig';
import { getDocs } from 'firebase/firestore';
import { Dropdown } from 'react-native-element-dropdown';
import BlogCard from '../components/BlogCard.js';
import { collection } from 'firebase/firestore';
import { useFocusEffect, useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';

const dropData=[
  {labels:"AfterGlow", value:"1"},
  {labels:"BeforeGlow",value:"2"},
  {labels:"Sample",value:"3"},
    {labels:"item",value:"4",}
  

];  
const HomeScreen = ({navigation,route}) => {
  const[profileVisible,setProfileVisible]=useState(false)
  const user= auth.currentUser;
  const [value,setValue]=useState(null)
  const [scenarioValue,setScenarioValue]=useState(null)
  const [blogs,setBlogs]=useState([])
  const [searchActive, setSearchActive] = useState(false); // New state for search bar
  const [searchQuery, setSearchQuery] = useState(''); // To hold search input
  const [refreshKey, setRefreshKey] = useState(0);
  const deletedBlogId = route.params?.deletedBlo

  const isFocused = useIsFocused();

  const handleLogout = async()=>{
    await auth.signOut();
  }

  const fetchBlogs= useCallback(async()=>{
    try{const blogsCollection = collection(db,'blogs');
      const blogSnapshot = await getDocs(blogsCollection);
      const blogList = blogSnapshot.docs.map(doc=>({id : doc.id,...doc.data()}));
      setBlogs(blogList);}
    catch(error){
    console.error("Error fetching blogs: ", error);
  }
    
  },[]);
  
  useEffect(()=>{
    if(isFocused){
      fetchBlogs();
    }
  },[isFocused,fetchBlogs]);



  const handleSelectBlog = (item)=>{
    navigation.navigate('BlogDetailed',{
      title:item.title,
      description:item.description,
      date:item.date,
      image:item.randomImage,
      id:item.id
    })
  }

  return (
    <SafeAreaView style={tw`h-full`}>
    
      
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row justify-between items-center p-4 bg-white ml-6`}>
       <Image source={require('../assets/logo.png')} style={tw`mx-auto  `}/>
        <View style={tw`flex-row items-center`}>

       {searchActive ? (
              <TextInput
                style={tw` border-gray-400 p-2 w-40 `} 
                placeholder="Search..."
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onBlur={() => setSearchActive(false)} 
                autoFocus={true} 
              />
            ) : (
              <TouchableOpacity style={tw`mr-2 mt-2`} onPress={() => setSearchActive(true)}>
                <AntDesign name="search1" size={20} color="gray" />
              </TouchableOpacity>
            )}
          <TouchableOpacity onPress={()=>setProfileVisible(!profileVisible)}>
            <Image
              source={require('../assets/avatar.png')} // Replace with your avatar image
              style={tw`h-8 w-8 rounded-full mt-2`}
            />
          </TouchableOpacity>
          
        </View>
        
      </View>
      {profileVisible && (
          <View style={[tw`absolute top-14 right-4 bg-white shadow-lg rounded-lg p-4 w-40`, {top:60,zIndex:10}]}>
            <Text style={tw`text-sm font-bold`} numberOfLines={1}>{user?.displayName || 'User'} </Text>
            <Text style={tw`text-gray-500`} numberOfLines={1}>{user?.email}</Text>
            <TouchableOpacity onPress={handleLogout} style={tw`mt-2`}>
              <Text style={tw`text-red-500`}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      

      <View style={tw`flex-row justify-between p-4`}>
       
      {/* First Dropdown */}
      <Dropdown
        style={tw`border-none p-3 rounded-2xl w-40 bg-gray-100`} // Adjust the width
        maxHeight={100}
        data={dropData}
        labelField="labels"
        valueField="value"
        placeholder="Afterglow"
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        selectedTextStyle={tw`text-black`}
        itemTextStyle={tw`text-black`}
        itemContainerStyle={tw`rounded border-gray-300  w-40 bg-gray-100`} 
      />

      {/* Scenario Text and Second Dropdown */}
      <View style={tw`flex-row items-center ml-3`}> 
      <Text style={tw``}>Scenario</Text> 
        <Dropdown
          style={tw`border-none p-3 rounded-2xl w-30 bg-white `} // Adjust the width
          maxHeight={100}
          data={dropData}
          labelField="labels"
          valueField="value"
          placeholder="Default"
          value={scenarioValue}
          onChange={(item) => {
            setScenarioValue(item.value);
          }}
          selectedTextStyle={tw`text-black`}
        itemTextStyle={tw`text-black`}
        itemContainerStyle={tw`rounded border-gray-300  w-30 bg-gray-100`} 
        />
      </View>
    </View>

      <View style={tw`flex-row justify-between p-4 `}>
        <Text style={tw`text-2xl mt-2 ml-3 font-bold`}>Blog</Text>
        <View style={tw`flex-row`}>
      {/* Add New Button */}
      <Pressable
        style={tw`bg-white p-3 rounded-2xl`} // Styling the button
        onPress={() => {
          navigation.navigate('AddBlogs');
        }}
      >
        <Text style={tw`text-black text-center`}>Add New</Text>
      </Pressable>
      <Pressable
        style={[tw` w-20 p-3 rounded-2xl`,{backgroundColor: '#6c5dd3'}]} // Styling the button
        onPress={() => {
          console.log('Preview button pressed');
        }}
      >
        <Text style={tw`text-center text-white`}>Preview</Text>
      </Pressable>
        </View>
      </View>
     
     {/* onPress={()=>navigation.navigate('BlogDetailed')} */}
      <BlogCard onSelect={handleSelectBlog} blogs={blogs}/>
     
        
      </View>
    
    </SafeAreaView>
  );
};

// Sample data for blogs

export default HomeScreen;