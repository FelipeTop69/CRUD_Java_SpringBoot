import React from 'react';
import { Text, View, Image } from 'react-native';

export default function EmptyList({message}:any) {
    return (
        <View className='flex justify-center items-center my-5 space-y-3'>
            <Image className='w-36 h-36 shadow' source={require('../../assets/img/ejemplo/empty.png')} />
            <Text className='font-bold text-gray-400' >{message || 'Nada Que Ver Aqui'}</Text>
        </View>
    );
}

