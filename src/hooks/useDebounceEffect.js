import { useEffect } from 'react';

function useDebounceEffect(fn, waitTime, deps) {
    useEffect(() => {
        const t = setTimeout(() => {
            fn.apply(undefined, deps);
        }, waitTime);

        return () => {
            clearTimeout(t);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

export default useDebounceEffect;
