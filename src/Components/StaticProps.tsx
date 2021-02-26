import { FC } from 'react';

/**
 * У нас есть перечисление некоторых значений
 */
enum Positions {
    bottomLeft = 'bottom-left',
    topRight = 'top-right',
}
/**
 * Мы хотим добавить это перечисление статичным пропом к компоненту
 */
interface StaticProps {
    positions: typeof Positions;
}

/**
 * Интерфейс компонента содержит проп
 * принимающий элемент данного типа
 */
interface Props {
    position: Positions;
}

/**
 * Создаём абстрактный компонент
 */
const MyComponent: FC<Props> & StaticProps = () => <div />;

/**
 * Назначаем перечисление как статичный проп
 */
MyComponent.positions = Positions;

/**
 * Используем на практике
 */
const test = () => (
    <>
        <MyComponent position={MyComponent.positions.bottomLeft} />

        {/* Enum позволяет без дополнительных провеок избежать ручного 
            задаывания значения в обход использования статичного пропа */}
        <MyComponent position={'bottom-left'} />
    </>
);
