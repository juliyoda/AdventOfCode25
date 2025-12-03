import * as fs from 'fs';

const filePath: string = 'input.txt';

const content: string = fs.readFileSync(filePath, 'utf-8');
const batteryBanks: string[] = content.split(/\r?\n/);

let totalBatteryValue: number = 0;

for (let i = 0; i < batteryBanks.length; i++) {
    const batteryBank: string = batteryBanks[i];
    const batteryBankLength: number = batteryBank.length;

    console.log("batteryBank", batteryBank)

    let totalBattery: string = '';

    let position: number = -1;

    for (let j = 0; j < 12; j++) {
        let battery: number = 0;
        for (let k = 0; k < batteryBankLength; k++) {
            if (parseInt(batteryBank[k]) > battery) {
                if (batteryBankLength - k >= 12 - j && k > position) {
                    battery = parseInt(batteryBank[k]);
                    position = k;
                }
            }
        }
        totalBattery += battery.toString();
    }

    totalBatteryValue += parseInt(totalBattery);
}

console.log(totalBatteryValue);