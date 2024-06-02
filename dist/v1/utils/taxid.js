"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTaxId = exports.getRandomSerialDecimal = void 0;
const verhoeff_1 = require("./verhoeff");
// Function to generate a random serial decimal
function getRandomSerialDecimal() {
    return Math.floor(Math.random() * 999999999);
}
exports.getRandomSerialDecimal = getRandomSerialDecimal;
// Function to generate a tax ID
function generateTaxId(clientId, now, randomSerialDecimal = getRandomSerialDecimal()) {
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
    const verhoeffProvider = new verhoeff_1.VerhoffProvider();
    const checkDigit = verhoeffProvider.generateVerhoeff(controlText);
    // Concatenate the initial part with the Verhoeff check digit
    const result = `${initial}${checkDigit}`.toUpperCase();
    return result;
}
exports.generateTaxId = generateTaxId;
// Function to convert memoryId to decimal
function toDecimal(memoryId) {
    return memoryId
        .split('')
        .map((ch) => (isNaN(parseInt(ch, 10)) ? ch.charCodeAt(0).toString() : ch))
        .join('');
}
//# sourceMappingURL=taxid.js.map