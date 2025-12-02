import * as fs from 'fs';

const filePath: string = 'input.txt';

const content: string = fs.readFileSync(filePath, 'utf-8');
const ranges: string[] = content.trim().split(/,/);

console.log(ranges)

let sum: number = 0;

for (let a = 0; a < ranges.length; a++) {
    const numberOne: number = parseInt(ranges[a].split('-')[0], 10);
    const numberTwo: number = parseInt(ranges[a].split('-')[1], 10);

    const range: number = numberTwo - numberOne;

    for (let b = 0; b <= range; b++) {

        const numberToTest: number = numberOne + b;
        const numberStr: string = numberToTest.toString();

        let numberLen = numberStr.length;

        if (numberStr.substring(0, numberLen/2) === numberStr.substring(numberLen/2)) {
            sum += numberToTest;
        }
    }
}

console.log(sum);
