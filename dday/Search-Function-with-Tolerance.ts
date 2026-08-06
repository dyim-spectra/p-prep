/*
Problem
Find occurrences of a multi-word query inside a text where each consecutive query word can have up to k words between them.
Example:
text = "a b c d e f g h i b d f h"
query = "b d f h"
k = 1


text =
"the cat climbed onto the roof before watching the birds in the distance."
query =
"cat birds roof"
k = 2
result = []

text =
"sarah packed her laptop and charger before leaving for work."
query =
"sarah laptop leaving work"
k = 3
result = [0]
*/


const search = (t: string, q: string, k: number): number[] => {
    const result: number[] = []
    const tArr = t.split(' ')
    const qArr = q.split(' ')

    let potental; //potential to be put into pushed to result
    let pointer; // pointer for the query array to be compared to the next value
    let pointerLastFound;

    for (let i = 0; i < tArr.length; i++) {
        // if the first word is found, assign a 'potental' candidate and increase the pointer 
        if (tArr[i].toLowerCase() === qArr[0].toLowerCase()) {
            potental = i;
            pointerLastFound = i
            pointer = 1;
            // if the qArr[pointer]'s value is found and has a gap of three 
        } else if (
            typeof potental === 'number' &&
            typeof pointer === 'number' &&
            typeof pointerLastFound === 'number' &&
            pointer < qArr.length &&
            qArr[pointer].toLowerCase() === tArr[i].toLowerCase() &&
            (i - pointerLastFound - 1) <= k //gap of three
        ) {
            pointerLastFound = i
            pointer += 1;
        } else if (
            typeof pointerLastFound === 'number' &&
            (i - pointerLastFound) > k
        ) {
            potental = undefined
            pointerLastFound = undefined
            pointer = 0

        }

        // add to the result if the pointer is larger than the query array
        if (
            typeof potental === 'number' &&
            typeof pointer === 'number' &&
            pointer >= qArr.length - 1
        ) {
            result.push(potental)
            potental = undefined
            pointerLastFound = undefined
            pointer = 0
        }


    }

    return result
}

const text =
    "John wrote the report before the meeting Later John quickly wrote another report before the morning meeting Finally John wrote report before meeting"

const query =
    "John report meeting"

const k = 3

search(text, query, k)