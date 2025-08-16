// utils/dateFormatter.ts
export const formatEventDate = (dateString: string | number | Date) => {
    if (!dateString) return {
        fullDate: 'No especificado',
        time: '',
        dateTime: 'No especificado',
        isoDate: ''
    };

    try {
        const date = new Date(dateString);

        return {
            fullDate: date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time: date.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            dateTime: date.toLocaleString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            isoDate: date.toISOString().split('T')[0]
        };
    } catch (error) {
        console.error('Error formateando fecha:', error);
        return {
            fullDate: 'Formato inválido',
            time: '',
            dateTime: 'Formato inválido',
            isoDate: ''
        };
    }
};

// Función para formatear la fecha de manera más legible (Usado para Event)
export const formatDateTime = (date: Date) => {
    return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};