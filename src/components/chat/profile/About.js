import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AboutItem from '~/components/aboutItem';
import { getDate } from '~/utils';

const About = () => {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.user);
    const { active } = useSelector((state) => state.chats);
    const otherUser = active.users.find((u) => u._id !== user._id);

    const data = useMemo(() => {
        const data = [
            {
                title: 'chat.name',
                value: otherUser.name,
            },
            {
                title: 'chat.email',
                value: otherUser._id,
            },
        ];

        if (otherUser.dateOfBirth)
            data.push({
                title: 'profile.date-of-birth',
                value: getDate(otherUser.dateOfBirth),
            });
    }, [otherUser._id, otherUser.dateOfBirth, otherUser.name]);

    return (
        <div className="flex flex-col gap-2 ex:gap-3 sm:gap-4 md:gap-5 dl:gap-6">
            {data.map((item) => (
                <AboutItem key={item.title} title={t(item.title)}>
                    {item.value}
                </AboutItem>
            ))}
        </div>
    );
};

About.propTypes = {};

export default About;
