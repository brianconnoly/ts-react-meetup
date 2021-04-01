/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-unused-vars */
export {};

{
    /**
     * Наследование интерфейсов
     */
    interface Animal {
        name: string;
    }

    interface Bear extends Animal {
        honey: true;
    }

    const bear: Bear = {
        name: 'Винни',
        honey: true,
    };

    interface Cat extends Animal {
        milk: true;
    }

    const cat: Cat = {
        name: 'Барсик',
        milk: true,
    };

    /**
     * Typeguard с интерфейсами
     */
    const isBear = (animal: Animal): animal is Bear => 'honey' in animal;
    const isCat = (animal: Animal): animal is Cat => 'milk' in animal;

    const feed = (animal: Animal) => {
        if (isBear(animal)) {
            console.log(animal.honey);
        }
        if (isCat(animal)) {
            console.log(animal.milk);
        }
    };

    feed(bear);
    feed(cat);
}

{
    /**
     * Наследование типов
     */
    type Animal = {
        name: string;
    };

    type Bear = Animal & {
        honey: true;
    };

    const bear: Bear = {
        name: 'Винни',
        honey: true,
    };

    /**
     * Typeguard с типами
     */
    type Cat = Animal & {
        milk: true;
    };

    const cat: Cat = {
        name: 'Барсик',
        milk: true,
    };

    const isBear = (animal: Animal): animal is Bear => 'honey' in animal;
    const isCat = (animal: Animal): animal is Cat => 'milk' in animal;

    const feed = (animal: Animal) => {
        if (isBear(animal)) {
            console.log(animal.honey);
        }
        if (isCat(animal)) {
            console.log(animal.milk);
        }
    };

    feed(bear);
    feed(cat);
}

{
    /**
     * Пересечение свойств у интерфейсов принаследовании
     */
    interface Furniture {
        material: 'wood' | 'plastic' | 'glass';
    }

    interface Sofa extends Furniture {
        material: 'leather';
    }

    let sofa: Sofa;
}

{
    /**
     * Тоже самое с типами
     */
    type Furniture = {
        material: 'wood' | 'plastic' | 'glass';
    };

    type Sofa = Furniture & {
        material: 'leather';
    };

    let sofa: Sofa;
}

{
    /**
     * Declaration merging
     */
    interface Window {
        innerHeight: number;
    }

    interface Window {
        innerWidth: number;
    }

    let window: Window;
}

{
    /**
     * С помощью типов можно переименовывать примитивы
     */
    type MySpecialString = string;
    type MyLuckyNumber = number;

    const s: MySpecialString = 'Special';
    let n: MyLuckyNumber = 7;

    /**
     * Можно объединять несколько примитивов в один тип
     */
    type StringOrNumberOrUndefined = string | number | undefined;
    let a: StringOrNumberOrUndefined;
    a = 'String';
    a = 123;
    a = undefined;

    /**
     * Интерфейсы не могут наследовать примитивы
     * Что в принципе логично, но для ясности зафиксируем
     */
    interface SuperString extends string {}
}

{
    /**
     * Объявление функций / методов с помощью типов
     */
    type MyMethodType = (arg1: string, arg2: number) => string[];

    /**
     * Объявление функций с помощью интерфейсов
     */
    interface MyMethodInterface {
        (arg1: string, arg2: number): string[];
        (arg1: boolean): string[];
    }

    const func: MyMethodInterface = () => ['asd'];
}

{
    type A = {
        someString: string;
    };

    type B = {
        someNumber: number;
    };

    /**
     * Пересечения типов не кешируются
     *
     * При присовении объекта сперва выполнится сравнение
     * со всеми пересекаемыми типами а потом с результирующим
     */
    type MergedAB = A & B;

    const a: MergedAB = {
        someString: 'asd',
        someNumber: 123,
    };

    /**
     * Чтобы этого избежать можно использовать наследование
     */
    interface CachedMergedAB extends A, B {}

    type SomeType = CachedMergedAB;

    const b: CachedMergedAB = {
        someString: 'asd',
        someNumber: 123,
    };
}
