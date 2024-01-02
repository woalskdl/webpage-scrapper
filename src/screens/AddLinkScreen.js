import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Header } from "../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import { SingleLineInput } from "../components/SingleLineInput";
import { Button } from "../components/Button";
import { Typography } from "../components/Typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacer } from "../components/Spacer";
import { useSetRecoilState } from "recoil";
import { atomLinkList } from "../states/atomLinkList";

export const AddLinkScreen = () => {
    const navigation = useNavigation();
    const updateList = useSetRecoilState(atomLinkList);
    const safeAreaInset = useSafeAreaInsets();
    const [url, setUrl] = useState('');

    const onPressClose = useCallback(() => {
        navigation.goBack();
    }, []);

    const onPressSave = useCallback(() => {
        if (!url)
            return;

        updateList((prevState) => {
            const list = [{
                title:'',
                image:'',
                link:url,
                createdAt:new Date().toISOString()
            }]

            return {
                list: list.concat(prevState.list)
            }
        })

        setUrl('');

    }, [url]);

    return (
        <View style={{ flex:1 }}>
            <Header>
                <Header.Group>
                    <Header.Title title='ADD LINK'/>
                </Header.Group>

                <Header.Icon iconName='close' onPress={onPressClose}/>
            </Header>

            <View style={{ flex:1, alignItems:'center', justifyContent:'center', paddingHorizontal:24 }}>
                <SingleLineInput
                    value={url}
                    onChangeText={setUrl}
                    placeholder='https://example.com'
                />
            </View>

            <Button onPress={onPressSave}>
                <View style={{backgroundColor: url ? 'black' : 'gray'}}>
                    <View style={{ height:52, alignItems:'center', justifyContent:'center' }}>
                        <Typography color='white' fontSize={18}>저장</Typography>
                    </View>
                    <Spacer space={safeAreaInset.bottom}/>
                </View>
            </Button>
        </View>
    )
}