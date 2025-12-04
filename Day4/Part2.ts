import * as fs from 'fs';

const filePath: string = 'input.txt';

const content: string = fs.readFileSync(filePath, 'utf-8');
const lines: string[] = content.split(/\r?\n/);

let shelve: string[][] = new Array(lines.length);
let nextIterationShelve: string[][] = new Array(lines.length);
let checkShelve: string[][] = new Array(lines.length);

for (let x = 0; x < lines.length; x++) {
    shelve[x] = new Array(lines[x].length);
    nextIterationShelve[x] = new Array(lines[x].length);
    checkShelve[x] = new Array(lines[x].length);

    for (let y = 0; y < lines[x].length; y++) {
        shelve[x][y] = lines[x].charAt(y);
        nextIterationShelve[x][y] = lines[x].charAt(y);
        checkShelve[x][y] = lines[x].charAt(y);
    }
}

let numberPaperrolls: number = 0;

let rollRemoved: boolean = true;

while (rollRemoved) {
    rollRemoved = false;

    for (let x = 0; x < shelve.length; x++) {
        for (let y = 0; y < shelve[x].length; y++) {
            nextIterationShelve[x][y] = shelve[x][y];
            if (nextIterationShelve[x][y] === 'x') {
                nextIterationShelve[x][y] = '.';
            }

            if (shelve[x][y] === '@') {
                if (checkNumberPaperrolls(x, y)) {
                    nextIterationShelve[x][y] = 'x';
                    checkShelve[x][y] = 'x';
                    numberPaperrolls++;

                    rollRemoved = true;
                }
            }
        }
    }

    shelve = nextIterationShelve;
}

printShelve(checkShelve);

console.log(numberPaperrolls);

function inBounds(x: number, y: number): boolean {
    if (x < 0 || x >= shelve.length) {
        return false;
    }

    if (y < 0 || y >= shelve[x].length) {
        return false;
    }

    return true;
}

function checkNumberPaperrolls(x: number, y: number): boolean {
    let count: number = 0;

    for (let xTest = x - 1; xTest <= x + 1; xTest++) {
        for (let yTest = y - 1; yTest <= y + 1; yTest++) {
            if (inBounds(xTest, yTest) && !(xTest === x && yTest === y)) {
                if (shelve[xTest][yTest] === '@') {
                    count++;
                }
            }
        }
    }

    if (count < 4) {
        return true;
    }

    return false;
}

function printShelve(shelve: string[][]): void {
    for (let x = 0; x < shelve.length; x++) {
        let line: string = '';
        for (let y = 0; y < shelve[x].length; y++) {
            line += shelve[x][y];
        }
        console.log(line);
    }
}
