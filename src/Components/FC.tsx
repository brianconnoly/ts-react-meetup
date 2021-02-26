/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, VFC } from 'react';

/**
 * Простой компонент-функция
 */
const MyComponent: FC = () => <div />;

/**
 * Возвращает ReactElement<any, any> | null
 */
type MyComponentReturnType = ReturnType<typeof MyComponent>;

/**
 * Компонент функция принимающий пропы
 */
interface Props {
    a: number;
    b?: {
        name: string;
        description: string;
    };
    [x: string]: unknown;
}
const MyComponentWithProps: FC<Props> = ({ a, b }) => {
    if (!b) {
        return null;
    }
    return (
        <div key={a}>
            {b.name} {b.description}
        </div>
    );
};

/**
 * Children при использовании FC добавляется автоматически
 * даже если нет использований внутри компонента
 *
 * Способ высрелить в ногу
 */
const test = () => (
    <>
        <MyComponent>
            <span>Who's there?</span>
        </MyComponent>
        <MyComponentWithProps a={1} asd>
            <span>Some children</span>
        </MyComponentWithProps>
    </>
);

/**
 * Компонент без children
 */
const MyComponentWithoutChildren: VFC = () => <div />;

const test2 = () => (
    <>
        <MyComponentWithoutChildren>
            <span>Who's there?</span>
        </MyComponentWithoutChildren>

        <MyComponentWithoutChildren />
    </>
);
