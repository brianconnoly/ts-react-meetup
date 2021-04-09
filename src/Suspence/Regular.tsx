import { useState, VFC } from 'react';

const Regular: VFC = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState('');

    const fetchPage = (page: number) => {
        setPage(page);
        setTimeout(() => {
            setData(`Recieved page ${page}`);
        }, Math.random() * 1000);
    };

    return (
        <div>
            <div>Current page {page}</div>
            <br />
            <button onClick={() => fetchPage(page + 1)}>Fetch next</button>
            <br />
            <div>{data}</div>
        </div>
    );
};

export default Regular;
