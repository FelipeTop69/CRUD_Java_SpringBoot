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
import { TicketService } from '../../../api/Entities/ticketService';
import BackButton from '../../../components/Base/BackButton';
import TicketForm from '../../../components/Base/forms/TicketForm';
import { colors } from '../../../themes';
import { Ticket } from '../../../types/Entities/ticket';
import { DrawerParamList } from '../../../types/navigation';
import { images } from '../../../utils/assetsMap';

type TicketUpdateRouteProp = RouteProp<DrawerParamList, 'TicketUpdate'>;

export default function TicketUpdate() {
    const route = useRoute<TicketUpdateRouteProp>();
    const { id } = route.params;

    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const data = await TicketService.getById(id);
                setTicket(data);
            } catch (error) {
                console.error('Error al cargar el ticketo:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id]);

    const handleUpdate = async (data: Ticket) => {
        await TicketService.update(data);
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
                                    <BackButton to='Ticket'/>
                                </View>
                                <Text className={`${colors.heading} text-2xl font-bold text-center flex-1`}>
                                    Editar Entrada
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
                            ) : ticket ? (
                                <TicketForm
                                    initialData={ticket}
                                    onSubmit={handleUpdate}
                                    submitLabel="Actualizar Entrada"
                                />
                            ) : (
                                <Text className="text-center text-red-500 mt-10">
                                    No se pudo cargar la Entrada.
                                </Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}