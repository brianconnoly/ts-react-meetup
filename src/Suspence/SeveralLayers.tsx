import { Suspense, useState, VFC } from 'react';

interface PageResource {
    get: () => string;
}

const fetchResource = (page: number, long?: boolean): PageResource => {
    let completed = false;
    let data: string = '';

    const promise = new Promise((resolve) => {
        setTimeout(
            () => {
                completed = true;
                data = long ? `Heavy addition for page ${page} recieved` : `Recieved page ${page}`;
                resolve(data);
            },
            long ? 2000 : Math.random() * 1000
        );
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
    const [nestedResource, setNestedResource] = useState<PageResource>();

    const fetchPage = (page: number) => {
        setPage(page);
        setResource(fetchResource(page));
        setNestedResource(fetchResource(page, true));
    };

    return (
        <div>
            <div>Current page {page}</div>
            <br />
            <button onClick={() => fetchPage(page + 1)}>Fetch next</button>
            <br />
            <br />
            {resource && nestedResource && (
                <Suspense fallback={'Still loading'}>
                    <DisplayResource resource={resource} />
                    <br />
                    <Suspense fallback={'Nested resources loading longer...'}>
                        <DisplayResource resource={nestedResource} />
                    </Suspense>
                </Suspense>
            )}
        </div>
    );
};

export default WithSuspence;
