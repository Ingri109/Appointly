// hooks/useAppointmentDate.ts
export function useAppointmentDate() {
    const getDefaultDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        now.setMinutes(30 * Math.ceil(now.getMinutes() / 30));
        return now.toISOString().slice(0, 16);
    };

    const getMinDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    };

    const isWithinWorkingHours = (datetime: string) => {
        const date = new Date(datetime);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const isHalfHour = minute === 0 || minute === 30;
        const isWorkingTime = hour >= 9 && hour < 17;
        return isWorkingTime && isHalfHour;
    };

    return { getDefaultDateTime, getMinDateTime, isWithinWorkingHours };
}
