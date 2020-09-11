import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostfrom from '../components/BlogPostForm';
const CreateScreen = ({ navigation }) => {
    const { addBlogPost } = useContext(Context);
    return <BlogPostfrom onSubmit={(title,content) => {
        addBlogPost(title,content,()=>navigation.navigate('Index'));
    }} />
};

const styles = StyleSheet.create({

});

export default CreateScreen;