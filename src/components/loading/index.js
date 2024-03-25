const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen w-screen relative">
            <h1 className="absolute top-[100px] text-5xl text-primary-color font-bold">Zalo</h1>
            <div className="">
                <span className="mx-auto block w-5 h-5 rounded-full border-2 border-primary-color border-t-transparent animate-spin"></span>
                <div className="text-sm mt-4">Logging in...</div>
            </div>
        </div>
    );
};

Loading.propTypes = {};

export default Loading;
