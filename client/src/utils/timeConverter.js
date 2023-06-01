export const timeConverter = (timestamp) => {
    if (timestamp) {
        var epoch = parseFloat(timestamp);
        var dateFromDb = new Date(epoch);
        var addHoursForTimezone = dateFromDb.setHours(dateFromDb.getHours() + 6);
        return new Date(addHoursForTimezone).toLocaleDateString('en-us', {
            weekday: "long",
            month: "short",
            day: "numeric"
        });
    }
}