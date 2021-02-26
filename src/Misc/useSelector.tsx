import React, { FC } from 'react';
import { createSelectorHook } from 'react-redux';

/**
 * Описываем интерфейс стора
 */
interface MyStoreState {
    someString: string;
    someNumber: number;
    someObject: {
        a: number[];
        b: boolean;
        c: string;
    };
}

/**
 * Создаём свой хук useSelector передав через
 * дженерик интерфейс нашего стора
 */
const useSelector = createSelectorHook<MyStoreState>();

/**
 * Используем в компоненте
 */
const MyComponent: FC = () => {
    const someString = useSelector((state) => state.someString);
    const someNumber = useSelector(({ someNumber }) => someNumber);

    const someObject = useSelector(({ someObject }) => someObject);

    return (
        <div>
            {someString}
            {someNumber}

            {someObject.b && someObject.c}
        </div>
    );
};
