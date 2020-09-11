import React, { useContext,useEffect} from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost,getBlogPost } = useContext(Context);
        
    useEffect(()=>{
        getBlogPost();
        const listener=navigation.addListener('didFocus',()=>{
            getBlogPost();
        });

        return ()=>{
            listener.remove();
        };
        
    },[]);

    // useEffect kao lambda funkcija
    return <View>
        <FlatList data={state}
            keyExtractor={(blogPost) => blogPost.title}
            renderItem={({ item }) => {
                return <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                    <View style={styles.row}>
                        <Text style={styles.title}>{item.title} - {item.id}</Text>
                        <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                            <Feather style={styles.icon} name="trash" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            }}
        // renderitem vraca individualno nase objekte koje zelimo vratiti
        // keyExtractor je kao id koji nam treba, data svi podaci
        />
    </View>
};


IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: 
        <TouchableOpacity onPress={()=>navigation.navigate('Create')}>
        <Feather name="plus" size={30} />
        </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18,
    },
    icon: {
        fontSize: 24
    }
});


export default IndexScreen;