export function calculatePrice(pricePerDay: number, days: number, delivery: boolean) {
    return pricePerDay * days + (delivery ? 25000 : 0);
}