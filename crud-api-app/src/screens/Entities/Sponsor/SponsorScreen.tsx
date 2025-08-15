import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { PlusIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SponsorService } from '../../../api/Entities/sponsorService';
import ModalDetails from '../../../components/Base/ModalDetails';
import RegisterList from '../../../components/Base/RegisterList';
import EmptyList from '../../../components/EmptyList';
import { globalStyles } from '../../../styles/global';
import { colors } from '../../../themes';
import { Sponsor } from '../../../types/Entities/sponsor';
import { DrawerParamList } from '../../../types/navigation';

export default function SponsorScreen() {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [viewItem, setViewItem] = useState<Sponsor | null>(null);


    // Peticiones
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const data = await SponsorService.getAll();
                    setSponsors(data);
                } catch (error) {
                    console.error("Error al cargar sponsors:", error);
                }
            };

            fetchData();
        }, [])
    );


    const handleEdit = (item: Sponsor) => {
        navigation.navigate('SponsorUpdate', { id: Number(item.id) });
    };

    const handleDelete = async (item: Sponsor) => {
        try {
            await SponsorService.delete(Number(item.id));
            setSponsors(prev => prev.filter(cat => cat.id !== item.id));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'Error al eliminar Sponsor');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };

    const handleView = (item: Sponsor) => {
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
                            patrocinadores
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('SponsorCreate')
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
                            data={sponsors}
                            ListEmptyComponent={<EmptyList message="No hay Patrocinadores" />}
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
                fields={[
                    { key: 'name', label: 'Nombre' },
                    { key: 'phone', label: 'Teléfono' },
                ]}
                options={{ type: 'slide', from: 'bottom' }}
                duration={500}
                onClose={handleClose}
            />
        </SafeAreaView>
    );
}