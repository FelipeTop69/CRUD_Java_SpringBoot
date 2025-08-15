import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { colors } from '../../themes';
import { images } from '../../utils/assetsMap';

type ModalOptions = {
    type: 'slide';
    from: 'top' | 'bottom';
};

type ModalProps<T = any> = {
    visible: boolean;
    options: ModalOptions;
    duration: number;
    onClose: () => void;
    item?: T;
    fields?: {
        key: string;
        label: string;
        render?: (value: any) => React.ReactNode;
    }[];
};

const ModalDetails = <T extends Record<string, any>>({
    visible,
    options,
    duration,
    onClose,
    item,
    fields = [
        { key: 'name', label: 'Nombre' },
        { key: 'description', label: 'Descripción' }
    ]
}: ModalProps<T>) => {

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
                pointerEvents={visible ? 'auto' : 'none'}
                style={[styles.outerContainer, { opacity: generateBackgroundOpacity() }]}
            />
            <Animated.View style={[styles.container, { transform: [{ translateY: transY }] }]}>
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{item?.name || 'Detalles'}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <XCircleIcon size={28} color="#6b7280" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <Image
                            source={images.register_detail}
                            style={styles.image}
                            resizeMode="contain"
                        />

                        <View style={styles.textContainer}>
                            {fields.map(({ key, label, render }) => (
                                item && key in item && (
                                    <View key={key} style={styles.fieldContainer}>
                                        <Text style={styles.label}>{label}:</Text>
                                        {render ? (
                                            render(item[key])
                                        ) : (
                                            <Text style={styles.value}>
                                                {item[key]?.toString() || 'No especificado'}
                                            </Text>
                                        )}
                                    </View>
                                )
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeFooterButton}
                    >
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9fafb',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        flex: 1,
    },
    closeButton: {
        marginLeft: 10,
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    image: {
        width: 130,
        height: 130,
    },
    textContainer: {
        width: '100%',
        marginTop: 10,
    },
    fieldContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 12,
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '500',
        padding: 8,
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
    },
    closeFooterButton: {
        padding: 16,
        backgroundColor: colors.button,
        alignItems: 'center',
        margin: 20,
        borderRadius: 12,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default ModalDetails;