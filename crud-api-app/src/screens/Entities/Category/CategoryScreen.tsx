import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Button,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { PlusIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegisterList from '../../../components/Base/RegisterList';
import EmptyList from '../../../components/EmptyList';
import { colors } from '../../../themes';
import { Category } from '../../../types/Entities/category';
import { DrawerParamList } from '../../../types/navigation';
import { globalStyles } from '../../../styles/global';
import ModalDetails from '../../../components/Base/ModalDetails';
import { CategoryService } from '../../../api/Entities/categoryService';

export default function CategoryScreen() {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [viewItem, setViewItem] = useState<Category | null>(null);


    // Peticiones
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const data = await CategoryService.getAll();
                    setCategories(data);
                } catch (error) {
                    console.error("Error al cargar categorías:", error);
                }
            };

            fetchData();
        }, [])
    );


    const handleEdit = (item: Category) => {
        navigation.navigate('CategoryUpdate', {id: Number(item.id)});
    };

    const handleDelete = async (item: Category) => {
        try {
            const response = await CategoryService.delete(Number(item.id));
            setCategories(prev => prev.filter(cat => cat.id !== item.id));
            console.log(response.message || 'Categoría eliminada');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };

    const handleView = (item: Category) => {
        Haptics.selectionAsync();
        setViewItem(item);
    };

    const handleClose = () => {
        setViewItem(null);
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['left', 'right', 'bottom']}>
            <View className="flex-1 px-4" style={globalStyles.border}>
                {/* Imagen superior */}
                <View className="flex-row justify-center items-center rounded-xl mb-4">
                    <Image
                        source={require('../../../../assets/img/ejemplo/7.png')}
                        className="w-80 h-80"
                    />
                </View>

                <View className="px-4">
                    {/* Encabezado y botón */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text
                            className={`${colors.heading} text-xl font-black uppercase italic tracking-[2px]`}
                        >
                            categorías
                        </Text>
                        <TouchableOpacity

                            onPress={() => {
                                navigation.navigate('CategoryCreate')
                                Haptics.selectionAsync();
                            }}
                            className="p-2 bg-blue-500 rounded-full "
                        >
                            <PlusIcon size={24} color="white" />
                        </TouchableOpacity>

                    </View>

                    {/* Lista */}
                    <View className="mt-3 max-h-[430px]">
                        <FlatList
                            data={categories}
                            ListEmptyComponent={<EmptyList message="No hay categorías" />}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            className="mx-1"
                            renderItem={({ item, index }) => (
                                <RegisterList
                                    item={item}
                                    index={index}
                                    onView={handleView}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            )}
                        />
                    </View>
                </View>
            </View>

            {/* Modal */}
            <ModalDetails
                visible={viewItem !== null}
                item={viewItem ?? undefined}
                options={{ type: 'slide', from: 'bottom' }}
                duration={500}
                onClose={handleClose}
            />
        </SafeAreaView>
    );
}