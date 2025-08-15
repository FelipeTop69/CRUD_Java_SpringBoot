import { useState, useCallback } from "react";
import { LayoutChangeEvent } from "react-native";

export interface Layout {
    x: number;
    y: number;
    width: number;
    height: number;
}

export default function verDimensiones(logToConsole = true): [Layout, (event: LayoutChangeEvent) => void] {
    const [layout, setLayout] = useState<Layout>({ x: 0, y: 0, width: 0, height: 0 });

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        setLayout({ x, y, width, height });
        if (logToConsole) {
            console.log("📏 Dimensiones del elemento:", { x, y, width, height });
        }
    }, [logToConsole]);

    return [layout, onLayout];
}
