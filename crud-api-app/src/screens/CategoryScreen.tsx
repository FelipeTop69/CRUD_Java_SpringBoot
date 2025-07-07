import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategoryScreen() {
    const route = useRoute();
    return (
        <SafeAreaView className='flex-1' edges={['left', 'right', 'bottom']}>
            <Text>Category Screen</Text>
        </SafeAreaView>

    );
}