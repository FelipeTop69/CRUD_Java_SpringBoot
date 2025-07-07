import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, {
    FadeInUp,
    Layout,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { routeMap } from '../../navigation/routeMap';
import { colors } from '../../themes';
import { DrawerParamList } from '../../types/navigation';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
    item: any
    index: number;
}

export default function RegisterList({ item, index }: Props) {
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
                className="card-registers"
            >
                <View>
                    <Text className={`${colors.heading} text-lg font-semibold`}>{item.nombre}</Text>
                    <Text className={`${colors.heading} text-xs`}>{item.nombre}</Text>
                </View>
                <View>
                    <Text className={`${colors.heading} text-lg`}>{item.nombre}</Text>
                </View>
            </AnimatedPressable>
        </Animated.View>
    );
}