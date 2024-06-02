"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerhoffProvider = void 0;
class VerhoffProvider {
    constructor() {
        // The multiplication table
        this.multiplicationTable = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
            [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
            [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
            [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
            [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
            [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
            [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
            [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
        ];
        // The permutation table
        this.permutationTable = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
            [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
            [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
            [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
            [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
            [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
            [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
        ];
        // The inverse table
        this.inverseTable = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];
    }
    /**
     * Validates that an entered number is Verhoeff compliant.
     * NB: Make sure the check digit is the last one!
     * @param num
     * @returns True if Verhoeff compliant, otherwise false
     */
    validateVerhoeff(num) {
        let c = 0;
        const myArray = this.stringToReversedIntArray(num);
        for (let i = 0; i < myArray.length; i++) {
            c = this.multiplicationTable[c][this.permutationTable[i % 8][myArray[i]]];
        }
        return c === 0;
    }
    /**
     * For a given number generates a Verhoeff digit
     * Append this check digit to num
     * @param num
     * @returns Verhoeff check digit as string
     */
    generateVerhoeff(num) {
        let c = 0;
        const myArray = this.stringToReversedIntArray(num);
        for (let i = 0; i < myArray.length; i++) {
            c = this.multiplicationTable[c][this.permutationTable[(i + 1) % 8][myArray[i]]];
        }
        return this.inverseTable[c].toString();
    }
    /**
     * Converts a string to a reversed integer array.
     * @param num
     * @returns Reversed integer array
     */
    stringToReversedIntArray(num) {
        const myArray = Array.from(num, (digit) => parseInt(digit, 10)).reverse();
        return myArray;
    }
}
exports.VerhoffProvider = VerhoffProvider;
//# sourceMappingURL=verhoeff.js.map