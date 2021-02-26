import React, { FC } from 'react';

/**
 * Пропы абстрактного компонента для создания типовых кластерных фильтров
 * Принимает тип T, является дженериком
 */
interface AbstractClusterProps<T> {
    /**
     * Принимает группы по которым мы можем фильтровать элементы
     */
    groups: T[];
    /**
     * А также метод для получения названия одной группы
     */
    getName: (cluster: T) => string;
}

/**
 * Дженерный компонент-функция
 */
const AbstractCluster = <T extends unknown>({ groups, getName }: AbstractClusterProps<T>): JSX.Element => <div></div>;

/**
 * Создадим кластерный фильтр по возрасту
 */
const ageGroups = [
    {
        id: 0,
        from: 0,
        to: 20,
    },
    {
        id: 1,
        from: 20,
        to: 40,
    },
    {
        id: 2,
        from: 40,
        to: 60,
    },
];

const AgeCluster: FC = () => <AbstractCluster groups={ageGroups} getName={({ from, to }) => `от ${from} до ${to}`} />;

/**
 * Создадим кластерный фильтр по полу
 */
enum Genders {
    Male,
    Female,
}
const genderGroups = [
    {
        id: Genders.Male,
    },
    {
        id: Genders.Female,
    },
];

const GenderCluster: FC = () => (
    <AbstractCluster groups={genderGroups} getName={({ id }) => (id === Genders.Male ? 'Мужчины' : 'Женщины')} />
);
