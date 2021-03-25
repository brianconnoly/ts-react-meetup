/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-unused-vars */
export {};

/**
 * Создадим дженерик генерирующий кортеж из заданного
 * количества элементов определенного типа
 */
type TupleOf<T, N> = N extends number ? _TupleOf<T, N, []> : never;

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [...R, T]>;

{
    /**
     * Сгенерируем тип описывающий кортеж из 5ти элементов типа number
     */
    type FiveNumberTuple = TupleOf<number, 5>;
    const a: FiveNumberTuple = [1, 2, 3, 4, 5];

    /**
     * Опишем дженерик возвращающий длину типа-кортежа
     */
    type Length<T extends any[]> = T['length'];
    const l: Length<FiveNumberTuple> = 5;

    /**
     * Сделаем каждый элемент в нашем кортеже опциональным
     */
    type PartialFiveNumberTuple = Partial<FiveNumberTuple>;
    const p: PartialFiveNumberTuple = [1, 2, 3, 4, 5];

    /**
     * Получим тип длины полученного кортежа
     * В нашем случае это будет перечень всех возможных длин
     */
    type PossibleLengths = Length<PartialFiveNumberTuple>;
}

/**
 * Применив выше упомянутую магию можем описать дженерик
 * возвращающий диапазон значений от 0 до заданного числа
 */
type RangeOf<N extends number> = Partial<TupleOf<any, N>>['length'];

{
    /**
     * Опишем тип принимающий значения от 0 до 10
     */
    type TenAndBelow = RangeOf<10>;

    let ranged: TenAndBelow = 0;
    ranged = 1;
    ranged = 10;
    ranged = 15;
}

/**
 * С помощью Exclude можем вычесть один перечень значений из другого
 * и получить диапазон между двумя числами
 */
type RangeOf2<From extends number, To extends number> = Exclude<RangeOf<To>, RangeOf<From>> | From;

{
    /**
     * Опишем тип принимающий значения между 10 и 40
     */
    type BetweenTenAndForty = RangeOf2<10, 40>;

    let ranged2: BetweenTenAndForty = 10;
    ranged2 = 20;
    ranged2 = 30;
    ranged2 = 40;
    ranged2 = 42;
    ranged2 = 5;
}

{
    /**
     * Что если нам нужна строка?
     */
    type BetweenTenAndFortyString = `${RangeOf2<10, 40>}`;

    let ranged2: BetweenTenAndFortyString = '10';
    ranged2 = '20';
    ranged2 = '30';
    ranged2 = '40';
    ranged2 = '42';
}

{
    /**
     * Что если мы хотим использовать число в диапазоне в составе строкового литерала?
     */
    type ColumnWidthS = `bloko-column_s-${RangeOf2<1, 16>}`;

    let columnClassS: ColumnWidthS = 'bloko-column_s-1';
    columnClassS = 'bloko-column_s-10';
    columnClassS = 'bloko-column_s-16';
    columnClassS = 'bloko-column_s-20';
}

{
    /**
     * К сожалению такой подход сильно ограничивает нас в величина диапазона
     * Значения выше 40 вызывают слишком большое количество рекурсивных вызовов и TypeScript сдаётся
     *
     * Но мы — нет )
     */

    type BigRange = RangeOf<50>;
    type BigRange2 = RangeOf<100>;
}
