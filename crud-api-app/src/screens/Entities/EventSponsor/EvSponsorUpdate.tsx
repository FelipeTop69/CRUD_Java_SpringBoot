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
import { DrawerParamList } from '../../../types/navigation';
import { images } from '../../../utils/assetsMap';
import ParEventForm from '../../../components/Base/forms/ParEventForm';
import { EventSponsorService } from '../../../api/Entities/eventsponsorService';
import { EventSponsorResponse, EventSponsor } from '../../../types/Entities/eventsponsor';
import EvnSponsorForm from '../../../components/Base/forms/EvnSponsorForm';

type EventSponsorUpdateRouteProp = RouteProp<DrawerParamList, 'EventSponsorUpdate'>;

export default function EventSponsorUpdate() {
    const route = useRoute<EventSponsorUpdateRouteProp>();
    const { id } = route.params;

    const [eventSponsor, setEventSponsor] = useState<EventSponsorResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventSponsor = async () => {
            try {
                const data = await EventSponsorService.getById(id);
                setEventSponsor(data);
            } catch (error) {
                console.error('Error al cargar el EventSponsor:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventSponsor();
    }, [id]);

    const handleUpdate = async (data: EventSponsor) => {
        await EventSponsorService.update(data);
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
                                    <BackButton to='EventSponsor'/>
                                </View>
                                <Text className={`${colors.heading} text-2xl font-bold text-center flex-1`}>
                                    Editar Patrocinio
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
                            ) : eventSponsor ? (
                                <EvnSponsorForm
                                    initialData={eventSponsor}
                                    onSubmit={handleUpdate}
                                    submitLabel="Actualizar Patrocinio"
                                />
                            ) : (
                                <Text className="text-center text-red-500 mt-10">
                                    No se pudo cargar el Patrocnio.
                                </Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}