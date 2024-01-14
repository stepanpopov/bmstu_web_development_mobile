import { View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import Post from "../components/Post";
import React, {useEffect, useState} from "react";
import {axiosInstance} from "../api";
import SearchBar from "../components/SearchBar";

const HomeScreen =({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState([])
    const [query, setQuery] = useState("")
    const [clicked, setClicked] = useState(false)


    const fetchPosts = () => {
        setIsLoading(true)
        axiosInstance
            .get(`/dataService/?dataname=${query}`)
            .then(({data}) => {
                setItems(data['data_service'])
            })
            .catch((err) => {
                alert(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(fetchPosts, [query])

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("FullPost", {id: item.data_id, name: item.data_name, image_url: item.image_url })}>
            <Post navigation={navigation} id={item.data_id} name={item.data_name} image_url={item.image_url} />
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1 }}>

            <SearchBar searchPhrase={query} setSearchPhrase={setQuery} clicked={clicked} setClicked={setClicked} />

            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
                data={items}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: "20%" }}
            />



        </View>
    );
}

export default HomeScreen;
