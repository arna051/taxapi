import { VerhoffProvider } from "./verhoeff";

// Function to generate a random serial decimal
export function getRandomSerialDecimal(): number {
    return Math.floor(Math.random() * 999999999);
}


// Function to generate a tax ID
export function generateTaxId(clientId: string, now: Date, randomSerialDecimal: number = getRandomSerialDecimal()): string {
    // Memory ID (example: "ABC123")
    const memoryId = clientId; // Replace with your actual logic to get memory ID

    // Convert the date to a hexadecimal string
    const timeDayRange = Math.floor(now.getTime() / (1000 * 3600 * 24));
    const hexTime = timeDayRange.toString(16).padStart(5, '0');

    // Convert the serial number to a hexadecimal string
    const hexSerial = randomSerialDecimal.toString(16).padStart(10, '0');

    // Generate the initial part of the tax ID
    const initial = `${memoryId}${hexTime}${hexSerial}`;

    // Calculate the Verhoeff control text
    const controlText = `${toDecimal(memoryId)}${timeDayRange.toString().padStart(6, '0')}${randomSerialDecimal.toString().padStart(12, '0')}`;

    // Generate the Verhoeff check digit
    const verhoeffProvider = new VerhoffProvider();
    const checkDigit = verhoeffProvider.generateVerhoeff(controlText);

    // Concatenate the initial part with the Verhoeff check digit
    const result = `${initial}${checkDigit}`.toUpperCase();

    return result;
}

// Function to convert memoryId to decimal
function toDecimal(memoryId: string): string {
    return memoryId
        .split('')
        .map((ch) => (isNaN(parseInt(ch, 10)) ? ch.charCodeAt(0).toString() : ch))
        .join('');
}