import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View, useWindowDimensions } from "react-native";
import { Header } from "../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import { SingleLineInput } from "../components/SingleLineInput";
import { Button } from "../components/Button";
import { Typography } from "../components/Typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacer } from "../components/Spacer";
import { useSetRecoilState } from "recoil";
import { atomLinkList } from "../states/atomLinkList";
import { getOpenGraphData } from "../utils/OpenGraphTagUtils";
import { RemoteImage } from '../components/RemoteImage';
import { getClipboardString } from "../utils/ClipboardUtils";
import { Icon } from '../components/Icons';

export const AddLinkScreen = () => {
    const navigation = useNavigation();
    const updateList = useSetRecoilState(atomLinkList);
    const safeAreaInset = useSafeAreaInsets();
    const [metaData, setMetaData] = useState(null);
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const {width} = useWindowDimensions();

    const onPressClose = useCallback(() => {
        navigation.goBack();
    }, []);

    const onPressSave = useCallback(() => {
        if (!url)
            return;

        updateList((prevState) => {
            const list = [{
                title:metaData.title,
                image:metaData.image,
                link:url,
                createdAt:new Date().toISOString()
            }]

            return {
                list: list.concat(prevState.list)
            }
        })

        setUrl('');

    }, [url]);

    const onSubmitEditing = useCallback(async () => {
        setLoading(true);
        const result = await getOpenGraphData(url);

        setMetaData(result);
        setLoading(false);
    }, [url])

    // https://www.google.com

    const onGetClipboardString = useCallback(async() => {
        const result = await getClipboardString();

        if (result.startsWith('http://') || result.startsWith('https://')) {
            setUrl(result);
            const ogResult = await getOpenGraphData(result);

            setMetaData({
                title: ogResult.title,
                image: ogResult.image,
                description: ogResult.description
            })
        }

    }, [])

    useEffect(() => {
        onGetClipboardString();
    }, [])

    return (
        <View style={{ flex:1 }}>
            <Header>
                <Header.Group>
                    <Header.Title title='ADD LINK'/>
                </Header.Group>

                <Header.Icon iconName='close' onPress={onPressClose}/>
            </Header>

            <View style={{ flex:1, justifyContent:'flex-start', paddingTop:32, paddingHorizontal:24 }}>
                <View>
                    <SingleLineInput
                        value={url}
                        onChangeText={setUrl}
                        placeholder='https://example.com'
                        onSubmitEditing={onSubmitEditing}
                    />
                    <View style={{ position:'absolute', top:0, bottom:0, right:0, borderWidth:1, alignItems:'center', justifyContent:'center' }}>
                        <Button onPress={() => {
                            setUrl('');
                            setMetaData(null);
                        }}>
                            <Icon name={'close'} color='black' size={20}/>
                        </Button>
                    </View>
                </View>
                {loading ?  (
                    <>
                        <Spacer space={20}/>
                        <View style={{ borderWidth:1, borderRadius:4, borderColor:'gray' }}>
                            <Spacer space={(width - 48) * 0.5} />
                            <Spacer space={50} />

                            <View style={{ position:'absolute', left:0, right:0, top:0, bottom:0, alignItems:'center', justifyContent:'center' }}>
                                <ActivityIndicator/>
                            </View>
                        </View>
                    </>
                )
                : metaData != null && (
                    <>
                        <Spacer space={20}/>

                        <View style={{ borderWidth:1, borderRadius:4, borderColor:'gray' }}>
                            <RemoteImage url={metaData.image} width={width - 48} height={(width - 48) / 2} />
                            <View style={{ paddingHorizontal:12, paddingVertical:8 }}>
                                <Spacer space={10} />
                                <Typography fontSize={20} color={'black'}>{metaData.title}</Typography>
                                <Spacer space={4}/>
                                <Typography fontSize={16} color={'gray'}>{metaData.description}</Typography>
                            </View>
                        </View>
                    </>
                )}
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