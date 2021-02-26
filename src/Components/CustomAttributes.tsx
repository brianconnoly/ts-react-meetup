import { DOMAttributes } from 'react';

/**
 * Добавляем свой атрибут к перечню стандартных
 */
declare module 'react' {
    export interface HTMLAttributes<T> extends DOMAttributes<T> {
        source?: string;
        someNumber?: number;
    }
}

const test = () => (
    <>
        <div source="asdas" />

        {/* Такого атрибута у div нет */}
        <div something="asdas" />
    </>
);
