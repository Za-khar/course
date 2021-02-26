import {apiClient} from '../../../../../config/axios';

export const socialAuth = async (user) => {
    return apiClient.post(`/auth/social/${user._provider}`, user);
}

