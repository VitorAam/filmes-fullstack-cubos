export function numericInput(input: string) {
    return input.replace(/\D/g, '')
}

export function currencyInput(input: string) {
    const isNegative = input.trim().startsWith('-');

    const numericValue = input.replace(/\D/g, '');

    if (numericValue.length === 0) return '';

    let number = parseFloat(numericValue) / 100;
    if (isNegative) number *= -1;

    return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
}

export function numericLimitInput(input: string, limit: number) {
    let value = input.replace(/\D/g, '');
    if (value) {
        value = Math.min(Number(value), limit).toString();
    }
    return value
}

export function hourAndMinutesInput(input: number) {
    const hours = (input / 60).toFixed()
    const minutes = input % 60

    return `${hours}h ${minutes}m`
}

export function orderedDate(input: string) {
    const destructedDate = input.split('-')

    return `${destructedDate[2]}/${destructedDate[1]}/${destructedDate[0]}`
}

export function thousandSeparator(input: string) {
    const numericValue = input.replace(/\D/g, '');

    if (numericValue.length === 0) return '';

    return parseInt(numericValue, 10).toLocaleString('pt-BR');
}