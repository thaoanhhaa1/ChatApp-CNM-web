const useDownloadFile = (src, name) => {
    const handleDownload = () => {
        fetch(src)
            .then((response) => response.arrayBuffer())
            .then((buffer) => {
                const url = window.URL.createObjectURL(new Blob([buffer]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', name);
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => console.log(err));
    };

    return handleDownload;
};

export default useDownloadFile;
