import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { useBackToTop } from '~/hooks';

const NotFound = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useBackToTop();

    return (
        <section className="min-h-screen max-w-5xl mx-auto py-10 flex items-center justify-center bg-white">
            <div className="container mx-auto">
                <div className="col-sm-10 col-sm-offset-1 text-center">
                    <div
                        style={{
                            backgroundImage: `url(${images.notFoundBg})`,
                        }}
                        className="h-[400px] bg-center"
                    >
                        <h1 className="text-[80px] z-1">404</h1>
                    </div>

                    <div className="-mt-[50px] px-8 z-1">
                        <h3 className="text-4xl xs:text-[80px] xs:leading-tight">{t('not-found.title')}</h3>

                        <p>{t('not-found.description')}</p>

                        <div className="flex items-center justify-center gap-4">
                            <Link
                                to="/"
                                className="text-white rounded-xl overflow-hidden py-[10px] inline-block my-5 px-5 bg-primary-color"
                            >
                                {t('not-found.home')}
                            </Link>
                            <button
                                onClick={() => navigate(-1)}
                                className="text-white rounded-xl overflow-hidden py-[10px] inline-block my-5 px-5 bg-primary-color"
                            >
                                {t('not-found.back')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

NotFound.propTypes = {};

export default NotFound;
