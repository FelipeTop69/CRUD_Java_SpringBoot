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
import { EventService } from '../../../api/Entities/eventService';
import BackButton from '../../../components/Base/BackButton';
import EventForm from '../../../components/Base/forms/EventForm';
import { colors } from '../../../themes';
import { Event } from '../../../types/Entities/event';
import { DrawerParamList } from '../../../types/navigation';
import { images } from '../../../utils/assetsMap';

type EventUpdateRouteProp = RouteProp<DrawerParamList, 'EventUpdate'>;

export default function EventUpdate() {
    const route = useRoute<EventUpdateRouteProp>();
    const { id } = route.params;

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await EventService.getById(id);
                setEvent(data);
            } catch (error) {
                console.error('Error al cargar el evento:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleUpdate = async (data: Event) => {
        await EventService.update(data);
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
                                    <BackButton to='Event'/>
                                </View>
                                <Text className={`${colors.heading} text-2xl font-bold text-center flex-1`}>
                                    Editar Evento
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
                            ) : event ? (
                                <EventForm
                                    initialData={event}
                                    onSubmit={handleUpdate}
                                    submitLabel="Actualizar Evento"
                                />
                            ) : (
                                <Text className="text-center text-red-500 mt-10">
                                    No se pudo cargar el evento.
                                </Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}