import { FC } from 'react';
import { connect, useSelector } from 'react-redux';

/**
 * Переопределяем модуль react-redux
 */
declare module 'react-redux' {
    /**
     * Описываем интерфейс стора
     */
    export interface DefaultRootState {
        someString: string;
        someNumber: number;
        someObject: {
            a: number[];
            b: boolean;
            c: string;
        };
    }
}

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

/**
 * Стор также доступен при использовании connect
 */
connect((state) => ({
    a: state.someNumber,
    b: state.someObject.b,
}));
