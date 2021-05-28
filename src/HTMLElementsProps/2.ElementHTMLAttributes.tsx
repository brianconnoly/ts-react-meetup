/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
/**
 * У React есть готовые интерфейсы вида React.AnchorHTMLAttributes<HTMLAnchorElement>
 */

/**
 * Попробуем с помощью такого интерфейса описать наш компонент-ссылку
 */
export interface MyLinkComponentProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const test1 = (Link: FC<MyLinkComponentProps>) => <Link href="https://hh.ru" />;

/**
 * Попробуем передать ref
 */
// const test2 = (Link: FC<MyLinkComponentProps>) => <Link href="https://hh.ru" ref={() => {}} />;

/**
 * Главный недостаток такого способа — особый нейминг, не позволяющий
 * по имени тега получить искомый интерфейс, а также необходимость
 * через дженерик указывать также сам элемент
 */
