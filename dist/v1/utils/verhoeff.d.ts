export declare class VerhoffProvider {
    private readonly multiplicationTable;
    private readonly permutationTable;
    private readonly inverseTable;
    /**
     * Validates that an entered number is Verhoeff compliant.
     * NB: Make sure the check digit is the last one!
     * @param num
     * @returns True if Verhoeff compliant, otherwise false
     */
    validateVerhoeff(num: string): boolean;
    /**
     * For a given number generates a Verhoeff digit
     * Append this check digit to num
     * @param num
     * @returns Verhoeff check digit as string
     */
    generateVerhoeff(num: string): string;
    /**
     * Converts a string to a reversed integer array.
     * @param num
     * @returns Reversed integer array
     */
    private stringToReversedIntArray;
}
//# sourceMappingURL=verhoeff.d.ts.map