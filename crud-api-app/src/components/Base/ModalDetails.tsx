import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { Category } from '../../types/Entities/category';

type ModalOptions = {
    type: 'slide';
    from: 'top' | 'bottom';
};

type ModalProps = {
    visible: boolean;
    options: ModalOptions;
    duration: number;
    onClose: () => void;
    item?: Category;
};

const Modal: React.FC<ModalProps> = ({ visible, options, duration, onClose, item }) => {
    const { height } = Dimensions.get('screen');
    const startPointY = options?.from === 'top' ? -height : height;
    const transY = useRef(new Animated.Value(startPointY)).current;

    useEffect(() => {
        if (visible) {
            startAnimation(0);
        } else {
            startAnimation(startPointY);
        }
    }, [visible]);

    const startAnimation = (toValue: number) => {
        Animated.timing(transY, {
            toValue,
            duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const generateBackgroundOpacity = () => {
        const inputRange = startPointY < 0 ? [startPointY, 0] : [0, startPointY];
        const outputRange = startPointY < 0 ? [0, 0.8] : [0.8, 0];

        return transY.interpolate({
            inputRange,
            outputRange,
            extrapolate: 'clamp',
        });
    };

    return (
        <>
            <Animated.View
                pointerEvents="none"
                style={[styles.outerContainer, { opacity: generateBackgroundOpacity() }]}
            />
            <Animated.View style={[styles.container, { transform: [{ translateY: transY }] }]}>
                <View style={styles.innerContainer}>
                    {/* Botón de cierre */}
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <XCircleIcon size={32} color="#374151" />
                    </TouchableOpacity>

                    {/* Imagen decorativa */}
                    {/* {item?.image && (
                        <Image
                            source={item.image}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    )} */}

                    {/* Nombre de la categoría */}
                    <Text style={styles.title}>{item?.name}</Text>
                </View>
            </Animated.View>
        </>
    );
};

export default Modal;

const styles = StyleSheet.create({
    outerContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#2b4369',
    },
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 4,
        zIndex: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
        textAlign: 'center',
    },
});