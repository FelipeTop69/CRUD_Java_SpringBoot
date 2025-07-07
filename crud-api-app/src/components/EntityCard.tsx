import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, {
    FadeInUp,
    Layout,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { colors } from '../themes';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../types/navigation';
import { routeMap } from '../navigation/routeMap';
import { Entidad } from '../types/entity';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
    item: Entidad
    index: number;
}

export default function EntityCard({ item, index }: Props) {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withSpring(scale.value) }],
    }));

    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    const handlePress = () => {
        Haptics.selectionAsync();

        const key = item.nombre.toLowerCase().trim();
        const route = routeMap[key];

        if (route) {
            navigation.navigate(route);
        } else {
            console.warn(`No se encontró ruta para la entidad: ${item.nombre}`);
        }
    };

    return (
        <Animated.View entering={FadeInUp.delay(index * 100)} layout={Layout.springify()}>
            <AnimatedPressable
                onPress={handlePress}
                onPressIn={() => (scale.value = 0.85)}
                onPressOut={() => (scale.value = 1)}
                style={animatedStyle}
                className="card-entity"
            >
                <View className="items-center">
                    <Image
                        source={item.image}
                        className="w-44 h-44 rounded-full mb-2"
                        resizeMode='cover'
                    />
                    <Text className={`${colors.heading} text-lg semi-bold text-center`}>{item.nombre}</Text>
                    <View className="mt-2 px-2 py-1 bg-blue-100 rounded-full">
                        <Text className="text-sm text-blue-700 font-medium">
                            {item.registros} Registro{item.registros !== 1 ? 's' : ''}
                        </Text>
                    </View>
                </View>
            </AnimatedPressable>
        </Animated.View>
    );
}