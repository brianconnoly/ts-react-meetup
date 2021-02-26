import React, { PureComponent } from 'react';

/**
 * Интерфейс пропов компонента
 */
interface MyComponentProps {
    a?: number;
    b?: string;
}

/**
 * Интерфейс состояния компонента
 */
interface MyComponentState {
    counter: number;
    items: string[];
}

/**
 * Описание компонента с помощью дженерика PureComponent
 */
class MyComponent extends PureComponent<MyComponentProps, MyComponentState> {
    state: MyComponentState = {
        counter: 0,
        items: [],
    };
    incrementCounter() {
        this.setState(({ counter }) => ({ counter: counter + 1 }));
    }
    render() {
        const { a, b } = this.props;

        return (
            <div data-id={a}>
                {b} {this.state.counter}
                {this.state.items.map((item) => (
                    <span>{item}</span>
                ))}
            </div>
        );
    }
}

const test = () => (
    <>
        <MyComponent />
        <MyComponent a={1} b="asd" />
    </>
);
