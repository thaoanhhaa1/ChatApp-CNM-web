import api, { axiosClient } from '~/api';

const phonebookService = {
    getPhonebook: () => axiosClient.get(api.getPhonebook()),
};

export default phonebookService;
