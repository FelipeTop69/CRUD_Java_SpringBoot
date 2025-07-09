import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import {
    EyeIcon,
    PencilIcon,
    TrashIcon,
} from 'react-native-heroicons/outline';
import Animated, {
    FadeInUp,
    Layout,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { colors } from '../../themes';
import { DrawerParamList } from '../../types/navigation';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
    item: any;
    index: number;
    onView?: (item: any) => void;
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
}

type ActionType = 'view' | 'edit' | 'delete';

export default function RegisterList({
    item,
    index,
    onView,
    onEdit,
    onDelete,
}: Props) {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    const handleAction = (action: ActionType) => {
        Haptics.selectionAsync();

        switch (action) {
            case 'view':
                onView?.(item);
                break;
            case 'edit':
                onEdit?.(item);
                break;
            case 'delete':
                Alert.alert(
                    '¿Eliminar categoría?',
                    `¿Estás seguro de que deseas eliminar "${item.name}"?`,
                    [
                        { text: 'Cancelar', style: 'cancel' },
                        {
                            text: 'Eliminar',
                            style: 'destructive',
                            onPress: () => onDelete?.(item),
                        },
                    ]
                );
                break;
        }
    };

    return (
        <Animated.View
            entering={FadeInUp.delay(index * 100)}
            layout={Layout.springify()}
            className="mb-3"
        >
            <View className="card-registers flex-row justify-between items-center px-4 py-3 rounded-xl bg-white shadow-sm">
                {/* Información */}
                <View>
                    <Text className={`${colors.heading} text-lg font-semibold`}>
                        {item.name}
                    </Text>
                </View>

                {/* Botones */}
                <View className="flex-row space-x-2">
                    {([
                        { icon: EyeIcon, action: 'view', color: '#3B82F6' },
                        { icon: PencilIcon, action: 'edit', color: '#10B981' },
                        { icon: TrashIcon, action: 'delete', color: '#EF4444' },
                    ] as { icon: any; action: ActionType; color: string }[]).map(
                        ({ icon: Icon, action, color }) => {
                            const scale = useSharedValue(1);
                            const animatedStyle = useAnimatedStyle(() => ({
                                transform: [{ scale: withSpring(scale.value) }],
                            }));

                            return (
                                <AnimatedPressable
                                    key={action}
                                    onPressIn={() => (scale.value = 0.9)}
                                    onPressOut={() => (scale.value = 1)}
                                    onPress={() => handleAction(action)}
                                    style={animatedStyle}
                                    className="w-10 h-10 items-center justify-center"
                                >
                                    <Icon size={20} color={color} />
                                </AnimatedPressable>
                            );
                        }
                    )}
                </View>
            </View>
        </Animated.View>
    );
}