import * as crypto from 'crypto';

export function getRandomNumber(max: number): number {
    const randomBytes = crypto.randomBytes(4);
    const randomNumber = randomBytes.readUInt32BE(0);
    return randomNumber % max;
}