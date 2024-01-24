import PropTypes from 'prop-types';
import { classNames } from '~/utils';
import Header from './Header';

const Accordion = ({ icon, title, children, active, toggleActive }) => {
    return (
        <div className="select-none rounded border border-separate dark:border-dark-separate bg-white dark:bg-dark">
            <Header onClick={toggleActive} icon={icon} active={active}>
                {title}
            </Header>
            <div
                className={classNames(
                    'grid ease-linear transition-[grid-template-rows] duration-300',
                    active ? 'grid-rows-[1fr]' : 'grid-rows-0',
                )}
            >
                <div className="overflow-hidden">
                    <div className="p-2.5 ex:p-5">{children}</div>
                </div>
            </div>
        </div>
    );
};

Accordion.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired,
    active: PropTypes.bool,
    toggleActive: PropTypes.func,
};

export default Accordion;
