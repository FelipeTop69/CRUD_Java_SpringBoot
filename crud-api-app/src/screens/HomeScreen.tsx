import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../themes';
import EntidadCard from '../components/EntidadCard';


const entidades = [
    {
        id: 1,
        name: 'Categorias',
        registros: 0,
        image: require('../../assets/img/ejemplo/1.png'),
    },
    {
        id: 2,
        name: 'Eventos',
        registros: 0,
        image: require('../../assets/img/ejemplo/2.png'),
    },
    {
        id: 3,
        name: 'Sponsors',
        registros: 0,
        image: require('../../assets/img/ejemplo/3.png'),
    },
    {
        id: 4,
        name: 'Ubicaciones',
        registros: 0,
        image: require('../../assets/img/ejemplo/4.png'),
    },
    {
        id: 5,
        name: 'Otro',
        registros: 0,
        image: require('../../assets/img/ejemplo/5.png'),
    },
    {
        id: 6,
        name: 'Otro X2',
        registros: 0,
        image: require('../../assets/img/ejemplo/6.png'),
    },
]

export default function HomeScreen() {
    return (
        <SafeAreaView className='flex-1' edges={['left', 'right', 'bottom', 'top']}>
            <View className='flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4' >
                <Image source={require('../../assets/img/ejemplo/banner.png')} className='w-60 h-60' />
            </View>
            <View className='px-4'>
                <View className='flex-row justify-center items-center'>
                    <Text className={`${colors.heading} text-[26px] font-black  uppercase italic tracking-[2px]`} >entidades</Text>
                </View>
                <View className='mt-3 h-[500px]'>
                    <FlatList
                        data={entidades}
                        numColumns={2}
                        keyExtractor={item=>item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={{
                            justifyContent: 'space-between'
                        }}
                        className='mx-1'
                        renderItem={({ item, index }) => (
                            <EntidadCard item={item} index={index} />
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}