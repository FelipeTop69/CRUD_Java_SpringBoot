import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { colors } from '../../../themes';
import { Category } from '../../../types/Entities/category';
import { DrawerParamList } from '../../../types/navigation';

type Props = {
    initialData?: Category;
    onSubmit: (data: Category) => Promise<void>;
    submitLabel?: string;
};

export default function CategoryForm({ initialData, onSubmit, submitLabel = 'Guardar' }: Props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(true);
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description);
        }
    }, [initialData]);

    const handleSubmit = async () => {
        if (!name.trim()) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setAlertMessage('El nombre de la categoría es obligatorio.');
            setAlertSuccess(false);
            setAlertVisible(true);
            return;
        }

        try {
            await onSubmit({ id: initialData?.id ?? 0, name, description });
            setAlertMessage('¡Operación exitosa!');
            setAlertSuccess(true);
            setAlertVisible(true);
            if (!initialData) {
                setName('');
                setDescription('');
            }
        } catch (error) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setAlertMessage(
                error instanceof Error ? error.message : 'Error al crear la categoría'
            );
            setAlertSuccess(false);
            setAlertVisible(true);
        }
    };


    return (
        <View className="space-y-4 mx-2">
            <View className='mb-6'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Nombre</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Nombre de la categoría"
                    placeholderTextColor="#999"
                    className="p-4 bg-white border border-gray-300 focus:border-blue-500 rounded-full text-base"
                    returnKeyType="next"
                />
            </View>

            <View className='mb-6'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Descripción</Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Descripción opcional"
                    placeholderTextColor="#999"
                    className="p-4 bg-white border border-gray-300 focus:border-blue-500 rounded-full text-base"
                    returnKeyType="done"
                    multiline
                />
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSubmit}
                style={{ backgroundColor: colors.button }}
                className="mt-8 rounded-full p-4 shadow-md"
            >
                <Text className="text-center text-white text-lg font-semibold">
                    {submitLabel}
                </Text>
            </TouchableOpacity>

            <AwesomeAlert
                show={alertVisible}
                showProgress={false}
                title={alertSuccess ? 'Éxito' : 'Error'}
                message={alertMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor={alertSuccess ? '#4CAF50' : '#F44336'}
                onConfirmPressed={() => {
                    setAlertVisible(false);
                    if (alertSuccess) {
                        navigation.navigate('Category');
                    }
                }}

            />
        </View>
    );
}