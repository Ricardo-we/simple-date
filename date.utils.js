export function safeDateParse(date = new Date()) {
    try {
        if (!date) return new Date();
        return new Date(date);
    } catch (error) {
        return new Date();
    }
}

export function getISODateTime(date) {
    try {
        return safeDateParse(date)?.toISOString();
    } catch (error) {
        return safeDateParse().toISOString();
    }
}

export function getISODate(date) {
    return getISODateTime(date).split("T")[0];
}

export function getLocalDateFromString(date) {
    const result = safeDateParse(date || new Date()).toLocaleString();
    return result.substring(0, result.length - 3);
}

export function getArrayOfYears(startAt, nextYears = 1000) {
    const yearsArray = [];
    const startAtYear = new Date();
    if (startAt) startAtYear.setFullYear(startAt);

    for (let i = 0; i <= nextYears; i++) {
        yearsArray.push(startAtYear.getFullYear() + i);
    }

    return yearsArray;
}

export function getArrayOfMonths(jumps = 1, startAt = 0, endAt = 12) {
    const result = [];
    for (let i = startAt; i < endAt; i += jumps) {
        const nextMonthDate = new Date();
        nextMonthDate.setFullYear(new Date().getFullYear(), i, 1);
        nextMonthDate.setHours(0, 0, 0, 0);
        result.push(nextMonthDate);
    }

    return result;
}

function firstLetterUpperCase(word) {
    const firstLetterUpperCase = word.charAt(0).toUpperCase();
    return firstLetterUpperCase + word.substring(1);
}

export { firstLetterUpperCase, };
