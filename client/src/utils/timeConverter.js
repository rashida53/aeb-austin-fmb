export const timeConverter = (timestamp) => {
    if (timestamp) {
        return new Date(parseFloat(timestamp)).toLocaleDateString('en-us', {
            weekday: "long",
            month: "short",
            day: "numeric"
        });
    }
}