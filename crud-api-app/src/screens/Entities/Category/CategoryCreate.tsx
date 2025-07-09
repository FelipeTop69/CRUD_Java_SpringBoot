import React from 'react';
import { Image, Text, View, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/Base/BackButton';
import { colors } from '../../../themes';
import { CategoryService } from '../../../api/Entities/categoryService';
import { Category } from '../../../types/Entities/category';
import CategoryForm from '../../../components/Base/forms/CategoryForm';

export default function CategoryCreate() {
    const handleCreate = async (data: Category) => {
        await CategoryService.create(data);
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
                                    <BackButton to='Category' />
                                </View>
                                <Text className={`${colors.heading} text-2xl font-bold text-center flex-1`}>
                                    Agregar Categoría
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

                            {/* Formulario */}
                            <CategoryForm onSubmit={handleCreate} submitLabel="Crear Categoría" />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}