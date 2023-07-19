export const toHoursAndMinutes = totalMinutes => {
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    return {hrs, mins};
}