import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { colors } from '../../../themes';
import { Location } from '../../../types/Entities/location';
import { DrawerParamList } from '../../../types/navigation';
import { commonValidations, validateForm } from '../../../utils/validationsForm';
import { FieldValidationConfig } from '../../../utils/validationsType';


type Props = {
    initialData?: Location;
    onSubmit: (data: Location) => Promise<void>;
    submitLabel?: string;
};

// Configuración para validaciones
const validationConfig: FieldValidationConfig = {
    name: [
        commonValidations.required('El nombre es obligatorio'),
        commonValidations.minLength(3, 'Mínimo 3 caracteres')
    ],
    address: [
        commonValidations.required('La dirección es obligatoria'),
        commonValidations.minLength(5, 'Debe tener mínimo 5 caracteres'),
    ],
    capacity: [
        commonValidations.required('La capacidad es obligatoria'),
        commonValidations.numeric('Solo números permitidos'),
        {
            condition: (value) => {
                const num = typeof value === 'string' ? parseInt(value) : Number(value);
                return num >= 10;
            },
            message: 'Capacidad mínima 10 participantes'
        },
        {
            condition: (value) => {
                const num = typeof value === 'string' ? parseInt(value) : Number(value);
                return num <= 1000;
            },
            message: 'Capacidad máxima 1000 participantes'
        }
    ]
};

export default function LocationForm({ initialData, onSubmit, submitLabel = 'Guardar' }: Props) {
    // Convertimos el número capacity a string para el formulario
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        address: initialData?.address || '',
        capacity: initialData?.capacity?.toString() || ''
    });

    const [errors, setErrors] = useState<Record<string, string | null>>({
        name: null,
        address: null,
        capacity: null
    });

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(true);
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    const handleChange = (field: keyof typeof formData) => (value: string) => {
        // Filtro solo números para la capacidad
        const processedValue = field === 'capacity'
            ? value.replace(/[^0-9]/g, '')
            : value;

        setFormData(prev => ({ ...prev, [field]: processedValue }));
    };

    const handleSubmit = async () => {
        // Validar todos los campos
        const formErrors = validateForm(formData, validationConfig);
        setErrors(formErrors);

        // Verificar si hay errores
        const hasErrors = Object.values(formErrors).some(error => error !== null);
        if (hasErrors) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }

        try {
            await onSubmit({
                id: initialData?.id ?? 0,
                name: formData.name,
                address: formData.address,
                capacity: parseInt(formData.capacity) // Convertimos a número
            });
            showSuccess(`Ubicación ${initialData ? 'actualizada' : 'creada'} para ${formData.capacity} participantes`);
            if (!initialData) {
                setFormData({ name: '', address: '', capacity: '' });
                setErrors({ name: null, address: null, capacity: null });
            }
        } catch (error) {
            showError(
                error instanceof Error ? error.message : 'Error al procesar la ubicación'
            );
        }
    };

    const showError = (message: string) => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setAlertMessage(message);
        setAlertSuccess(false);
        setAlertVisible(true);
    };

    const showSuccess = (message: string) => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setAlertMessage(message);
        setAlertSuccess(true);
        setAlertVisible(true);
    };

    return (
        <View className="space-y-4 mx-2">
            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Nombre</Text>
                <TextInput
                    value={formData.name}
                    onChangeText={handleChange('name')}
                    placeholder="Nombre de la ubicación"
                    placeholderTextColor="#999"
                    className={`p-4 bg-white border rounded-full text-base ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                />
                {errors.name && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.name}</Text>
                )}
            </View>

            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Dirección</Text>
                <TextInput
                    value={formData.address}
                    onChangeText={handleChange('address')}
                    placeholder="Dirección completa"
                    placeholderTextColor="#999"
                    className={`p-4 bg-white border rounded-full text-base ${errors.address ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                />
                {errors.address && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.address}</Text>
                )}
            </View>

            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Capacidad</Text>
                <View className="flex-row items-center">
                    <TextInput
                        value={formData.capacity}
                        onChangeText={handleChange('capacity')}
                        placeholder="Ej: 100"
                        placeholderTextColor="#999"
                        keyboardType="number-pad"
                        className={`flex-1 p-4 bg-white border rounded-l-full text-base ${errors.capacity ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                    />
                    <View className={`px-4 py-4 bg-gray-100 rounded-r-full ${errors.capacity ? 'border-r border-t border-b border-red-500' : 'border-r border-t border-b border-gray-300'
                        }`}>
                        <Ionicons name="people" size={20} color="#2160ddff" />
                    </View>
                </View>
                {errors.capacity && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.capacity}</Text>
                )}
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
                        navigation.navigate('Location');
                    }
                }}
            />
        </View>
    );
}