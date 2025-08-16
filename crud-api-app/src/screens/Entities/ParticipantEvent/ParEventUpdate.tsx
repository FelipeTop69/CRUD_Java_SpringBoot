import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/Base/BackButton';
import { colors } from '../../../themes';
import { ParticipantEvent, ParticipantEventResponse } from '../../../types/Entities/participantEvent';
import { DrawerParamList } from '../../../types/navigation';
import { images } from '../../../utils/assetsMap';
import { ParticipantEventService } from '../../../api/Entities/participanteventService';
import ParEventForm from '../../../components/Base/forms/ParEventForm';

type ParticipantEventUpdateRouteProp = RouteProp<DrawerParamList, 'ParticipantEventUpdate'>;

export default function ParticipantEventUpdate() {
    const route = useRoute<ParticipantEventUpdateRouteProp>();
    const { id } = route.params;

    const [participantEvent, setParticipantEvent] = useState<ParticipantEventResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParticipantEvent = async () => {
            try {
                const data = await ParticipantEventService.getById(id);
                setParticipantEvent(data);
            } catch (error) {
                console.error('Error al cargar el participantEvento:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipantEvent();
    }, [id]);

    const handleUpdate = async (data: ParticipantEvent) => {
        await ParticipantEventService.update(data);
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['left', 'right', 'bottom']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View className="flex justify-between h-full mx-4 pt-4 pb-6">
                        {/* Encabezado */}
                        <View className="space-y-6">
                            <View className="flex-row items-center justify-between mb-2">
                                <View className="w-8 h-8 items-center justify-center">
                                    <BackButton to='ParticipantEvent'/>
                                </View>
                                <Text className={`${colors.heading} text-2xl font-bold text-center flex-1`}>
                                    Editar Participación
                                </Text>
                                <View className="w-8 h-8" />
                            </View>

                            {/* Imagen */}
                            <View className="flex-row justify-center">
                                <Image
                                    className="h-64 w-64 rounded-2xl"
                                    resizeMode="cover"
                                    source={images.actions_screen}
                                />
                            </View>

                            {/* Formulario o Cargando */}
                            {loading ? (
                                <View className="flex-1 justify-center items-center mt-10">
                                    <ActivityIndicator size="large" color={colors.button} />
                                </View>
                            ) : participantEvent ? (
                                <ParEventForm
                                    initialData={participantEvent}
                                    onSubmit={handleUpdate}
                                    submitLabel="Actualizar Participación"
                                />
                            ) : (
                                <Text className="text-center text-red-500 mt-10">
                                    No se pudo cargar la Participación.
                                </Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}