import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import SelectDropdown from 'react-native-select-dropdown';
import { EventService } from '../../../api/Entities/eventService';
import { TyTicketService } from '../../../api/Entities/tyTicketService';
import { colors } from '../../../themes';
import { Event } from '../../../types/Entities/event';
import { Location } from '../../../types/Entities/location';
import { Ticket } from '../../../types/Entities/ticket';
import { TyTicket } from '../../../types/Entities/tyTicket';
import { DrawerParamList } from '../../../types/navigation';
import { commonValidations, validateForm } from '../../../utils/validationsForm';
import { FieldValidationConfig } from '../../../utils/validationsType';

type Props = {
    initialData?: Ticket;
    onSubmit: (data: Ticket) => Promise<void>;
    submitLabel?: string;
};

const validationConfig: FieldValidationConfig = {
    price: [
        commonValidations.required('El precio es obligatorio'),
        commonValidations.positiveNumber('El precio debe ser positivo'),
        commonValidations.minValue(1000, 'El precio mínimo es 1,000'),
        commonValidations.maxValue(1000000, 'El precio máximo es 1,000,000')
    ],
    availableQuantity: [
        commonValidations.required('La cantidad es obligatoria'),
        commonValidations.integer('La cantidad debe ser un número entero'),
        commonValidations.minValue(0, 'La cantidad no puede ser negativa'),
        commonValidations.maxValue(10000, 'La cantida máxima es de 1000')
    ],
    eventId: [commonValidations.required('Seleccione un Evento')],
    typeTicketId: [commonValidations.required('Seleccione un Tipo de Entrada')],
};

export default function TicketForm({ initialData, onSubmit, submitLabel = 'Guardar' }: Props) {
    const [formData, setFormData] = useState({
        price: initialData?.price ?? 0,
        availableQuantity: initialData?.availableQuantity ?? 0,
        eventId: initialData?.eventId ?? 0,
        typeTicketId: initialData?.typeTicketId ?? 0,
        eventName: initialData?.eventName ?? '',
        typeTicketName: initialData?.typeTicketName ?? ''
    });

    const [errors, setErrors] = useState<Record<string, string | null>>({
        price: null,
        availableQuantity: null,
        eventId: null,
        typeTicketId: null
    });

    const [events, setEvents] = useState<Event[]>([]);
    const [tyTicket, setTyTicket] = useState<TyTicket[]>([]);
    const [loading, setLoading] = useState(true);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(true);
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [evn, tyTic] = await Promise.all([
                    EventService.getAll(),
                    TyTicketService.getAll(),
                ]);

                setEvents(evn);
                setTyTicket(tyTic);

                // Solo actualizar formData si hay initialData y los arrays tienen datos
                if (initialData && evn.length > 0 && tyTic.length) {
                    const selectedEvn = evn.find(l => l.id === initialData.eventId);
                    const selectedTyTic = tyTic.find(c => c.id === initialData.typeTicketId);

                    // Actualizar formData con todos los datos del initialData
                    setFormData({
                        price: initialData.price || 0,
                        availableQuantity: initialData.availableQuantity || 0,
                        eventId: initialData.eventId || 0,
                        typeTicketId: initialData.typeTicketId || 0,
                        // Agregar nombres para referencia visual
                        eventName: selectedEvn?.name || '',
                        typeTicketName: selectedTyTic?.name || '',
                    });
                }
            } catch (error) {
                console.error('Error cargando datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [initialData]);

    const formatNumberInput = (value: string, allowDecimals = true) => {
        // Eliminar caracteres no numéricos
        let cleaned = value.replace(/[^0-9.]/g, '');

        // Para campos sin decimales
        if (!allowDecimals) {
            cleaned = cleaned.replace(/\./g, '');
        }

        // Evitar múltiples puntos decimales
        if ((cleaned.match(/\./g) || []).length > 1) {
            cleaned = cleaned.substring(0, cleaned.lastIndexOf('.'));
        }

        return cleaned;
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'COP', 
            minimumFractionDigits: 0
        });
    };

    const handleNumberChange = (field: 'price' | 'availableQuantity') => (value: string) => {
        const allowDecimals = field === 'price';
        const cleanedValue = formatNumberInput(value, allowDecimals);
        const numValue = cleanedValue === '' ? 0 : Number(cleanedValue);

        if (!isNaN(numValue)) {
            setFormData(prev => ({ ...prev, [field]: numValue }));
            if (errors[field]) {
                setErrors(prev => ({ ...prev, [field]: null }));
            }
        }
    };

    const handleSelectChange = (field: keyof typeof formData, id: string | number, name: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: id,
            [`${String(field)}Name`]: name
        }));
        // Limpiar error cuando se selecciona un valor
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleSubmit = async () => {
        // Validar que los selects tengan valores válidos (no 0)
        const validationData = {
            ...formData,
            // Para la validación, convertir 0 a string vacío para que falle la validación required
            eventId: formData.eventId === 0 ? '' : formData.eventId.toString(),
            tyTicketId: formData.typeTicketId === 0 ? '' : formData.typeTicketId.toString(),
        };

        const formErrors = validateForm(validationData, validationConfig);
        setErrors(formErrors);

        if (Object.values(formErrors).some(error => error !== null)) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }

        try {
            await onSubmit({
                id: initialData?.id ?? 0,
                ...formData
            } as Ticket);
            showSuccess('Ticketo guardado exitosamente!');
            if (!initialData) {
                setFormData({
                    price: 0,
                    availableQuantity: 0,
                    eventId: 0,
                    eventName: '',
                    typeTicketId: 0,
                    typeTicketName: ''
                });
            }
        } catch (error) {
            showError(
                error instanceof Error ? error.message : 'Error al guardar el entrada'
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



    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color={colors.button} />
            </View>
        );
    }

    return (
        <View className="space-y-4 mx-2">
            {/* Campo Price */}
            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Precio</Text>
                <TextInput
                    value={formatCurrency(formData.price)}
                    onChangeText={handleNumberChange('price')}
                    placeholder="Precio de la Entrada"
                    placeholderTextColor="#999"
                    keyboardType="numeric" // Teclado numérico con punto decimal
                    className={`p-4 bg-white border rounded-full text-base ${errors.price ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                />
                {errors.price && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.price}</Text>
                )}

            </View>

            {/* Campo availableQuantity */}
            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Cantidad Disponible</Text>
                <TextInput
                    value={formData.availableQuantity.toString()}
                    onChangeText={handleNumberChange('availableQuantity')}
                    placeholder="Cantidad Disponible de Entradas"
                    placeholderTextColor="#999"
                    keyboardType="number-pad" // Teclado numérico sin decimales
                    className={`p-4 bg-white border rounded-full text-base ${errors.availableQuantity ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                />
                {errors.availableQuantity && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.availableQuantity}</Text>
                )}
            </View>

            {/* Select Event */}
            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Evento Asociado</Text>
                <SelectDropdown
                    data={events}
                    defaultValue={formData.eventId !== 0 && events.length > 0 ? events.find(o => o.id === formData.eventId) : undefined}
                    key={`event-${formData.eventId}-${events.length}`}
                    onSelect={(selectedItem: Event) => {
                        handleSelectChange('eventId', selectedItem.id, selectedItem.name);
                    }}
                    renderButton={(selectedItem: Event | undefined) => {
                        return (
                            <View style={[
                                dropdownStyles.button,
                                { borderColor: errors.eventId ? '#EF4444' : '#D1D5DB' }
                            ]}>
                                <Text style={[
                                    dropdownStyles.buttonText,
                                    !selectedItem && { color: '#999' }
                                ]}>
                                    {selectedItem?.name || 'Seleccione Evento'}
                                </Text>
                            </View>
                        );
                    }}
                    renderItem={(item: Event, index: number, isSelected: boolean) => {
                        return (
                            <View style={[
                                dropdownStyles.dropdownItem,
                                isSelected && { backgroundColor: '#E3F2FD' }
                            ]}>
                                <Text style={dropdownStyles.dropdownItemText}>
                                    {item.name}
                                </Text>
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={dropdownStyles.dropdown}
                />
                {errors.eventId && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.eventId}</Text>
                )}
            </View>

            {/* Select TypeTicket */}
            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Tipo de Entrada</Text>
                <SelectDropdown
                    data={tyTicket}
                    defaultValue={formData.typeTicketId !== 0 && tyTicket.length > 0 ? tyTicket.find(l => l.id === formData.typeTicketId) : undefined}
                    key={`location-${formData.typeTicketId}-${tyTicket.length}`}
                    onSelect={(selectedItem: Location) => {
                        handleSelectChange('typeTicketId', selectedItem.id, selectedItem.name);
                    }}
                    renderButton={(selectedItem: Location | undefined) => {
                        return (
                            <View style={[
                                dropdownStyles.button,
                                { borderColor: errors.locationId ? '#EF4444' : '#D1D5DB' }
                            ]}>
                                <Text style={[
                                    dropdownStyles.buttonText,
                                    !selectedItem && { color: '#999' }
                                ]}>
                                    {selectedItem?.name || 'Seleccione Tipo de Entrada'}
                                </Text>
                            </View>
                        );
                    }}
                    renderItem={(item: Location, index: number, isSelected: boolean) => {
                        return (
                            <View style={[
                                dropdownStyles.dropdownItem,
                                isSelected && { backgroundColor: '#E3F2FD' }
                            ]}>
                                <Text style={dropdownStyles.dropdownItemText}>
                                    {item.name}
                                </Text>
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={dropdownStyles.dropdown}
                />
                {errors.locationId && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.locationId}</Text>
                )}
            </View>

            {/* Botón de enviar */}
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

            {/* Alerta */}
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
                        navigation.navigate('Ticket');
                    }
                }}
            />
        </View>
    );
}

const dropdownStyles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderRadius: 999,
        height: 50,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
    },
    dropdown: {
        borderRadius: 8,
        marginTop: -30,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        maxHeight: 200,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    dropdownItemText: {
        fontSize: 16,
        color: '#333',
    },
});