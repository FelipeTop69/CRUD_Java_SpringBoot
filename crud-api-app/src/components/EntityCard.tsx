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
import { routeMap, RouteMapKey } from '../navigation/routeMap';
import { colors } from '../themes';
import { Entidad } from '../types/entity';
import { DrawerParamList } from '../types/navigation';

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
        const key = item.navigate.toLowerCase().trim() as RouteMapKey; // Conversión segura

        if (key in routeMap) {
            const route = routeMap[key];
            navigation.navigate(route);
        } else {
            console.warn(`Ruta no válida: ${item.navigate}`);
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
                <View
                    className="items-center"
                    style={{
                        width: 153, 
                        height: 170,
                    }}
                >
                    <Image
                        source={item.image}
                        className="mb-4"
                        style={{
                            width: 90, 
                            height: 90,
                        }}
                        resizeMode="cover"
                    />

                    <Text 
                        className={`${colors.heading} text-lg font-semibold text-center`}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item.nombre}
                    </Text>

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