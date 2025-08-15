import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { colors } from '../../../themes';
import { Organizer } from '../../../types/Entities/organizer';
import { DrawerParamList } from '../../../types/navigation';
import { commonValidations, validateForm } from '../../../utils/validationsForm';
import { FieldValidationConfig } from '../../../utils/validationsType';

type Props = {
    initialData?: Organizer;
    onSubmit: (data: Organizer) => Promise<void>;
    submitLabel?: string;
};

// Configuracion para validaciones
const validationConfig: FieldValidationConfig = {
    name: [
        commonValidations.required('El nombre es obligatorio'),
        commonValidations.minLength(3, 'Mínimo 3 caracteres')
    ],
    phone: [
        commonValidations.required('El teléfono es obligatorio'),
        commonValidations.exactLength(10, 'Debe tener 10 dígitos'),
        commonValidations.numeric('Solo números permitidos')
    ]
};

export default function OrganizerForm({ initialData, onSubmit, submitLabel = 'Guardar' }: Props) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        phone: initialData?.phone || ''
    });
    
    const [errors, setErrors] = useState<Record<string, string | null>>({
        name: null,
        phone: null
    });
    
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(true);
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    const handleChange = (field: keyof typeof formData) => (value: string) => {
        // Filtro solo numeros para el telefono
        const processedValue = field === 'phone' 
            ? value.replace(/[^0-9]/g, '').slice(0, 10) 
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
                ...formData 
            });
            showSuccess('¡Operación exitosa!');
            if (!initialData) {
                setFormData({ name: '', phone: '' });
                setErrors({ name: null, phone: null });
            }
        } catch (error) {
            showError(
                error instanceof Error ? error.message : 'Error al procesar Organizer'
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
                    placeholder="Nombre del organizador"
                    placeholderTextColor="#999"
                    className={`p-4 bg-white border rounded-full text-base ${
                        errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                />
                {errors.name && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.name}</Text>
                )}
            </View>

            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Teléfono</Text>
                <TextInput
                    value={formData.phone}
                    onChangeText={handleChange('phone')}
                    placeholder="Teléfono (10 dígitos)"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    className={`p-4 bg-white border rounded-full text-base ${
                        errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    maxLength={10}
                />
                {errors.phone && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.phone}</Text>
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
                        navigation.navigate('Organizer');
                    }
                }}
            />
        </View>
    );
}