import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import SelectDropdown from 'react-native-select-dropdown';
import { CategoryService } from '../../../api/Entities/categoryService';
import { LocationService } from '../../../api/Entities/locationService';
import { OrganizerService } from '../../../api/Entities/organizerService';
import { colors } from '../../../themes';
import { Category } from '../../../types/Entities/category';
import { Event } from '../../../types/Entities/event';
import { Location } from '../../../types/Entities/location';
import { Organizer } from '../../../types/Entities/organizer';
import { DrawerParamList } from '../../../types/navigation';
import { commonValidations, validateForm } from '../../../utils/validationsForm';
import { FieldValidationConfig } from '../../../utils/validationsType';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
    initialData?: Event;
    onSubmit: (data: Event) => Promise<void>;
    submitLabel?: string;
};


const validationConfig: FieldValidationConfig = {
    name: [
        commonValidations.required('El nombre es obligatorio'),
        commonValidations.minLength(3, 'Mínimo 3 caracteres')
    ],
    date: [commonValidations.required('La fecha es obligatoria')],
    organizerId: [commonValidations.required('Seleccione un organizador')],
    locationId: [commonValidations.required('Seleccione una ubicación')],
    categoryId: [commonValidations.required('Seleccione una categoría')]
};

export default function EventForm({ initialData, onSubmit, submitLabel = 'Guardar' }: Props) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
        date: initialData?.date || new Date().toISOString(),
        organizerId: initialData?.organizerId || 0,
        locationId: initialData?.locationId || 0,
        categoryId: initialData?.categoryId || 0,

        organizerName: initialData?.organizerName || '',
        locationName: initialData?.locationName || '',
        categoryName: initialData?.categoryName || ''

    });

    const [errors, setErrors] = useState<Record<string, string | null>>({
        name: null,
        description: null,
        date: null,
        organizerId: null,
        locationId: null,
        categoryId: null
    });

    // Estados separados para el DateTimePicker
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(
        initialData?.date ? new Date(initialData.date) : new Date()
    );
    const [mode, setMode] = useState<'date' | 'time'>('date');

    const [organizers, setOrganizers] = useState<Organizer[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(true);
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [orgs, locs, cats] = await Promise.all([
                    OrganizerService.getAll(),
                    LocationService.getAll(),
                    CategoryService.getAll()
                ]);

                setOrganizers(orgs);
                setLocations(locs);
                setCategories(cats);

                // Solo actualizar formData si hay initialData y los arrays tienen datos
                if (initialData && orgs.length > 0 && locs.length > 0 && cats.length > 0) {
                    const selectedOrg = orgs.find(o => o.id === initialData.organizerId);
                    const selectedLoc = locs.find(l => l.id === initialData.locationId);
                    const selectedCat = cats.find(c => c.id === initialData.categoryId);

                    // Actualizar formData con todos los datos del initialData
                    setFormData({
                        name: initialData.name || '',
                        description: initialData.description || '',
                        date: initialData.date || new Date().toISOString(),
                        organizerId: initialData.organizerId || 0,
                        locationId: initialData.locationId || 0,
                        categoryId: initialData.categoryId || 0,
                        // Agregar nombres para referencia visual
                        organizerName: selectedOrg?.name || '',
                        locationName: selectedLoc?.name || '',
                        categoryName: selectedCat?.name || ''
                    });

                    // Actualizar también la fecha seleccionada
                    if (initialData.date) {
                        setSelectedDate(new Date(initialData.date));
                    }
                }
            } catch (error) {
                console.error('Error cargando datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [initialData]);

    // Manejo mejorado del DateTimePicker
    const handleDateChange = (event: any, date?: Date) => {
        // En Android, siempre cerramos el picker primero
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
            setShowTimePicker(false);
        }

        // Si el usuario canceló (event.type === 'dismissed' en Android)
        if (event.type === 'dismissed') {
            return;
        }

        if (date) {
            setSelectedDate(date);
            setFormData(prev => ({
                ...prev,
                date: date.toISOString()
            }));

            // En Android, después de seleccionar fecha, mostrar selector de hora
            if (Platform.OS === 'android' && mode === 'date') {
                setTimeout(() => {
                    setMode('time');
                    setShowTimePicker(true);
                }, 100);
            }
        }

        // En iOS, solo cerramos si es el modo time o si el usuario terminó
        if (Platform.OS === 'ios') {
            setShowDatePicker(false);
        }
    };

    const showDatePickerHandler = () => {
        if (Platform.OS === 'android') {
            setMode('date');
            setShowDatePicker(true);
        } else {
            // En iOS, mostramos el picker con modo datetime
            setMode('date');
            setShowDatePicker(true);
        }
    };

    const handleChange = (field: keyof typeof formData) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Limpiar error cuando el usuario empiece a escribir
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
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
            organizerId: formData.organizerId === 0 ? '' : formData.organizerId.toString(),
            locationId: formData.locationId === 0 ? '' : formData.locationId.toString(),
            categoryId: formData.categoryId === 0 ? '' : formData.categoryId.toString()
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
            } as Event);
            showSuccess('Evento guardado exitosamente!');
            if (!initialData) {
                const resetDate = new Date();
                setFormData({
                    name: '',
                    description: '',
                    date: resetDate.toISOString(),
                    organizerId: 0,
                    organizerName: '',
                    locationId: 0,
                    locationName: '',
                    categoryId: 0,
                    categoryName: '',

                });
                setSelectedDate(resetDate);
            }
        } catch (error) {
            showError(
                error instanceof Error ? error.message : 'Error al guardar el evento'
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

    // Función para formatear la fecha de manera más legible
    const formatDateTime = (date: Date) => {
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
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
            {/* Campo Nombre */}
            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Nombre</Text>
                <TextInput
                    value={formData.name}
                    onChangeText={handleChange('name')}
                    placeholder="Nombre del evento"
                    placeholderTextColor="#999"
                    className={`p-4 bg-white border rounded-full text-base ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                />
                {errors.name && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.name}</Text>
                )}
            </View>

            {/* Campo Descripción */}
            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Descripción</Text>
                <TextInput
                    value={formData.description}
                    onChangeText={handleChange('description')}
                    placeholder="Descripción del evento"
                    placeholderTextColor="#999"
                    className="p-4 bg-white border border-gray-300 focus:border-blue-500 rounded-full text-base"
                    multiline
                    numberOfLines={3}
                />
            </View>

            {/* Campo Fecha y Hora */}
            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Fecha y Hora</Text>
                <TouchableOpacity
                    onPress={showDatePickerHandler}
                    className={`p-4 bg-white border rounded-full ${errors.date ? 'border-red-500' : 'border-gray-300'
                        }`}
                >
                    <Text className="text-base text-gray-800">
                        {formatDateTime(selectedDate)}
                    </Text>
                </TouchableOpacity>
                {errors.date && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.date}</Text>
                )}

                {/* DateTimePicker para fecha */}
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                        minimumDate={new Date()}
                    />
                )}

                {/* DateTimePicker para hora (solo Android) */}
                {showTimePicker && Platform.OS === 'android' && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="time"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                {/* Para iOS, agregar botón separado para hora si se desea */}
                {Platform.OS === 'ios' && (
                    <TouchableOpacity
                        onPress={() => {
                            setMode('time');
                            setShowDatePicker(true);
                        }}
                        className="mt-2 p-2 bg-blue-100 rounded-full"
                    >
                        <Text className="text-center text-blue-600 text-sm">
                            Cambiar hora
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Select Organizador */}
            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Organizador</Text>
                <SelectDropdown
                    data={organizers}
                    defaultValue={formData.organizerId !== 0 && organizers.length > 0 ? organizers.find(o => o.id === formData.organizerId) : undefined}
                    key={`organizer-${formData.organizerId}-${organizers.length}`}
                    onSelect={(selectedItem: Organizer) => {
                        handleSelectChange('organizerId', selectedItem.id, selectedItem.name);
                    }}
                    renderButton={(selectedItem: Organizer | undefined) => {
                        return (
                            <View style={[
                                dropdownStyles.button,
                                { borderColor: errors.organizerId ? '#EF4444' : '#D1D5DB' }
                            ]}>
                                <Text style={[
                                    dropdownStyles.buttonText,
                                    !selectedItem && { color: '#999' }
                                ]}>
                                    {selectedItem?.name || 'Seleccione organizador'}
                                </Text>
                            </View>
                        );
                    }}
                    renderItem={(item: Organizer, index: number, isSelected: boolean) => {
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
                {errors.organizerId && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.organizerId}</Text>
                )}
            </View>

            {/* Select Ubicación */}
            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Ubicación</Text>
                <SelectDropdown
                    data={locations}
                    defaultValue={formData.locationId !== 0 && locations.length > 0 ? locations.find(l => l.id === formData.locationId) : undefined}
                    key={`location-${formData.locationId}-${locations.length}`}
                    onSelect={(selectedItem: Location) => {
                        handleSelectChange('locationId', selectedItem.id, selectedItem.name);
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
                                    {selectedItem?.name || 'Seleccione ubicación'}
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

            {/* Select Categoría */}
            <View className='mb-4'>
                <Text className={`${colors.heading} text-xl font-bold mb-1`}>Categoría</Text>
                <SelectDropdown
                    data={categories}
                    defaultValue={formData.categoryId !== 0 && categories.length > 0 ? categories.find(c => c.id === formData.categoryId) : undefined}
                    key={`category-${formData.categoryId}-${categories.length}`}
                    onSelect={(selectedItem: Category) => {
                        handleSelectChange('categoryId', selectedItem.id, selectedItem.name);
                    }}
                    renderButton={(selectedItem: Category | undefined) => {
                        return (
                            <View style={[
                                dropdownStyles.button,
                                { borderColor: errors.categoryId ? '#EF4444' : '#D1D5DB' }
                            ]}>
                                <Text style={[
                                    dropdownStyles.buttonText,
                                    !selectedItem && { color: '#999' }
                                ]}>
                                    {selectedItem?.name || 'Seleccione categoría'}
                                </Text>
                            </View>
                        );
                    }}
                    renderItem={(item: Category, index: number, isSelected: boolean) => {
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
                {errors.categoryId && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.categoryId}</Text>
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
                        navigation.navigate('Event');
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