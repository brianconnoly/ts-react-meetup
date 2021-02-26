export {};

/**
 * Интерфейс объекта который может прилететь нам с бекенда
 */
interface CatalogItem {
    id: number;
    title: string;
    description: string;
}

/**
 * Описание роутов бэкенда
 *
 * Структура свободная — это не какая-то встроенная фича,
 * а просто способ применения дженериков на практике
 */
interface GetAPI {
    '/catalog': {
        /**
         * Тут описываем принимаемые роутом аргументы
         */
        args: {
            page?: number;
            perPage?: number;
            query?: string;
        };
        /**
         * А тут — возвращаемые значения
         */
        result: CatalogItem[];
    };
    '/cart': {
        args: void;
        result: {
            items: {
                id: number;
                quantity: number;
            }[];
            total: number;
        };
    };
    '/item': {
        args: {
            id: number;
        };
        result: CatalogItem;
    };
}

/**
 * Описываем метод get как дженерик
 *
 * Зависит от типа Url который является ключом интерфейса GetAPI
 */
const get = <Url extends keyof GetAPI>(
    /**
     *  Из первого параметра мы считаем значение для дженерика
     */
    url: Url,
    /**
     * Далее получим интерфейс параметров через обращение к GetAPI
     *
     * Url — валидный ключ для обращения к GetAPI
     * так как мы описали его изначально как /extends keyof GetAPI/
     */
    params?: GetAPI[Url]['args']
): /**
 * Возвращаемый результат также получен с помощью обращения к GetAPI
 */
Promise<GetAPI[Url]['result']> => Promise.resolve([]);

/**
 * Пробуем обратиться к бэкенду
 */
get(
    '/catalog',
    /**
     * Передаём параметры в соответствии с интерфейсом
     */
    { page: 5, perPage: 20 }
).then((
    /**
     * Получаем результат также соответствующий описанию
     */
    data
) => console.log(data.map((item) => console.log(item.title))));

/**
 * Роут /cart не принимает никаких значений
 */
get('/cart');

get('/item');
