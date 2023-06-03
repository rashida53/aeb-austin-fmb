export const timeConverter = (timestamp) => {
    if (timestamp) {
        let epoch = parseFloat(timestamp);
        let dateFromDb = new Date(epoch);
        let addHoursForTimezone = dateFromDb.setHours(dateFromDb.getHours() + 6);
        return new Date(addHoursForTimezone).toLocaleDateString('en-us', {
            weekday: "long",
            month: "short",
            day: "numeric"
        });
    }
}

export const isDateXDaysFromToday = (date, days) => {
    let today = new Date();
    let daysFromToday = new Date(today.setDate(today.getDate() + days));
    return new Date(parseFloat(date)) >= daysFromToday;
};

export const showSignupForm = (event) => {
    hideAllForms();
    const signupForm = document.getElementById("form" + event.target.id);
    signupForm.style.visibility = "visible";
};

const hideAllForms = () => {
    let allSignupDivs = document.getElementsByClassName("signupForm");
    if (allSignupDivs.length > 0) {
        for (let i = 0; i < allSignupDivs.length; i++) {
            allSignupDivs[i].style.visibility = "hidden";
        }
    }
}



