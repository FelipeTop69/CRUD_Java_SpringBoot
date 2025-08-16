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
import ModalDetails from '../../../components/Base/ModalDetails';
import RegisterList from '../../../components/Base/RegisterList';
import EmptyList from '../../../components/EmptyList';
import { globalStyles } from '../../../styles/global';
import { colors } from '../../../themes';
import { DrawerParamList } from '../../../types/navigation';
import { images } from '../../../utils/assetsMap';
import { EventSponsorService } from '../../../api/Entities/eventsponsorService';
import { EventSponsorResponse } from '../../../types/Entities/eventsponsor';

export default function EventSponsorScreen() {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const [eventSponsors, setEventSponsors] = useState<EventSponsorResponse[]>([]);
    const [viewItem, setViewItem] = useState<EventSponsorResponse | null>(null);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const data = await EventSponsorService.getAll();
                    setEventSponsors(data);
                } catch (error) {
                    console.error("Error al cargar EventSponsor:", error);
                }
            };
            fetchData();
        }, [])
    );

    const handleEdit = (item: EventSponsorResponse) => {
        navigation.navigate('EventSponsorUpdate', { id: Number(item.id) });
    };

    const handleDelete = async (item: EventSponsorResponse) => {
        try {
            await EventSponsorService.delete(Number(item.id));
            setEventSponsors(prev => prev.filter(pe => pe.id !== item.id));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'Error al eliminar EventSponsor');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };

    const handleView = (item: EventSponsorResponse) => {
        Haptics.selectionAsync();
        setViewItem(item);
    };

    const handleClose = () => {
        setViewItem(null);
    };

    // Función para generar el texto a mostrar en cada item
    const getEventSponsorDisplayText = (item: EventSponsorResponse) => {
        return `${item.eventName} → ${item.sponsorName}`;
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
                            Patrocinio
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('EventSponsorCreate');
                                Haptics.selectionAsync();
                            }}
                            className="p-2 bg-blue-500 rounded-full"
                        >
                            <PlusIcon size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Lista */}
                    <View className="mt-3 max-h-[430px]">
                        <FlatList
                            data={eventSponsors}
                            ListEmptyComponent={<EmptyList message="No hay patrocinios registrados" />}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            className="mx-1"
                            renderItem={({ item, index }) => (
                                <RegisterList
                                    item={item}
                                    index={index}
                                    displayText={getEventSponsorDisplayText}
                                    deleteMessage={(item) => 
                                        `¿Eliminar patrocinio de ${item.eventName} con ${item.sponsorName}?`
                                    }
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
                    { key: 'eventName', label: 'Evento' },
                    { key: 'sponsorName', label: 'Patrocinador' },
                ]}
                options={{ type: 'slide', from: 'bottom' }}
                duration={500}
                onClose={handleClose}
            />
        </SafeAreaView>
    );
}