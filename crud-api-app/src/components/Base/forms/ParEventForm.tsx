import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import SelectDropdown from 'react-native-select-dropdown';
import { EventService } from '../../../api/Entities/eventService';
import { ParticipantService } from '../../../api/Entities/participantService';
import { colors } from '../../../themes';
import { Event } from '../../../types/Entities/event';
import { Location } from '../../../types/Entities/location';
import { Participant } from '../../../types/Entities/participant';
import { ParticipantEvent, ParticipantEventResponse } from '../../../types/Entities/participantEvent';
import { commonValidations, validateForm } from '../../../utils/validationsForm';
import { FieldValidationConfig } from '../../../utils/validationsType';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../types/navigation';

type Props = {
    initialData?: ParticipantEventResponse;
    onSubmit: (data: ParticipantEvent) => Promise<void>;
    submitLabel?: string;
};

const validationConfig: FieldValidationConfig = {
    participantId: [commonValidations.required('Seleccione un Participante')],
    eventId: [commonValidations.required('Seleccione un Evento')],
};

export default function ParEventForm({ initialData, onSubmit, submitLabel = 'Guardar' }: Props) {
    const [formData, setFormData] = useState({
        participantId: initialData?.participantId || 0,
        eventId: initialData?.eventId || 0,
        participantName: initialData?.participantName || '',
        eventName: initialData?.eventName || ''
    });

    const [errors, setErrors] = useState<Record<string, string | null>>({
        participantId: null,
        eventId: null
    });

    const [participants, setParticipants] = useState<Participant[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(true);
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [participantsData, eventsData] = await Promise.all([
                    ParticipantService.getAll(),
                    EventService.getAll()
                ]);

                setParticipants(participantsData);
                setEvents(eventsData);

                if (initialData) {
                    const selectedParticipant = participantsData.find(p => p.id === initialData.participantId);
                    const selectedEvent = eventsData.find(e => e.id === initialData.eventId);

                    setFormData({
                        participantId: initialData.participantId,
                        eventId: initialData.eventId,
                        participantName: selectedParticipant?.name || '',
                        eventName: selectedEvent?.name || ''
                    });
                }
            } catch (error) {
                console.error('Error loading data:', error);
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
            participantId: formData.participantId === 0 ? '' : formData.participantId.toString(),
            eventId: formData.eventId === 0 ? '' : formData.eventId.toString(),
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
            } as ParticipantEvent);
            showSuccess('Ticketo guardado exitosamente!');
            if (!initialData) {
                setFormData({
                    participantId: 0,
                    participantName: '',
                    eventId: 0,
                    eventName: '',
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

            {/* Select Participant */}
            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Participante</Text>
                <SelectDropdown
                    data={participants}
                    defaultValue={formData.participantId !== 0 && participants.length > 0 ? participants.find(l => l.id === formData.participantId) : undefined}
                    key={`location-${formData.participantId}-${participants.length}`}
                    onSelect={(selectedItem: Location) => {
                        handleSelectChange('participantId', selectedItem.id, selectedItem.name);
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
                                    {selectedItem?.name || 'Seleccione Participante'}
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

            {/* Select Event */}
            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Evento</Text>
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
                        navigation.navigate('ParticipantEvent');
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