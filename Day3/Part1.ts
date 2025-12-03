import * as fs from 'fs';

const filePath: string = 'input.txt';

const content: string = fs.readFileSync(filePath, 'utf-8');
const lines: string[] = content.split(/\r?\n/);

let totalBatteryValue: number = 0;

for (let i = 0; i < lines.length; i++) {
    const batteryBank: string = lines[i];

    let batteryOne: number = 0;
    let batteryTwo: number = 0;

    let changed: boolean = false;

    for (let j = 0; j < batteryBank.length - 1; j++) {
        if (parseInt(batteryBank[j]) > batteryOne) {
            batteryOne = parseInt(batteryBank[j]);
            changed = true;
        }

        if (changed === true) {
            batteryTwo = parseInt(batteryBank[j+1]);
        }

        if (parseInt(batteryBank[j+1]) > batteryTwo) {
            batteryTwo = parseInt(batteryBank[j+1]);
        } else {
            changed = false;
        }
    }

    const batteryValue: number = parseInt(batteryOne.toString() + batteryTwo.toString());

    console.log(batteryValue)

    totalBatteryValue += batteryValue;
}

console.log(totalBatteryValue);