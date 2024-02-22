import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { SearchIcon, UserAddLineIcon } from '~/assets';
import AddContact from '~/components/addContact';
import Contact from '~/components/contact';
import HeaderPage from '~/components/headerPage';
import Input from '~/components/input';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { resetSubs } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { useBoolean } from '~/hooks';

const Contacts = () => {
    const { t } = useTranslation();
    const { value, setTrue, setFalse } = useBoolean(false);
    const [contacts] = useState({
        A: [
            {
                name: 'Albert Rodarte',
            },
            {
                name: 'Albert Rodarte',
            },
            {
                name: 'Albert Rodarte',
            },
        ],
        B: [
            {
                name: 'Albert Rodarte',
            },
            {
                name: 'Albert Rodarte',
            },
            {
                name: 'Albert Rodarte',
            },
        ],
        C: [
            {
                name: 'Albert Rodarte',
            },
            {
                name: 'Albert Rodarte',
            },
            {
                name: 'Albert Rodarte',
            },
        ],
        D: [
            {
                name: 'Albert Rodarte',
            },
            {
                name: 'Albert Rodarte',
            },
            {
                name: 'Albert Rodarte',
            },
        ],
    });
    const [labels, setLabels] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setLabels(Object.keys(contacts));
    }, [contacts]);

    useEffect(() => {
        dispatch(resetSubs());
    }, [dispatch, value]);

    return (
        <div className="flex flex-col h-full pb-2 sm:pb-5">
            <HeaderPage
                tooltip={t('contacts.add-contact')}
                title={t('contacts.title')}
                rightIcon={UserAddLineIcon}
                rightClick={setTrue}
            >
                <Input placeholder={t('contacts.search')} Icon={SearchIcon} />
            </HeaderPage>
            <ScrollbarCustomize>
                <div className="px-2 ex:px-3 sm:px-4 md:px-5 dl:px-6 flex flex-col gap-2 sm:gap-4">
                    {labels.map((title, index) => (
                        <Contact title={title} key={index} contactList={contacts[title]} />
                    ))}
                </div>
            </ScrollbarCustomize>

            <AddContact show={value} onClickOutside={setFalse} />
        </div>
    );
};

Contacts.propTypes = {};

export default Contacts;
