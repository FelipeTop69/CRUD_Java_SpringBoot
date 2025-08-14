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
import { TyTicketService } from '../../../api/Entities/tyTicketService';
import BackButton from '../../../components/Base/BackButton';
import TyTicketForm from '../../../components/Base/forms/TyTicketForm';
import { colors } from '../../../themes';
import { TyTicket } from '../../../types/Entities/tyTicket';
import { DrawerParamList } from '../../../types/navigation';

type TyTicketUpdateRouteProp = RouteProp<DrawerParamList, 'TyTicketUpdate'>;

export default function TyTicketUpdate() {
    const route = useRoute<TyTicketUpdateRouteProp>();
    const { id } = route.params;

    const [tyTicket, setTyTicket] = useState<TyTicket | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTyTicket = async () => {
            try {
                const data = await TyTicketService.getById(id);
                setTyTicket(data);
            } catch (error) {
                console.error('Error al cargar la tyTicket:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTyTicket();
    }, [id]);

    const handleUpdate = async (data: TyTicket) => {
        await TyTicketService.update(data);
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
                                    <BackButton to='TyTicket'/>
                                </View>
                                <Text className={`${colors.heading} text-2xl font-bold text-center flex-1`}>
                                    Editar Tipo de Entrada
                                </Text>
                                <View className="w-8 h-8" />
                            </View>

                            {/* Imagen */}
                            <View className="flex-row justify-center">
                                <Image
                                    className="h-64 w-64 rounded-2xl"
                                    resizeMode="cover"
                                    source={require('../../../../assets/img/ejemplo/4.png')}
                                />
                            </View>

                            {/* Formulario o Cargando */}
                            {loading ? (
                                <View className="flex-1 justify-center items-center mt-10">
                                    <ActivityIndicator size="large" color="#3B82F6" />
                                </View>
                            ) : tyTicket ? (
                                <TyTicketForm
                                    initialData={tyTicket}
                                    onSubmit={handleUpdate}
                                    submitLabel="Actualizar Categoría"
                                />
                            ) : (
                                <Text className="text-center text-red-500 mt-10">
                                    No se pudo cargar el tipo de ticket.
                                </Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}