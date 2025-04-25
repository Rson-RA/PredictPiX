import { BASE_URL } from '@/constants/Config';

const getFullAvatarUrl = (avatarUrl: string | null | undefined) => {
    if (!avatarUrl) {
        return `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 100)}`;
    }
    return BASE_URL + avatarUrl;
};

const getFullName = (firstName: string, lastName: string) => {
    if (!firstName && !lastName) {
        return 'Unknown';
    }
    return `${firstName} ${lastName}`;
};

export { getFullAvatarUrl, getFullName };


