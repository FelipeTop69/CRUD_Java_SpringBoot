import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    View,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { DrawerParamList } from '../../../types/navigation';
import { Category } from '../../../types/Entities/category';
import { CategoryService } from '../../../api/Entities/categoryService';
import BackButton from '../../../components/Base/BackButton';
import { colors } from '../../../themes';
import CategoryForm from '../../../components/Base/forms/CategoryForm';

type CategoryUpdateRouteProp = RouteProp<DrawerParamList, 'CategoryUpdate'>;

export default function CategoryUpdate() {
    const route = useRoute<CategoryUpdateRouteProp>();
    const { id } = route.params;

    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await CategoryService.getById(id);
                setCategory(data);
            } catch (error) {
                console.error('Error al cargar la categoría:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    const handleUpdate = async (data: Category) => {
        await CategoryService.update(data);
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
                                    <BackButton to='Category'/>
                                </View>
                                <Text className={`${colors.heading} text-2xl font-bold text-center flex-1`}>
                                    Editar Categoría
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
                            ) : category ? (
                                <CategoryForm
                                    initialData={category}
                                    onSubmit={handleUpdate}
                                    submitLabel="Actualizar Categoría"
                                />
                            ) : (
                                <Text className="text-center text-red-500 mt-10">
                                    No se pudo cargar la categoría.
                                </Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}