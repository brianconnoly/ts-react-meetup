/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
/**
 * Рассмотрим ComponentProps
 */

interface MyLinkComponentProps extends React.ComponentProps<'a'> {}

const test1 = (Link: FC<MyLinkComponentProps>) => <Link href="https://hh.ru" />;

/**
 * Попробуем назначить полученные атрибуты кнопке
 */
interface MyButtonComponentProps extends React.ComponentProps<'button'> {}

const test2 = (props: MyButtonComponentProps) => {
    return <button type={props.type} />;
};

/**
 * Но к нашим пропам также попал ref
 */
const test3 = (Link: FC<MyLinkComponentProps>) => <Link href="https://hh.ru" ref={() => {}} />;

/**
 * Если нам по каким-то причинам нужен интерфейс компонента с ref'ом
 * лучше использовать ComponentPropsWithRef, тогда тип ref'а будет более корректным
 */
interface MyLinkComponentPropsWithRef extends React.ComponentPropsWithRef<'a'> {}

const test4 = (Link: FC<MyLinkComponentPropsWithRef>) => <Link href="https://hh.ru" ref={() => {}} />;
