import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { PlusIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventService } from '../../../api/Entities/eventService';
import ModalDetails from '../../../components/Base/ModalDetails';
import RegisterList from '../../../components/Base/RegisterList';
import EmptyList from '../../../components/EmptyList';
import { globalStyles } from '../../../styles/global';
import { colors } from '../../../themes';
import { Event } from '../../../types/Entities/event';
import { DrawerParamList } from '../../../types/navigation';
import { images } from '../../../utils/assetsMap';
import { formatEventDate } from '../../../utils/dateFormatter';

export default function EventScreen() {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const [events, setEvents] = useState<Event[]>([]);
    const [viewItem, setViewItem] = useState<Event | null>(null);


    // Peticiones
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const data = await EventService.getAll();
                    setEvents(data);
                } catch (error) {
                    console.error("Error al cargar event:", error);
                }
            };

            fetchData();
        }, [])
    );


    const handleEdit = (item: Event) => {
        navigation.navigate('EventUpdate', { id: Number(item.id) });
    };

    const handleDelete = async (item: Event) => {
        try {
            await EventService.delete(Number(item.id));
            setEvents(prev => prev.filter(cat => cat.id !== item.id));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'Error al eliminar Event');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };

    const handleView = (item: Event) => {
        Haptics.selectionAsync();
        setViewItem(item);
    };

    const handleClose = () => {
        setViewItem(null);
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['left', 'right', 'bottom']}>
            <View className="flex-1 px-4" style={globalStyles.border}>
                {/* Imagen superior */}
                <View className="flex-row justify-center items-center rounded-xl mb-4">
                    <Image
                        source={images.view_screen}
                        className="w-80 h-80"
                    />
                </View>

                <View className="px-4">
                    {/* Encabezado y botón */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text
                            className={`${colors.heading} text-xl font-black uppercase italic tracking-[2px]`}
                        >
                            eventos
                        </Text>
                        <TouchableOpacity

                            onPress={() => {
                                navigation.navigate('EventCreate')
                                Haptics.selectionAsync();
                            }}
                            className="p-2 bg-blue-500 rounded-full "
                        >
                            <PlusIcon size={24} color="white" />
                        </TouchableOpacity>

                    </View>

                    {/* Lista */}
                    <View className="mt-3 max-h-[430px]">
                        <FlatList
                            data={events}
                            ListEmptyComponent={<EmptyList message="No hay eventos" />}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            className="mx-1"
                            renderItem={({ item, index }) => (
                                <RegisterList
                                    item={item}
                                    index={index}
                                    onView={handleView}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            )}
                        />
                    </View>
                </View>
            </View>

            {/* Modal */}
            <ModalDetails
                visible={viewItem !== null}
                item={viewItem ?? undefined}
                fields={[
                    { key: 'name', label: 'Nombre' },
                    { key: 'description', label: 'Descripción' },
                    {
                        key: 'date',
                        label: 'Fecha y hora',
                        render: (value) => (
                            <Text className="text-base text-gray-800 bg-gray-100 p-2 rounded">
                                {formatEventDate(value).dateTime}
                            </Text>
                        )
                    },
                    { key: 'organizerName', label: 'Organizador' },
                    { key: 'locationName', label: 'Ubicación' },
                    { key: 'categoryName', label: 'Categoría' },
                ]}
                options={{ type: 'slide', from: 'bottom' }}
                duration={500}
                onClose={handleClose}
            />
        </SafeAreaView>
    );
}