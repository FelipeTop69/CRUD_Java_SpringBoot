import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Button,
    View,
    Dimensions,
    Animated,
    Easing,
    Text
} from 'react-native';
import { Category } from '../../types/Entities/category';

// Tipos para las props del modal
type ModalOptions = {
    type: 'slide';
    from: 'top' | 'bottom';
};

type ModalProps = {
    visible: boolean;
    options: ModalOptions;
    duration: number;
    item?: Category
    onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ visible, options, duration, item, onClose }) => {
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

    const handlePress = () => {
        onClose();
    };

    const generateBackgroundOpacity = () => {
        if (startPointY >= 0) {
            return transY.interpolate({
                inputRange: [0, startPointY],
                outputRange: [0.8, 0],
                extrapolate: 'clamp',
            });
        } else {
            return transY.interpolate({
                inputRange: [startPointY, 0],
                outputRange: [0, 0.8],
                extrapolate: 'clamp',
            });
        }
    };

    return (
        <>
            <Animated.View
                pointerEvents="none"
                style={[styles.outerContainer, { opacity: generateBackgroundOpacity() }]}
            />
            <Animated.View style={[styles.container, { transform: [{ translateY: transY }] }]}>
                <View style={styles.innerContainer}>
                    <Button title="Close Modal" onPress={handlePress} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                        {item?.id}
                    </Text>

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
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '70%',
        height: '20%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
});
