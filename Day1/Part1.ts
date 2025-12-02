import * as fs from 'fs';

const filePath: string = 'input.txt';
let dial: number = 50;

const limitLeft: number = 0;
const limitRight: number = 99;

let numberOfZeros: number = 0;

const content: string = fs.readFileSync(filePath, 'utf-8');
const lines: string[] = content.split(/\r?\n/);

for (let i = 0; i < lines.length; i++) {
    const direction: string = lines[i].charAt(0);
    const steps: number = parseInt(lines[i].slice(1), 10);

    if (direction === 'L') {
        for (let i = steps; i > 0; i--) {
            dial -= 1;

            if (dial < 0) {
                dial = limitRight;
            }
        }
    } else {
        for (let i = steps; i > 0; i--) {
            dial += 1;

            if (dial > 99) {
                dial = limitLeft;
            }
        }
    }

    if(dial === 0) {
        numberOfZeros += 1;
    }
}

console.log(numberOfZeros)
