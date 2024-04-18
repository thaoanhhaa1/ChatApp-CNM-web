import { createContext, useContext } from 'react';

const ProfileContext = createContext();

const ProfileProvider = (props) => {
    return <ProfileContext.Provider {...props} />;
};

const useProfile = () => useContext(ProfileContext);

export { ProfileProvider };

export default useProfile;
