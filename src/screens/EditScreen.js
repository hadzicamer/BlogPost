import React, { useContext} from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostfrom from '../components/BlogPostForm';

const EditScreen = ({ navigation }) => {

    const { state,editBlogPost } = useContext(Context);

    const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'));
   return <BlogPostfrom 
   initialValues={{title:blogPost.title,content:blogPost.title}}
   onSubmit={(title,content)=>{
       editBlogPost(blogPost.id,title,content,()=>{
           navigation.pop()
       });
   }}/>
};

// gornja linija objasnjava kako editujemo, usestate sadrzi inicijalnu vrijednost i to je taj post

const styles = StyleSheet.create({});

export default EditScreen;