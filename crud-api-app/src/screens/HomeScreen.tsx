import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyList from '../components/EmptyList';
import EntidadCard from '../components/EntityCard';
import { colors } from '../themes';
import { Entidad } from '../types/entity';
import { images } from '../utils/assetsMap';
import { CountRegistersService } from '../api/countRegisterServices';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
    const [entidades, setEntidades] = useState<Entidad[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCounts = useCallback(async () => {
        try {
            setLoading(true);
            const counts = await CountRegistersService.getCounts();

            const dynamicEntities: Entidad[] = [
                {
                    id: 1,
                    nombre: 'Categorías',
                    registros: counts.categories,
                    image: images.category_home,
                    navigate: 'categorynav'
                },
                {
                    id: 2,
                    nombre: 'Tipos de Entradas',
                    registros: counts.tyTickets,
                    image: images.tyTicket_home,
                    navigate: 'tyticketnav'
                },
                {
                    id: 3,
                    nombre: 'Patrocinadores',
                    registros: counts.sponsors,
                    image: images.sponsor_home,
                    navigate: 'sponsornav'
                },
                {
                    id: 4,
                    nombre: 'Ubicaciones',
                    registros: counts.locations,
                    image: images.location_home,
                    navigate: 'locationnav'
                }
            ];

            setEntidades(dynamicEntities);
        } catch (error) {
            console.error('Error loading counts:', error);
        } finally {
            setLoading(false);
        }
    }, []);


    // Esto se ejecuta cada vez que la pantalla recibe foco
    useFocusEffect(
        useCallback(() => {
            fetchCounts();
        }, [fetchCounts])
    );

    if (loading) {
        return <ActivityIndicator size="large" color={colors.button} />;
    }

    return (
        <SafeAreaView className='flex-1' edges={['left', 'right', 'bottom', 'top']}>
            <View className='flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4'>
                <Image source={require('../../assets/img/movil/home.png')} className='w-60 h-60' />
            </View>
            <View className='px-4'>
                <View className='flex-row justify-center items-center'>
                    <Text className={`${colors.heading} text-[26px] font-black uppercase italic tracking-[2px]`}>
                        entidades
                    </Text>
                </View>
                <View className='mt-3 h-[550px]'>
                    <FlatList
                        data={entidades}
                        numColumns={2}
                        ListEmptyComponent={<EmptyList message={"No Hay Entidades"} />}
                        keyExtractor={item => item.id.toString()}
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