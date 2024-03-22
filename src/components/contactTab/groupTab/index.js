import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PeopleAddIcon, SortArrowIcon } from '~/assets';
import ContactGroupItem from '~/components/contactGroupItem';
import Popup from '~/components/popup';
import { sortGroup } from '~/constants';
import { useBoolean } from '~/hooks';
import Button from '../Button';
import Seperate from '../Seperate';
import Wrapper from '../Wrapper';
import CreateGroup from './createGroup';

const Group = () => {
    const { t } = useTranslation();
    const { groups } = useSelector((state) => state.contactGroups);
    const [sort, setSort] = useState(sortGroup[0]);
    const sorts = useMemo(
        () => sortGroup.map((sort) => ({ ...sort, title: t(sort.title), onClick: () => setSort(sort) })),
        [t],
    );
    const sortedGroups = useMemo(() => sorts && groups, [groups, sorts]);
    // FIXME init value: true
    const { value: show, setFalse: handleHidden, setTrue: handleShow } = useBoolean(false);

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
                {sortedGroups.map((group) => (
                    <ContactGroupItem group={group} key={group.id} />
                ))}
            </div>

            <CreateGroup show={show} onClickOutside={handleHidden} />
        </Wrapper>
    );
};

Group.propTypes = {};

export default Group;
