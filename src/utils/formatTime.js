const formatTime = (seconds) => {
    const hh = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, '0');
    const mm = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, '0');
    const ss = (seconds % 60).toString().padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
};

export default formatTime;
