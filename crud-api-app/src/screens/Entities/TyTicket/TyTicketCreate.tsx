import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TyTicketService } from '../../../api/Entities/tyTicketService';
import BackButton from '../../../components/Base/BackButton';
import TyTicketForm from '../../../components/Base/forms/TyTicketForm';
import { colors } from '../../../themes';
import { TyTicket } from '../../../types/Entities/tyTicket';
import { images } from '../../../utils/assetsMap';

export default function TyTicketCreate() {
    const handleCreate = async (data: TyTicket) => {
        await TyTicketService.create(data);
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
                                    <BackButton to='TyTicket' />
                                </View>
                                <Text className={`${colors.heading} text-2xl font-bold text-center flex-1`}>
                                    Agregar Tipo de Entrada
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

                            {/* Formulario */}
                            <TyTicketForm onSubmit={handleCreate} submitLabel="Crear Tipo de Entrada" />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}