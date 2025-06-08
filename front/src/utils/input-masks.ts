export function numericInput(input: string) {
    return input.replace(/\D/g, '')
}

export function currencyInput(input: string) {
    const numericValue = input.replace(/\D/g, '');

    if (numericValue.length === 0) return '';
    const number = parseFloat(numericValue) / 100;

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