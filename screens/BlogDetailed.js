import { deleteDoc, doc, collection, getDocs , getDoc} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import tw from 'twrnc';
import { db } from '../firebaseConfig';

const BlogDetailed = ({ route, navigation }) => {
  const [profileVisible, setProfileVisible] = useState(false);
  const { title, description, date, image, id } = route.params;
  const [blog, setBlog] = useState(null);
  const handleDelete = async () => {
    Alert.alert(
      "Delete Blog",
      "Are you sure you want to delete this blog?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              console.log("Attempting to delete blog with ID:", id);

              // Delete the blog document from Firestore
              const blogRef = doc(db, 'blogs', id);
              await deleteDoc(blogRef);
              console.log("Blog deleted successfully");

              Alert.alert('Success', 'Blog deleted successfully!');
              navigation.navigate('Home',{deletedBlogId: id});
            } catch (error) {
              console.error("Error deleting the blog: ", error);
              console.error("Error stack: ", error.stack);
              Alert.alert('Error', `Failed to delete the blog. Error: ${error.message}`);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        //const blogId = route.params.id;
        const blogRef = doc(db, 'blogs', id);
        const blogSnapshot = await getDoc(blogRef);

        if (blogSnapshot.exists()) {
          setBlog({
            id: blogSnapshot.id,
            ...blogSnapshot.data(),
          });
        } else {
          console.error('Blog not found in Firestore');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [route.params.id]);

  
 
  if (!blog) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={tw`p-4`}>
      <Image source={image} style={styles.image} />
      <Text style={tw`text-2xl font-bold mb-2`}>{blog.title}</Text>
      <Text style={tw`text-gray-500 mb-4`}>{new Date(blog.date).toLocaleDateString()}</Text>
      <Text style={tw`mb-4`}>{blog.description}</Text>
      <Button title="Delete Blog" onPress={handleDelete} color="#ff0000" />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: '100%',
    borderRadius: 10,
  },
});

export default BlogDetailed;