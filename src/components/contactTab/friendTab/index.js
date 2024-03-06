import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Contact from '~/components/contact';
import { friendContactTab, friendContactTabConst } from '~/constants';
import Button from '../Button';
import Seperate from '../Seperate';
import Wrapper from '../Wrapper';
import FriendRequest from './friendRequest';
import PhoneBook from './phoneBook';

const Friend = () => {
    const { t } = useTranslation();
    const [labels, setLabels] = useState([]);
    const { contacts } = useSelector((state) => state.contacts);
    const [modalActive, setModalActive] = useState(2);

    const handleClickAction = (action) => setModalActive(action.id);
    const handleCloseModal = () => setModalActive();

    useEffect(() => {
        setLabels(Object.keys(contacts));
    }, [contacts]);

    return (
        <Wrapper>
            <div className="py-2">
                {friendContactTab.map((item) => (
                    <Button
                        onClick={() => handleClickAction(item)}
                        Icon={item.Icon}
                        title={t(item.title)}
                        description={t(item.description)}
                        key={item.id}
                        primary
                    />
                ))}
            </div>
            <Seperate />
            <div className="mt-4 flex flex-col gap-2 sm:gap-4">
                {labels.map((title, index) => (
                    <Contact title={title} key={index} contactList={contacts[title]} />
                ))}
            </div>

            <FriendRequest
                show={modalActive === friendContactTabConst.FRIEND_REQUEST}
                onClickOutside={handleCloseModal}
            />
            <PhoneBook show={modalActive === friendContactTabConst.PHONE_BOOK} onClickOutside={handleCloseModal} />
        </Wrapper>
    );
};

Friend.propTypes = {};

export default Friend;
