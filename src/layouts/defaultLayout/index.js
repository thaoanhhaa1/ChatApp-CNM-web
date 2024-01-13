import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '~/components/navbar';
import routes from '~/config/routes';

const DefaultLayout = () => {
    const user = useSelector((state) => state.user);
    console.log('🚀 ~ DefaultLayout ~ user:', user);
    const navigation = useNavigate();

    useLayoutEffect(() => {
        if (!user._id) navigation(routes.register);
    }, [navigation, user._id]);

    return (
        <main className="flex flex-col dl:flex-row min-h-screen">
            <Navbar />
            <section className="flex-1 overflow-y-auto dl:order-2">
                <div className="h-[1000px]">Content</div>
            </section>
        </main>
    );
};

DefaultLayout.propTypes = {};

export default DefaultLayout;
