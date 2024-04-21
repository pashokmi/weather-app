// @ts-ignore
type PartitionResult = {
    group1: number[];
    group2: number[];
};

function partitionPeople(weights: number[]): PartitionResult {
    const totalWeight = weights.reduce((acc, val) => acc + val, 0);
    const sumHalf = Math.floor(totalWeight / 2);
    const numWeights = weights.length;
    let possibleSums: boolean[][] = Array.from({length: numWeights + 1}, () => Array(sumHalf + 1).fill(false));
    possibleSums[0][0] = true;

    for (let weightIndex = 1; weightIndex <= numWeights; weightIndex++) {
        const currentWeight = weights[weightIndex - 1];
        for (let sum = 0; sum <= sumHalf; sum++) {
            if (sum < currentWeight) {
                possibleSums[weightIndex][sum] = possibleSums[weightIndex - 1][sum];
            } else {
                possibleSums[weightIndex][sum] = possibleSums[weightIndex - 1][sum] || possibleSums[weightIndex - 1][sum - currentWeight];
            }
        }
    }

    let closestSum = 0;
    for (let sum = sumHalf; sum >= 0; sum--) {
        if (possibleSums[numWeights][sum]) {
            closestSum = sum;
            break;
        }
    }

    let group1: number[] = [];
    let remainingSum = closestSum;
    for (let weightIndex = numWeights; weightIndex > 0 && remainingSum > 0; weightIndex--) {
        if (!possibleSums[weightIndex - 1][remainingSum]) {
            group1.push(weights[weightIndex - 1]);
            remainingSum -= weights[weightIndex - 1];
        }
    }

    let group2 = weights.filter(x => !group1.includes(x));

    return { group1, group2 };
}

const weights = [1, 2, 3, 4, 5, 9];
console.log(partitionPeople(weights));