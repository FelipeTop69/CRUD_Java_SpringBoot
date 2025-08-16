import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CountRegistersService } from '../api/countRegisterServices';
import { AdminService } from '../api/adminDbService';
import EmptyList from '../components/EmptyList';
import EntidadCard from '../components/EntityCard';
import { colors } from '../themes';
import { Entidad } from '../types/entity';
import { images } from '../utils/assetsMap';
import { globalStyles } from '../styles/global';

export default function HomeScreen() {
    const [entidades, setEntidades] = useState<Entidad[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // Nuevo estado para el refresco

    // Función para cargar los datos
    const fetchCounts = useCallback(async () => {
        try {
            setLoading(prev => !refreshing && prev); // Mantener loading solo si no es un refresh
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
                },
                {
                    id: 5,
                    nombre: 'Organizadores',
                    registros: counts.organizers,
                    image: images.organizer_home,
                    navigate: 'organizernav'
                },
                {
                    id: 6,
                    nombre: 'Participantes',
                    registros: counts.participants,
                    image: images.participant_home,
                    navigate: 'participantnav'
                },
                {
                    id: 7,
                    nombre: 'Eventos',
                    registros: counts.events,
                    image: images.event_home,
                    navigate: 'eventnav'
                },
                {
                    id: 8,
                    nombre: 'Entradas',
                    registros: counts.tickets,
                    image: images.ticket_home,
                    navigate: 'ticketnav'
                },
                {
                    id: 9,
                    nombre: 'EventoPatrocinadores',
                    registros: counts.eventSponsors,
                    image: images.pivote_home,
                    navigate: 'eventsponsornav'
                },
                {
                    id: 10,
                    nombre: 'ParticipantesEventos',
                    registros: counts.participantEvents,
                    image: images.pivote_home,
                    navigate: 'participanteventsnav'
                }
            ];

            setEntidades(dynamicEntities);
        } catch (error) {
            console.error('Error loading counts:', error);
            Alert.alert('Error', 'No se pudieron cargar los conteos');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [refreshing]);

    // Recargar los datos manualmente
    const reloadData = useCallback(() => {
        setRefreshing(true);
        fetchCounts();
    }, [fetchCounts]);

    // Mostrar alerta de confirmación
    const showConfirmDialog = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        Alert.alert(
            'Confirmar',
            '¿Estás seguro de que deseas eliminar todos los registros?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                    onPress: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
                },
                {
                    text: 'Confirmar',
                    style: 'destructive',
                    onPress: () => {
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        handleKillConnections();
                    }
                }
            ],
            { cancelable: true }
        );
    };

    // Ejecutar la acción de eliminar conexiones
    const handleKillConnections = () => {
        AdminService.killAllConnections()
            .then(() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                Alert.alert(
                    'Éxito',
                    'Todos los registros han sido borrados',
                    [{
                        text: 'OK',
                        onPress: reloadData // Recargar los datos al presionar OK
                    }]
                );
            })
            .catch(error => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                Alert.alert(
                    'Error',
                    error.message || 'Error al borrar los registros',
                    [{ text: 'OK' }]
                );
            });
    };

    // Cargar datos al enfocar la pantalla
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
            <View className='flex-row justify-between items-center mx-4 mb-4'>
                <View className='flex-row justify-center items-center bg-blue-200 rounded-xl flex-1'>
                    <Image source={require('../../assets/img/movil/home.png')} className='w-52 h-52' />
                </View>
            </View>

            <View className='flex-row justify-center items-center mx-4 mb-4'>
                {/* Botón de acción con feedback háptico */}
                <TouchableOpacity
                    onPress={showConfirmDialog}
                    className="bg-red-500 p-3 rounded-full ml-2"
                    activeOpacity={0.7}
                >
                    <Ionicons name="trash" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View className='px-4'>
                <View className='flex-row justify-center items-center'>
                    <Text className={`${colors.heading} text-[26px] font-black uppercase italic tracking-[2px]`}>
                        entidades
                    </Text>
                </View>
                <View className='mt-3 h-[520px]' style={globalStyles.border}>
                    <FlatList
                        data={entidades}
                        numColumns={2}
                        ListEmptyComponent={<EmptyList message={"No Hay Entidades"} />}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        refreshing={refreshing}
                        onRefresh={reloadData} // Permitir pull-to-refresh
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