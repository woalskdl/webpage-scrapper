import React, { useCallback } from "react";
import { View } from "react-native";
import { Header } from "../components/header/Header";
import { useNavigation } from "@react-navigation/native";

export const AddLinkScreen = () => {
    const navigation = useNavigation();

    const onPressClose = useCallback(() => {
        navigation.goBack();
    }, []);

    return (
        <View style={{ flex:1 }}>
            <Header>
                <Header.Group>
                    <Header.Title title='ADD LINK'/>
                </Header.Group>

                <Header.Icon iconName='close' onPress={onPressClose}/>
            </Header>
        </View>
    )
}