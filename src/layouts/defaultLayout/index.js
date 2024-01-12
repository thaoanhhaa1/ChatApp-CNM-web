import Navbar from '~/components/navbar';

const DefaultLayout = () => {
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
