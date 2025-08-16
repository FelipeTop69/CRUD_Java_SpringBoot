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
import { ParticipantEventService } from '../../../api/Entities/participanteventService';
import ModalDetails from '../../../components/Base/ModalDetails';
import RegisterList from '../../../components/Base/RegisterList';
import EmptyList from '../../../components/EmptyList';
import { globalStyles } from '../../../styles/global';
import { colors } from '../../../themes';
import { ParticipantEventResponse } from '../../../types/Entities/participantEvent';
import { DrawerParamList } from '../../../types/navigation';
import { images } from '../../../utils/assetsMap';

export default function ParticipantEventScreen() {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const [participantEvents, setParticipantEvents] = useState<ParticipantEventResponse[]>([]);
    const [viewItem, setViewItem] = useState<ParticipantEventResponse | null>(null);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const data = await ParticipantEventService.getAll();
                    setParticipantEvents(data);
                } catch (error) {
                    console.error("Error al cargar participantes de eventos:", error);
                }
            };
            fetchData();
        }, [])
    );

    const handleEdit = (item: ParticipantEventResponse) => {
        navigation.navigate('ParticipantEventUpdate', { id: Number(item.id) });
    };

    const handleDelete = async (item: ParticipantEventResponse) => {
        try {
            await ParticipantEventService.delete(Number(item.id));
            setParticipantEvents(prev => prev.filter(pe => pe.id !== item.id));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'Error al eliminar participación');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };

    const handleView = (item: ParticipantEventResponse) => {
        Haptics.selectionAsync();
        setViewItem(item);
    };

    const handleClose = () => {
        setViewItem(null);
    };

    // Función para generar el texto a mostrar en cada item
    const getParticipantEventDisplayText = (item: ParticipantEventResponse) => {
        return `${item.participantName} → ${item.eventName}`;
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
                            Participantes en Eventos
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ParticipantEventCreate');
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
                            data={participantEvents}
                            ListEmptyComponent={<EmptyList message="No hay participaciones registradas" />}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            className="mx-1"
                            renderItem={({ item, index }) => (
                                <RegisterList
                                    item={item}
                                    index={index}
                                    displayText={getParticipantEventDisplayText}
                                    deleteMessage={(item) => 
                                        `¿Eliminar participación de ${item.participantName} en ${item.eventName}?`
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
                    { key: 'participantName', label: 'Participante' },
                    { key: 'eventName', label: 'Evento' },
                ]}
                options={{ type: 'slide', from: 'bottom' }}
                duration={500}
                onClose={handleClose}
            />
        </SafeAreaView>
    );
}