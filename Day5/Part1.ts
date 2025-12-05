import * as fs from 'fs';
import * as readline from "node:readline";

const filePath: string = 'input.txt';

let fruitFreshnessIDs: string[] = [];
let fruitIDs: string[] = [];

async function main() {
    try {
        const data = await readFileUntilEmptyLine(filePath);
        fruitFreshnessIDs = data.firstArray;
        fruitIDs = data.secondArray;

        let numberFreshIngredientsIDs: number = 0;

        for (let i = 0; i < fruitIDs.length; i++) {
            const fruitID = fruitIDs[i];

            for (let j = 0; j < fruitFreshnessIDs.length; j++) {
                const freshnessID: string = fruitFreshnessIDs[j];

                const minNumber: number = parseInt(freshnessID.split('-')[0], 10);
                const maxNumber: number = parseInt(freshnessID.split('-')[1], 10);

                const fruitNumber = parseInt(fruitID, 10);
                if (fruitNumber >= minNumber && fruitNumber <= maxNumber) {
                    numberFreshIngredientsIDs++;
                    break;
                }
            }
        }

        console.log(numberFreshIngredientsIDs);
    } catch (err) {
        console.error(err);
    }
}

main();

async function readFileUntilEmptyLine(filePath: string): Promise<{firstArray: string[], secondArray: string[]}> {
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
