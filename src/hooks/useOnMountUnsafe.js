import { useEffect, useRef } from 'react';

export function useOnMountUnsafe(effect, deps) {
    const initialized = useRef(false);

    useEffect(() => {
        initialized.current = !initialized.current;
        if (initialized.current) effect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

export default useOnMountUnsafe;
