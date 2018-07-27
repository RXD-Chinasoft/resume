import { notification } from 'antd';

export const OpenNotificationWithIcon = (type, title, message) => {
    notification[type]({
        message: title,
        description: message,
    });
};