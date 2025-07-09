import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline';
import { colors } from '../../themes';
import { DrawerParamList } from '../../types/navigation';

export default function BackButton() {

    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Category')}
            className="h-8 w-8 items-center justify-center"
        >
            <ArrowLeftCircleIcon size={40} color={colors.button} />
        </TouchableOpacity>

    );
}
