import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PhoneBook from '~/components/phoneBook';
import { friendContactTab, friendContactTabConst } from '~/constants';
import Button from '../Button';
import Seperate from '../Seperate';
import Wrapper from '../Wrapper';
import ContactItem from './ContactItem';
import FriendRequest from './friendRequest';
import PhoneBookSub from './phoneBook';

const Friend = () => {
    const { t } = useTranslation();
    const { contacts } = useSelector((state) => state.contacts);
    const [modalActive, setModalActive] = useState();

    const handleClickAction = (action) => setModalActive(action.id);
    const handleCloseModal = () => setModalActive();

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

            <PhoneBook phoneBook={contacts} render={(contact) => <ContactItem contact={contact} key={contact.id} />} />

            <FriendRequest
                show={modalActive === friendContactTabConst.FRIEND_REQUEST}
                onClickOutside={handleCloseModal}
            />
            <PhoneBookSub show={modalActive === friendContactTabConst.PHONE_BOOK} onClickOutside={handleCloseModal} />
        </Wrapper>
    );
};

Friend.propTypes = {};

export default Friend;
