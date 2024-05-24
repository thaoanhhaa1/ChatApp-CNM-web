import PropTypes from 'prop-types';
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

const Friend = ({ search = '' }) => {
    const { t } = useTranslation();
    const { friendList, friendListLoading, friendListFirstFetch } = useSelector((state) => state.friend);
    const phoneBook = useMemo(() => {
        const searchLower = search.toLowerCase();

        return convertContactsToPhoneBook(
            friendList.filter(
                (friend) => friend.name.toLowerCase().includes(searchLower) || friend._id.toLowerCase() === searchLower,
            ),
        );
    }, [friendList, search]);
    const [modalActive, setModalActive] = useState();
    const dispatch = useDispatch();

    const handleClickAction = (action) => setModalActive(action.id);
    const handleCloseModal = () => setModalActive();

    useEffect(() => {
        friendListFirstFetch || friendListLoading || dispatch(getFriends());
    }, [dispatch, friendListFirstFetch, friendListLoading]);

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

Friend.propTypes = {
    search: PropTypes.string,
};

export default Friend;
