import React from 'react';
import { Image, Text, View } from 'react-native';

export default function EmptyList({message}:any) {
    return (
        <View className='flex justify-center items-center my-5 space-y-3'>
            <Image className='w-52 h-52 shadow' source={require('../../assets/img/ejemplo/empty.png')} />
            <Text className='font-bold text-gray-400' >{message || 'Nada Que Ver Aqui'}</Text>
        </View>
    );
}

