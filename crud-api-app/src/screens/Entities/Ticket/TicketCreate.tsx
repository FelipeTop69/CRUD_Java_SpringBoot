import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TicketService } from '../../../api/Entities/ticketService';
import BackButton from '../../../components/Base/BackButton';
import { colors } from '../../../themes';
import { images } from '../../../utils/assetsMap';
import TicketForm from '../../../components/Base/forms/TicketForm';

export default function TicketCreate() {
    const handleCreate = async (data: any) => {
        console.log(data)
        await TicketService.create(data);
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
                                    <BackButton to='Ticket' />
                                </View>
                                <Text className={`${colors.heading} text-2xl font-bold text-center flex-1`}>
                                    Agregar Entrada
                                </Text>
                                <View className="w-8 h-8" />
                            </View>

                            {/* Imagen */}
                            <View className="flex-row justify-center">
                                <Image
                                    className="h-64 w-64"
                                    resizeMode="cover"
                                    source={images.actions_screen}
                                />
                            </View>

                            {/* Formulario */}
                            <TicketForm 
                                onSubmit={handleCreate} 
                                submitLabel="Crear Entrada" 
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}