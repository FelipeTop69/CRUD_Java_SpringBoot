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
import { colors } from '../../themes';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../types/navigation';
import { routeMap } from '../navigation/routeMap';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
    item: {
        id: number;
        name: string;
        registros: number;
        image: any;
    };
    index: number;
}

export default function EntidadCard({ item, index }: Props) {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withSpring(scale.value) }],
    }));

    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    const handlePress = () => {
        Haptics.selectionAsync();

        const key = item.name.toLowerCase().trim();
        const route = routeMap[key];

        if (route) {
            navigation.navigate(route);
        } else {
            console.warn(`No se encontró ruta para la entidad: ${item.name}`);
        }
    };

    return (
        <Animated.View entering={FadeInUp.delay(index * 100)} layout={Layout.springify()}>
            <AnimatedPressable
                onPress={handlePress}
                onPressIn={() => (scale.value = 0.7)}
                onPressOut={() => (scale.value = 1)}
                style={animatedStyle}
                className="card-entity"
            >
                <View className="items-center">
                    <Image
                        source={item.image}
                        className="w-44 h-44 mb-2"
                    />
                    <Text className={`${colors.heading} text-lg font-bold`}>{item.name}</Text>
                    <Text className={`${colors.heading} text-md`}>Registros: {item.registros}</Text>
                </View>
            </AnimatedPressable>
        </Animated.View>
    );
}