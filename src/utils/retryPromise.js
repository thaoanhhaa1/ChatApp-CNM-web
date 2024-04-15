const retryPromise = (fn, retriesLeft = 5, interval = 200) => {
    return new Promise((resolve, reject) => {
        fn()
            .then(resolve)
            .catch((error) => {
                setTimeout(() => {
                    if (retriesLeft === 1) {
                        reject(error);
                        return;
                    }

                    retryPromise(fn, retriesLeft - 1, interval).then(resolve, reject);
                }, interval);
            });
    });
};

export default retryPromise;
