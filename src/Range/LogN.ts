/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-unused-vars */
export {};

/**
 * Суть способа:
 *
 * В предыдущем примере мы рекурсивно добавляли новый элемент в кортеж
 * до тех пор пока длина не будет соответствовать нашему запросу
 *
 * Теперь применим хитрость и будем прибавлять не единицу а собирать нужное число из степеней двойки
 *
 * [32 16 8 4 2 1]
 *
 * 7 = 4 + 2 + 1        / 3 /
 *
 * 17 = 16 + 1          / 5 /  (8, 4, 2)
 *
 * 56 = 32 + 16 + 8     / 3 /  (4, 2, 1)
 *
 */

type t = Capitalize<'asdas'>;
/**
 * Опишем дженерик генерирующий массив кортежей с длиной соответсвующей степеням двойки
 *
 * Условие:
 * Первый кортеж в массиве должен сожержать элемент с индеком переданного числа,
 * то есть иметь длину не меньше чем переданное число + 1
 */
type BuildPowersOf2LengthArrays<N extends number, R extends never[][] = [[never]]> = R[0][N] extends never
    ? R
    : BuildPowersOf2LengthArrays<N, [[...R[0], ...R[0]], ...R]>;

{
    /**
     * Для переданного числа 0 мы получим кортеж из одного элемента
     */
    type PowersOf2For0 = BuildPowersOf2LengthArrays<0>;

    /**
     * При передаче единицы — из двух
     */
    type PowersOf2For1 = BuildPowersOf2LengthArrays<1>;

    /**
     * Для 2 и 3 — из 4х
     */
    type PowersOf2For2 = BuildPowersOf2LengthArrays<2>;
    type PowersOf2For3 = BuildPowersOf2LengthArrays<3>;

    /**
     * От 4х до 7ми — из 8ми элементов
     */
    type PowersOf2For4 = BuildPowersOf2LengthArrays<4>;
    type PowersOf2For7 = BuildPowersOf2LengthArrays<7>;

    /**
     * От 8 до 15 — из 16 и так далее...
     */
    type PowersOf2For8 = BuildPowersOf2LengthArrays<8>;
}

/**
 * Теперь опишем дженерик объединяющий кортежи пока не получим кортеж нужной длины
 */
type ConcatLargestUntilDone<N extends number, R extends never[][], B extends never[] = []> = B['length'] extends N
    ? B
    : [...R[0], ...B][N] extends never
    ? ConcatLargestUntilDone<N, R extends [R[0], ...infer U] ? (U extends never[][] ? U : never) : never, B>
    : ConcatLargestUntilDone<
          N,
          R extends [R[0], ...infer U] ? (U extends never[][] ? U : never) : never,
          [...R[0], ...B]
      >;

{
    /**
     * Попробуем получить кортеж длиной в 7 элементов, передав число 7 и соответствующую кассу кортежей
     */
    type test = ConcatLargestUntilDone<7, BuildPowersOf2LengthArrays<7>>;

    /**
     * Начальные значения
     *
     * 7  [[8] [4] [2] [1]]  []
     *
     * Прибавляем к первому кортежу в нашей кассе текущий результат
     * и смотрим, есть ли там элемент с искомым индексом
     *
     *     [8] + [] — Элемент с индеком 7 присутствует
     *
     * Запускаем функцию заново с новыми значениями:
     *   - Убираем первый кортеж (он нам не подходит так как количество элементов превосходит нужное)
     *   - Накапливаемый результат (B) оставляем без изменений
     *
     * 7  [[4] [2] [1]]  []
     *
     * Повторяем операцию:
     * Прибавляем к первому кортежу в кассе текущий результат
     * и смотрим, есть ли там элемент с искомым индексом
     *
     *     [4] + [] — Элемент с индексом 7 отсутствует
     *
     * Запускаем функцию заново, но теперь с другим изменением параметров
     *   - Убираем первый кортеж из кассы
     *   - Записываем его в результат (суммируем с текущим)
     *
     * 7  [[2] [1]]  [4]
     *
     * Повторяем операцию:
     * Складываем первый кортеж из кассы с текущим накапливаемым результатом
     *
     *     [2] + [4] — Элемент с индексом 7 остутствует
     *
     * Запускаем заново, убрав первый кортеж из текущей кассы, прибавив его к результату
     *
     * 7  [[1]]  [6]
     *
     * Повторяем проверку:
     *
     *     [1] + [6] — Элемент с индексом 7 отсутствует
     *
     * Ещё один запуск:
     *
     * 7  []  [7]
     *
     * И наконец самая первая проверка на длину накопительного результата проходит успешно
     * Возвращаем полученный кортеж из 7ми элементов
     */
}

/**
 * Из этого дженерика легко получить функцию возвращающую кортеж заданной длины как в предыдущем примере
 */
type TupleOf<N extends number> = N extends number ? ConcatLargestUntilDone<N, BuildPowersOf2LengthArrays<N>> : never;

{
    /**
     * Кортеж из 5ти элементов
     */
    type TupleOfFive = TupleOf<5>;

    /**
     * Из 10ти
     */
    type TupleOfTen = TupleOf<10>;
}

{
    /**
     * Хелпер Replace позволит заменить все never на нужный тип
     */
    type Replace<R extends any[], T> = { [K in keyof R]: T };

    type TupleOfType<N extends number, T> = Replace<TupleOf<N>, T>;

    type ThreeNumberTuple = TupleOfType<3, number>;
    const t: ThreeNumberTuple = [1, 2, 3];
}

/**
 * По тому же принципу получим дженерики для описания диапазонов
 */
type RangeOf<N extends number> = Partial<TupleOf<N>>['length'];
type RangeOf2<From extends number, To extends number> = Exclude<RangeOf<To>, RangeOf<From>> | From;

{
    /**
     * Проверим на больших числах
     */
    type BigRange = RangeOf<8000>;
    type BigRangeOf2 = RangeOf2<2, 28>;

    type Literal = `${BigRange}`;

    let b: BigRangeOf2 = 12;
}
