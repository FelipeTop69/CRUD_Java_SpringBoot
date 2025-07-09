import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/Base/BackButton';
import { colors } from '../../../themes';

export default function CategoryCreate() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(true);

    const handleCreate = () => {
        if (!name.trim()) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setAlertMessage('El nombre de la categoría es obligatorio.');
            setAlertSuccess(false);
            setAlertVisible(true);
            return;
        }

        setAlertMessage('¡Categoría creada correctamente!');
        setAlertSuccess(true);
        setAlertVisible(true);
        setName('');
        setDescription('');
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
                                    <BackButton />
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
                            <View className="space-y-4 mx-2">
                                <View>
                                    <Text className={`${colors.heading} text-xl font-bold mb-1`}>Nombre</Text>
                                    <TextInput
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="Nombre de la categoría"
                                        placeholderTextColor="#999"
                                        className="p-4 mb-8 bg-white border border-gray-300 focus:border-blue-500 rounded-full text-base"
                                        returnKeyType="next"
                                    />
                                </View>

                                <View>
                                    <Text className={`${colors.heading} text-xl font-bold mb-1`}>Descripción</Text>
                                    <TextInput
                                        value={description}
                                        onChangeText={setDescription}
                                        placeholder="Descripción opcional"
                                        placeholderTextColor="#999"
                                        className="p-4 mb-8 bg-white border border-gray-300 focus:border-blue-500 rounded-full text-base"
                                        returnKeyType="done"
                                        multiline
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Botón */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleCreate}
                            style={{ backgroundColor: colors.button }}
                            className="mt-8 rounded-full p-4 mx-2 shadow-md"
                        >
                            <Text className="text-center text-white text-lg font-semibold">
                                Crear Categoría
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Alerta tipo SweetAlert */}
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
                    onConfirmPressed={() => setAlertVisible(false)}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}