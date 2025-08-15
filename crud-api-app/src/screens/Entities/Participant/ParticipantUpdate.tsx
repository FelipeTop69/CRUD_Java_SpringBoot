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
import { ParticipantService } from '../../../api/Entities/participantService';
import BackButton from '../../../components/Base/BackButton';
import ParticipantForm from '../../../components/Base/forms/ParticipantForm';
import { colors } from '../../../themes';
import { Participant } from '../../../types/Entities/participant';
import { DrawerParamList } from '../../../types/navigation';
import { images } from '../../../utils/assetsMap';

type ParticipantUpdateRouteProp = RouteProp<DrawerParamList, 'ParticipantUpdate'>;

export default function ParticipantUpdate() {
    const route = useRoute<ParticipantUpdateRouteProp>();
    const { id } = route.params;

    const [participant, setParticipant] = useState<Participant | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParticipant = async () => {
            try {
                const data = await ParticipantService.getById(id);
                setParticipant(data);
            } catch (error) {
                console.error('Error al cargar la participant:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipant();
    }, [id]);

    const handleUpdate = async (data: Participant) => {
        await ParticipantService.update(data);
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
                                    <BackButton to='Participant'/>
                                </View>
                                <Text className={`${colors.heading} text-2xl font-bold text-center flex-1`}>
                                    Editar Participante
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
                                    <ActivityIndicator size="large" color="#3B82F6" />
                                </View>
                            ) : participant ? (
                                <ParticipantForm
                                    initialData={participant}
                                    onSubmit={handleUpdate}
                                    submitLabel="Actualizar Participante"
                                />
                            ) : (
                                <Text className="text-center text-red-500 mt-10">
                                    No se pudo cargar el participante.
                                </Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}