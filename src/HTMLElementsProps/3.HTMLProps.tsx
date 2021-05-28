/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
/**
 * Рассмотрим React.HTMLProps
 */

/**
 * При использовании требует передачи типа нужного элемента, а не строкового представления
 */
interface MyButtonComponentProps extends React.HTMLProps<HTMLButtonElement> {}

/**
 * А теперь внимание: компонент принимает ЛЮБЫЕ возможные атрибуты
 */
const test1 = (Btn: FC<MyButtonComponentProps>) => <Btn href="https://hh.ru" target="asdas" />;

/**
 * Передача типа элемента в дженерик обеспечивает лишь выбор правильного типа события
 */
const test2 = (Btn: FC<MyButtonComponentProps>) => <Btn onClick={(e: React.MouseEvent<HTMLButtonElement>) => {}} />;

/**
 * Описание свойств слишком общее
 */
const test3 = (props: MyButtonComponentProps) => {
    // ERROR: Type 'string' is not assignable to type '"button" | "submit" | "reset" | undefined'.
    // return <button type={props.type} />;
};
