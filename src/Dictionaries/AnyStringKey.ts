/* eslint-disable @typescript-eslint/no-unused-vars */
export {};

{
    /**
     * Описываем словарь как мапу строка-число
     */
    const dictionary: Record<string, number> = {
        foo: 1,
        bar: 2,
        other: 3,
    };

    dictionary['newKey'] = 4;
    dictionary.otherKey = 5;

    /**
     * Обращаемся к существующему значению
     */
    const a: number = dictionary.foo;
    const b: number = dictionary.bar;

    /**
     * Попробуем получить values
     */
    const values: number[] = Object.values(dictionary);

    /**
     * Обращаемся к несуществующему значению
     */
    // const c: number = dictionary.notExists;
}

{
    /**
     * Добавляем в опиание типа возможный undefined
     */
    // const dictionary: Record<string, number | undefined> = {
    const dictionary: Partial<Record<string, number>> = {
        foo: 1,
        bar: 2,
        other: 3,
    };

    /**
     * Обращаемся к существующему значению
     */
    const a: number | undefined = dictionary.foo;
    const b: number | undefined = dictionary.bar;

    /**
     * Обращаемся к несуществующему значению
     */
    const c: number | undefined = dictionary.notExists;

    /**
     * Теперь мы всегда должны проверить наличие значения по ключу прежде чем с ним работать
     */
    if (c) {
        console.log(c + 5);
    }

    /**
     * Попробуем получить values
     */
    const values = Object.values(dictionary);
}

{
    /**
     * Добавляем в опиание типа возможный undefined
     */
    const dictionary = new Map([
        ['foo', 1],
        ['bar', 2],
        ['other', 3],
    ]);

    /**
     * Обращаемся к существующему значению
     */
    const a: number | undefined = dictionary.get('foo');
    const b: number | undefined = dictionary.get('bar');

    /**
     * Обращаемся к несуществующему значению
     */
    const c: number | undefined = dictionary.get('notExists');

    /**
     * Теперь мы всегда должны проверить наличие значения по ключу прежде чем с ним работать
     */
    if (c) {
        console.log(c + 5);
    }

    /**
     * Попробуем получить values
     */
    const values = Array.from(dictionary.values());

    /**
     * Небольшой нюанс: .has не может служить type-guard'ом
     */
    if (dictionary.has('foo')) {
        const value = dictionary.get('foo');
    }

    /**
     * По этому проще получать значение и проверять его
     */
    const value = dictionary.get('foo');
    if (value) {
        console.log(value + 1);
    }
}
