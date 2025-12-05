import * as fs from 'fs';
import * as readline from "node:readline";

const filePath: string = 'input.txt';

let fruitFreshnessIDs: string[] = [];

interface Tuple {
    min: number;
    max: number;
}

async function main() {
    try {
        const data = await readFileUntilEmptyLine(filePath);
        fruitFreshnessIDs = data.firstArray;

        let numberFreshIngredientsIDs: number = 0;
        let finalIntervals: Tuple[] = [];

        for (let i = 0; i < fruitFreshnessIDs.length; i++) {
            const freshnessID: string = fruitFreshnessIDs[i];
            const minNumber: number = parseInt(freshnessID.split('-')[0], 10);
            const maxNumber: number = parseInt(freshnessID.split('-')[1], 10);

            let newInterval: Tuple = {min: minNumber, max: maxNumber};
            let contained = false;

            for (let j = 0; j < finalIntervals.length; j++) {
                const interval: Tuple = finalIntervals[j];

                if (newInterval.min >= interval.min && newInterval.max <= interval.max) {
                    contained = true;

                    break;
                }
                else if (newInterval.min < interval.min && newInterval.max >= interval.min && newInterval.max <= interval.max) {
                    newInterval.max = interval.max;
                    finalIntervals.splice(j, 1);

                    j--;
                }
                else if (newInterval.min >= interval.min && newInterval.min <= interval.max && newInterval.max > interval.max) {
                    newInterval.min = interval.min;
                    finalIntervals.splice(j, 1);

                    j--;
                }
                else if (newInterval.min <= interval.min && newInterval.max >= interval.max) {
                    finalIntervals.splice(j, 1);

                    j--;
                }
            }

            if (!contained) {
                finalIntervals.push(newInterval);
            }
        }

        console.log(finalIntervals)

        for (let i = 0; i < finalIntervals?.length || 0; i++) {
            const interval: Tuple = finalIntervals[i];

            const minNumber: number = interval.min;
            const maxNumber: number = interval.max;

            numberFreshIngredientsIDs += (maxNumber - minNumber + 1);
        }

        console.log(numberFreshIngredientsIDs);
    } catch (err) {
        console.error(err);
    }
}

main();

async function readFileUntilEmptyLine(filePath: string): Promise<{ firstArray: string[], secondArray: string[] }> {
    let firstArray: string[] = [];
    let secondArray: string[] = [];

    let useSecondArray: boolean = false;

    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        if (line.trim() === '') {
            useSecondArray = true;
            continue;
        }

        if (useSecondArray) {
            secondArray.push(line);
        } else {
            firstArray.push(line);
        }
    }

    return {firstArray, secondArray};
}
