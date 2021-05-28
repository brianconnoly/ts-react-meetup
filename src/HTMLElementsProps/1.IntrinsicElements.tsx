/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';

/**
 * Рассмотрим особенности JSX.IntrinsicElements
 */

/**
 * Нельзя напрямую наследовать в интерфейсах
 */
// interface MyLinkComponentProps extends JSX.IntrinsicElements['a'] {}

/**
 * Можно обойти с помощью type-алиаса
 */
type AnchorAttributes = JSX.IntrinsicElements['a'];
interface MyLinkComponentProps extends AnchorAttributes {}

const test1 = (Link: FC<MyLinkComponentProps>) => <Link href="https://hh.ru" />;

/**
 * В итоговые пропы компонента попал также ref так как anchor-элемент может его принять
 * Но сам наш компонент является функцией и передачу ref'а не поддерживает
 *
 * Выходит мы создали способ выстрелить себе в ногу
 */
const test2 = (Link: FC<MyLinkComponentProps>) => <Link href="https://hh.ru" ref={() => {}} />;
