import React, { useCallback } from "react";
import { View } from "react-native";
import { Header } from '../components/header/Header';
import { Button } from "../components/Button";
import { Typography } from "../components/Typography";
import { useNavigation } from "@react-navigation/native";
import { Spacer } from "../components/Spacer";

export const LinkListScreen = () => {
    const navigation = useNavigation();

    const onPressbutton = useCallback(() => {
        navigation.navigate('LinkDetail');
    }, []);

    const onPressAddButton = useCallback(() => {
        navigation.navigate('AddLink');
    }, []);

    return (
        <View style={{ flex:1 }}>
            <Header>
                <Header.Group>
                    <Header.Title title='LINK LIST'/>
                </Header.Group>
            </Header>

            <View style={{ flex:1 }}>
                <Button onPress={onPressbutton}>
                    <Typography>LINK DETAIL</Typography>
                </Button>

                <Spacer space={12}/>

                <Button onPress={onPressAddButton}>
                    <Typography>링크 등록하기</Typography>
                </Button>

            </View>
        </View>
    )
}