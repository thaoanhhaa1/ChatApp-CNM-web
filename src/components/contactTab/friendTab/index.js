import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ContactItem from '~/components/contactItem';
import ContactItemSkeleton from '~/components/contactItem/ContactItemSkeleton';
import List from '~/components/list';
import PhoneBook from '~/components/phoneBook';
import PhoneBookSkeleton from '~/components/phoneBook/PhoneBookSkeleton';
import { friendContactTab, friendContactTabConst } from '~/constants';
import { getFriends } from '~/features/friend/friendSlice';
import { convertContactsToPhoneBook } from '~/utils';
import Button from '../Button';
import Seperate from '../Seperate';
import Wrapper from '../Wrapper';
import FriendRequest from './friendRequest';
import PhoneBookSub from './phoneBook';

// TODO Empty contact
const Friend = () => {
    const { t } = useTranslation();
    const { friendList, friendListLoading } = useSelector((state) => state.friend);
    const phoneBook = useMemo(() => convertContactsToPhoneBook(friendList), [friendList]);
    const [modalActive, setModalActive] = useState();
    const dispatch = useDispatch();

    const handleClickAction = (action) => setModalActive(action.id);
    const handleCloseModal = () => setModalActive();

    useEffect(() => {
        friendList?.length || dispatch(getFriends());
    }, [dispatch, friendList?.length]);

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

            {friendListLoading ? (
                <List control={() => <PhoneBookSkeleton render={ContactItemSkeleton} />} length={3} />
            ) : (
                <PhoneBook
                    phoneBook={phoneBook}
                    render={(contact) => <ContactItem contact={contact} key={contact._id} />}
                />
            )}

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
