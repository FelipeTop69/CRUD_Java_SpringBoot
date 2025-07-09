import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegisterList from '../../../components/Base/RegisterList';
import EmptyList from '../../../components/EmptyList';
import { colors } from '../../../themes';
import { Category } from '../../../types/Entities/category';
import { DrawerParamList } from '../../../types/navigation';
import { DrawerNavigationProp } from '@react-navigation/drawer';



const entidad: Category[] = [
    {
        id: 1,
        nombre: 'Categorias',
        image: require('../../../../assets/img/ejemplo/1.png'),
    },
    {
        id: 2,
        nombre: 'Eventos',
        image: require('../../../../assets/img/ejemplo/2.png'),
    },
    {
        id: 3,
        nombre: 'Sponsors',
        image: require('../../../../assets/img/ejemplo/3.png'),
    },
    {
        id: 4,
        nombre: 'Ubicaciones',
        image: require('../../../../assets/img/ejemplo/4.png'),
    },
    {
        id: 5,
        nombre: 'Otro',
        image: require('../../../../assets/img/ejemplo/5.png'),
    },
    {
        id: 6,
        nombre: 'Otro X2',
        image: require('../../../../assets/img/ejemplo/6.png'),
    },
];

export default function CategoryScreen() {

    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    return (
        <SafeAreaView className='flex-1' edges={['left', 'right', 'bottom', 'top']}>
            <View className='px-4'>
                <View className='flex-row justify-center items-center rounded-xl mb-4' >
                    <Image source={require('../../../../assets/img/ejemplo/7.png')} className='w-80 h-80' />
                </View>
                <View className='px-4'>
                    <View className='flex-row justify-between items-center'>
                        <Text className={`${colors.heading} text-xl font-black  uppercase italic tracking-[2px]`} >categorías</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('CategoryCreate')}
                            className='p-2 px-3 bg-white border border-gray-200 rounded-full'
                        >
                            <Text className={`${colors.heading} text-lg`}>Categoría</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='mt-3 h-[500px]'>
                        <FlatList
                            data={entidad}
                            ListEmptyComponent={<EmptyList message={"No Hay Categorias"} />}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            className='mx-1'
                            renderItem={({ item, index }) => (
                                <RegisterList item={item} index={index} />
                            )}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}