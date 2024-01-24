import { createPortal } from 'react-dom';

const createPortalWrapper = () => {
    const element = document.createElement('div');
    element.id = 'portal-wrapper';

    return element;
};

const portalWrapper = createPortalWrapper();
document.body.appendChild(portalWrapper);

const Portal = ({ children }) => {
    return createPortal(children, portalWrapper);
};

export default Portal;
