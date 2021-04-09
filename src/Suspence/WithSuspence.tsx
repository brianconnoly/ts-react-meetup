import { Suspense, useState, VFC } from 'react';

interface PageResource {
    get: () => string;
}

const fetchResource = (page: number): PageResource => {
    let completed = false;
    let data: string = '';

    const promise = new Promise((resolve) => {
        setTimeout(() => {
            completed = true;
            data = `Recieved page ${page}`;
            resolve(data);
        }, Math.random() * 1000);
    });

    return {
        get: () => {
            if (completed) {
                return data;
            }
            throw promise;
        },
    };
};

const DisplayResource: VFC<{ resource: PageResource }> = ({ resource }) => <div>{resource.get()}</div>;

const WithSuspence: VFC = () => {
    const [page, setPage] = useState(1);
    const [resource, setResource] = useState<PageResource>();

    const fetchPage = (page: number) => {
        setPage(page);
        setResource(fetchResource(page));
    };

    return (
        <div>
            <div>Current page {page}</div>
            <br />
            <button onClick={() => fetchPage(page + 1)}>Fetch next</button>
            <br />
            <br />
            {resource && (
                <Suspense fallback={'Still loading'}>
                    <DisplayResource resource={resource} />
                </Suspense>
            )}
        </div>
    );
};

export default WithSuspence;
