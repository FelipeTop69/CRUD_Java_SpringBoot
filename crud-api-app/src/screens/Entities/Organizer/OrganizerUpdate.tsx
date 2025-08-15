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
import { OrganizerService } from '../../../api/Entities/organizerService';
import BackButton from '../../../components/Base/BackButton';
import OrganizerForm from '../../../components/Base/forms/OrganizerForm';
import { colors } from '../../../themes';
import { Organizer } from '../../../types/Entities/organizer';
import { DrawerParamList } from '../../../types/navigation';
import { images } from '../../../utils/assetsMap';

type OrganizerUpdateRouteProp = RouteProp<DrawerParamList, 'OrganizerUpdate'>;

export default function OrganizerUpdate() {
    const route = useRoute<OrganizerUpdateRouteProp>();
    const { id } = route.params;

    const [organizer, setOrganizer] = useState<Organizer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrganizer = async () => {
            try {
                const data = await OrganizerService.getById(id);
                setOrganizer(data);
            } catch (error) {
                console.error('Error al cargar la organizer:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizer();
    }, [id]);

    const handleUpdate = async (data: Organizer) => {
        await OrganizerService.update(data);
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
                                    <BackButton to='Organizer'/>
                                </View>
                                <Text className={`${colors.heading} text-2xl font-bold text-center flex-1`}>
                                    Editar Organizador
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
                            ) : organizer ? (
                                <OrganizerForm
                                    initialData={organizer}
                                    onSubmit={handleUpdate}
                                    submitLabel="Actualizar Organizador"
                                />
                            ) : (
                                <Text className="text-center text-red-500 mt-10">
                                    No se pudo cargar el organizador.
                                </Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}