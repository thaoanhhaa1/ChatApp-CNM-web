import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { PeopleAddIcon, SortArrowIcon } from '~/assets';
import ContactGroupItem from '~/components/contactGroupItem';
import ContactGroupItemSkeleton from '~/components/contactGroupItem/ContactGroupItemSkeleton';
import List from '~/components/list';
import Popup from '~/components/popup';
import { sortGroup } from '~/constants';
import { GROUP_NAME, RECENT_ACTIVITY } from '~/constants/sortGroup';
import { getGroups } from '~/features/contactGroups/contactGroupsSlice';
import { useBoolean } from '~/hooks';
import Button from '../Button';
import Seperate from '../Seperate';
import Wrapper from '../Wrapper';
import CreateGroup from './createGroup';

const Group = () => {
    const { t } = useTranslation();
    const { groups, loading, firstFetch } = useSelector((state) => state.contactGroups);
    const [sort, setSort] = useState(sortGroup[0]);
    const sorts = useMemo(
        () => sortGroup.map((sort) => ({ ...sort, title: t(sort.title), onClick: () => setSort(sort) })),
        [t],
    );
    const sortedGroups = useMemo(() => {
        const newGroup = [...groups];

        if (sort.id === RECENT_ACTIVITY) return newGroup.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        if (sort.id === GROUP_NAME) return newGroup.sort((a, b) => a.name.localeCompare(b.name));

        return newGroup.filter((group) => group.admin);
    }, [groups, sort.id]);
    const { value: show, setFalse: handleHidden, setTrue: handleShow } = useBoolean(false);
    const dispatch = useDispatch();

    useEffect(() => {
        firstFetch || dispatch(getGroups());
    }, [dispatch, firstFetch]);

    return (
        <Wrapper>
            <div className="py-2">
                <Button onClick={handleShow} Icon={PeopleAddIcon} title={t('contacts.create-group')} rounded />
            </div>
            <Seperate />
            <div className="mt-4 flex flex-col">
                <div className="py-2.5 flex justify-between items-center">
                    <div className="text-sm font-medium">{t('contacts.group-joined')}</div>
                    <Popup data={sorts}>
                        <div className="cursor-pointer py-1 flex gap-1 items-center text-xs text-secondary dark:text-dark-secondary">
                            <span>
                                <SortArrowIcon />
                            </span>
                            <span>{t(sort.title)}</span>
                        </div>
                    </Popup>
                </div>
                {loading ? (
                    <List control={ContactGroupItemSkeleton} length={3} />
                ) : (
                    sortedGroups.map((group) => <ContactGroupItem group={group} key={group._id} />)
                )}
            </div>

            <CreateGroup show={show} onClickOutside={handleHidden} />
        </Wrapper>
    );
};

Group.propTypes = {};

export default Group;
