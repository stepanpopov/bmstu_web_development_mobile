import React, {useEffect, useState} from 'react'
import styled from 'styled-components/native'
import {View} from "react-native";
import {Loading} from "../components/Loader";
import {axiosInstance} from "../api";
import {COURSES, DOMAIN, EDUCATION_TYPES} from "../consts";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 350px;
  margin-bottom: 20px;
`

const PostDetails = styled.View`
  flex-direction: column;
`

const PostText = styled.Text`
  flex-direction: column;
  font-size: 18px;
  line-height: 24px;
  padding: 3%;
  font-weight: bold;
`


const FullPostScreen = ({ route, navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()

    const { id, name } = route.params

    const fetchGroup = () => {
        navigation.setOptions({
            name,
        })

        axiosInstance
            .get("/dataService/" + id)
            .then(({data}) => {
                setData(data)
            })
            .catch((err) => {
                console.log(err)
                alert("Ошибка, не удалось получить данные")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(fetchGroup, [])

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Loading />
            </View>
        )
    }

    return (
        <View style={{ padding: 20 }}>
            <PostImage source={{uri: data.image_url}} />
            <PostDetails>
                <PostText>
                    Название: {data.data_name}
                </PostText>
                <PostText>
                    Данные: { data.blob }
                </PostText>
                <PostText>
                    Операция: { data.encode ? "расшифровать" : "зашифровать" }
                </PostText>

            </PostDetails>

        </View>
    )
}

export default FullPostScreen;