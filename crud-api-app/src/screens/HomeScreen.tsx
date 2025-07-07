import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../themes';
import EntidadCard from '../components/EntityCard';
import EmptyList from '../components/EmptyList';
import { Entidad } from '../types/entity';



const entidades: Entidad[] = [
    {
        id: 1,
        nombre: 'Categorias',
        registros: 0,
        image: require('../../assets/img/ejemplo/1.png'),
    },
    {
        id: 2,
        nombre: 'Eventos',
        registros: 0,
        image: require('../../assets/img/ejemplo/2.png'),
    },
    {
        id: 3,
        nombre: 'Sponsors',
        registros: 0,
        image: require('../../assets/img/ejemplo/3.png'),
    },
    {
        id: 4,
        nombre: 'Ubicaciones',
        registros: 0,
        image: require('../../assets/img/ejemplo/4.png'),
    },
    {
        id: 5,
        nombre: 'Otro',
        registros: 0,
        image: require('../../assets/img/ejemplo/5.png'),
    },
    {
        id: 6,
        nombre: 'Otro X2',
        registros: 0,
        image: require('../../assets/img/ejemplo/6.png'),
    },
];



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
                <View className='mt-3 h-[550px]'>
                    <FlatList
                        data={entidades}
                        numColumns={2}
                        ListEmptyComponent={<EmptyList message={"No Hay Entidades"} />}
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