//petición fetch

import { BOOK_END_POINT } from "../constants/endpoints";
import { IBook } from "./types/IBook";

export const createBook = async (register: IBook) => {
  try {
    const response = await fetch(BOOK_END_POINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al crear el libro");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllBook = async () => {
  try {
    const response = await fetch(BOOK_END_POINT);
    if (!response.ok) throw new Error("Error al listar los libros");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getByIdBook = async (id: number) => {
  try {
    const response = await fetch(BOOK_END_POINT + id);

    if (!response.ok) throw new Error("Error al actualizar el libro");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateBook = async (id: number, register: IBook) => {
  try {
    const response = await fetch(BOOK_END_POINT + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al actualizar el libro");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await fetch(BOOK_END_POINT + id, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar el libro");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
