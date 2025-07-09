import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline';
import { colors } from '../../themes';
import { DrawerParamList } from '../../types/navigation';

type RoutesWithoutParams = {
    [K in keyof DrawerParamList]: DrawerParamList[K] extends undefined ? K : never;
}[keyof DrawerParamList];

type Props = {
    to?: RoutesWithoutParams;
};

export default function BackButton({ to = 'Home' }: Props) {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(to)}
            className="h-8 w-8 items-center justify-center"
        >
            <ArrowLeftCircleIcon size={40} color={colors.button} />
        </TouchableOpacity>
    );
}