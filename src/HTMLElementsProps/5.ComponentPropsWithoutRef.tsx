/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
/**
 * Рассмотрим ComponentPropsWithoutRef
 */

interface MyLinkComponentProps extends React.ComponentPropsWithoutRef<'a'> {}

const test1 = (Link: FC<MyLinkComponentProps>) => <Link href="https://hh.ru" />;

/**
 * ref в пропы компонента не попал
 */
// const test2 = (Link: FC<MyLinkComponentProps>) => <Link href="https://hh.ru" ref={() => {}} />;
