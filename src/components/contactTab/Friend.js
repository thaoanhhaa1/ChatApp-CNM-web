import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Cake2LineIcon, ContactBook3LineIcon, GroupIcon } from '~/assets';
import Contact from '../contact';
import Button from './Button';
import Seperate from './Seperate';
import Wrapper from './Wrapper';

const Friend = () => {
    const { t } = useTranslation();
    const [labels, setLabels] = useState([]);
    const { contacts } = useSelector((state) => state.contacts);

    useEffect(() => {
        setLabels(Object.keys(contacts));
    }, [contacts]);

    return (
        <Wrapper>
            <div className="py-2">
                <Button Icon={GroupIcon} title={t('contacts.friendRequest')} primary />
                <Button
                    Icon={ContactBook3LineIcon}
                    title={t('contacts.directory')}
                    description={t('contacts.user-may-use')}
                    primary
                />
                <Button
                    Icon={Cake2LineIcon}
                    title={t('contacts.birthday-calender')}
                    description={t('contacts.follow-friend-birthday')}
                    primary
                />
            </div>
            <Seperate />
            <div className="mt-4 flex flex-col gap-2 sm:gap-4">
                {labels.map((title, index) => (
                    <Contact title={title} key={index} contactList={contacts[title]} />
                ))}
            </div>
        </Wrapper>
    );
};

Friend.propTypes = {};

export default Friend;
