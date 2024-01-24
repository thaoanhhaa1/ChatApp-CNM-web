import { useTranslation } from 'react-i18next';
import AboutItem from '~/components/aboutItem';

const About = () => {
    const { t } = useTranslation();

    const data = [
        {
            title: 'chat.name',
            value: 'General',
        },
        {
            title: 'chat.email',
        },
        {
            title: 'chat.time',
            value: '11:40 PM',
        },
        {
            title: 'chat.location',
            value: 'California',
        },
    ];

    return (
        <div className="flex flex-col gap-2 ex:gap-3 sm:gap-4 md:gap-5 dl:gap-6">
            {data.map((item, index) => (
                <AboutItem key={index} title={t(item.title)}>
                    {item.value}
                </AboutItem>
            ))}
        </div>
    );
};

About.propTypes = {};

export default About;
