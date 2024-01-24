import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchIcon, UserAddLineIcon } from '~/assets';
import Contact from '~/components/contact';
import FormGroup from '~/components/formGroup';
import HeaderPage from '~/components/headerPage';
import Input from '~/components/input';
import Modal from '~/components/modal';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import Textarea from '~/components/textarea';
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

    const handleInviteContact = () => {};

    useEffect(() => {
        setLabels(Object.keys(contacts));
    }, [contacts]);

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
            <Modal show={value} onClickOutside={setFalse}>
                <Modal.Header onClose={setFalse}>{t('contacts.add-contact')}</Modal.Header>

                <div className="p-6 flex flex-col gap-6">
                    <FormGroup>
                        <FormGroup.Label htmlFor="phone">{t('contacts.phone')}</FormGroup.Label>
                        <Input type="tel" id="phone" name="phone" outline placeholder={t('contacts.enter-phone')} />
                    </FormGroup>
                    <FormGroup>
                        <FormGroup.Label htmlFor="message">{t('contacts.message')}</FormGroup.Label>
                        <Textarea
                            outline
                            type="tel"
                            id="message"
                            name="message"
                            placeholder={t('contacts.enter-message')}
                            rows={3}
                        />
                    </FormGroup>
                </div>

                <Modal.Footer className="flex justify-end items-center gap-2">
                    <Modal.Button onClick={setFalse} type="text-primary">
                        {t('contacts.close')}
                    </Modal.Button>
                    <Modal.Button onClick={handleInviteContact}>{t('contacts.invite-contact')}</Modal.Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

Contacts.propTypes = {};

export default Contacts;
