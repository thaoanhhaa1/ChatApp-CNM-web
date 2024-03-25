import { useSelector } from 'react-redux';

const Home = () => {
    const user = useSelector((state) => state.user);
    console.log('🚀 ~ Home ~ user:', user);

    return (
        <div>
            <h1 className="text-3xl font-bold underline">hello</h1>
        </div>
    );
};

export default Home;
