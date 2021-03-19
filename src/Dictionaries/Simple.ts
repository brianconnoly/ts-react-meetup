/* eslint-disable @typescript-eslint/no-unused-vars */
export {};

{
    /**
     * Описываем словарь как константу
     */
    const dictionary = {
        foo: 1,
        bar: 2,
        other: 3,
    };

    // dictionary['newKey'] = 'value';
    // dictionary.newKey = 123;
    // delete dictionary.foo

    const values = Object.values(dictionary);
}

/**
 * Имеем перечень ключей
 */
enum Colors {
    Blue = 'BLUE',
    Red = 'RED',
    Orange = 'ORANGE',
    Green = 'GREEN',
}

{
    /**
     * Если мы сами описали словарь используя все ключи из enum —
     * он автоматически правильно типизируется
     */
    const dictionary = {
        [Colors.Blue]: 1,
        [Colors.Red]: 2,
        [Colors.Orange]: 3,
        [Colors.Green]: 4,
    };

    const value = dictionary[Colors.Green];

    // При обращении к словарю через переменную типа enum —
    // нужно быть уверенным что в словаре есть все значения
    const getByKey = (key: Colors) => dictionary[key];

    const getByKeySafe = (key: Colors) => dictionary[key as keyof typeof dictionary] || undefined;
}

{
    /**
     * Если словарь описан как мапа ключем которой является значние enum —
     * мы должны создать запись на каждый возможный ключ
     */
    const dictionary: Record<Colors, number> = {
        [Colors.Blue]: 1,
        [Colors.Red]: 2,
        [Colors.Orange]: 3,
        [Colors.Green]: 4,
    };

    const keys = Object.keys(dictionary);

    // delete dictionary[Colors.Green]
    // dictionary[Colors.Green] = 12321;

    // Можем безопасно обращаться используя значения enum как ключи
    const value: number = dictionary[Colors.Orange];

    const values = Object.values(dictionary);
}

{
    /**
     * Не на каждое значение Colors есть запись в словаре
     */
    const dictionary: Partial<Record<Colors, number>> = {
        [Colors.Blue]: 1,
        [Colors.Red]: 2,
        [Colors.Orange]: 3,
    };

    // Можем добавлять значения
    dictionary[Colors.Green] = 5;

    // Можем их удалять
    delete dictionary[Colors.Orange];

    // Но при обращении по ключу нужна будет проверка на наличие значения
    const value = dictionary[Colors.Orange];

    if (value) {
        console.log(value + 5);
    }
}
