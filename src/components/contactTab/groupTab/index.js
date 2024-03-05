import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PeopleAddIcon, SortArrowIcon } from '~/assets';
import Button from '../Button';
import Wrapper from '../Wrapper';
import Seperate from '../Seperate';
import ContactGroupItem from '~/components/contactGroupItem';

const Group = () => {
    const { t } = useTranslation();
    const { groups } = useSelector((state) => state.contactGroups);

    return (
        <Wrapper>
            <div className="py-2">
                <Button Icon={PeopleAddIcon} title={t('contacts.create-group')} rounded />
            </div>
            <Seperate />
            <div className="mt-4 flex flex-col">
                <div className="py-2.5 flex justify-between items-center">
                    <div className="text-sm font-medium">{t('contacts.group-joined')}</div>
                    <div className="flex gap-1 items-center text-xs text-secondary dark:text-dark-secondary">
                        <span>
                            <SortArrowIcon />
                        </span>
                        <span>{t('contacts.last-activity')}</span>
                    </div>
                </div>
                {groups.map((group) => (
                    <ContactGroupItem group={group} key={group.id} />
                ))}
            </div>
        </Wrapper>
    );
};

Group.propTypes = {};

export default Group;
