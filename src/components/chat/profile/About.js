import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AboutItem from '~/components/aboutItem';
import { getDate } from '~/utils';

const About = () => {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.user);

    const data = [
        {
            title: 'chat.name',
            value: user.name,
        },
        {
            title: 'chat.email',
            value: user.contact,
        },
        {
            title: 'profile.date-of-birth',
            value: getDate(user.dateOfBirth),
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
