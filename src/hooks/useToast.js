import { useEffect, useState } from 'react';

const useToast = (timeShow = 1000) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let id;

        if (show) id = setTimeout(() => setShow(false), timeShow);

        return () => {
            clearTimeout(id);
        };
    }, [show, timeShow]);

    return [show, setShow];
};

export default useToast;
