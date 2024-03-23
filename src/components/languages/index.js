import Item from './Item';

const Languages = () => {
    return (
        <div className="text-sm text-primary-color absolute bottom-[30px] left-0 right-0 justify-center flex gap-2.5">
            <Item language="vn">Tiếng Việt</Item>
            <Item language="en">English</Item>
        </div>
    );
};

Languages.propTypes = {};

export default Languages;
