package com.sena.crud_basic.utils;

import java.text.Normalizer;

public class StringNormalizer {
    public static String normalize(String input) {
        return Normalizer.normalize(input, Normalizer.Form.NFD)
            .replaceAll("[\\p{InCombiningDiacriticalMarks}]", "") // Elimina tildes
            .replaceAll("\\s", "") // Elimina espacios
            .toLowerCase(); // Convierte todo a minúsculas
    }
}
