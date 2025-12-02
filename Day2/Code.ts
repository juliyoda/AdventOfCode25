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

        for (let patternLen = 1; patternLen <= numberLen / 2; patternLen++) {
            if (numberLen % patternLen === 0) {
                const pattern = numberStr.substring(0, patternLen);

                let isMatch: boolean = true;

                for (let j = patternLen; j < numberLen; j += patternLen) {
                    let comparePattern: string = numberStr.substring(j, j + patternLen);

                    if (comparePattern !== pattern) {
                        isMatch = false;
                        break;
                    }
                }

                if (isMatch) {
                    sum += numberToTest;
                    break;
                }

            }
        }
    }
}

console.log(sum);
