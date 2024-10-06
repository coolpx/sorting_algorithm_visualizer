// types
export type IterationResult = {
    highlight: number[];
    done: boolean;
};

// class
class SortingAlgorithm {
    array: number[];

    constructor(length: number) {
        this.array = [];
        for (let i = 0; i < length; i++) {
            this.array.push(i);
        }
        this.shuffle();
    }

    shuffle() {
        for (let i = this.array.size() - 1; i > 0; i--) {
            const j = math.random(0, i);
            const temp = this.array[i];
            this.array[i] = this.array[j];
            this.array[j] = temp;
        }
    }

    runIteration(): IterationResult {
        error('runIteration not implemented');
    }
}

export default SortingAlgorithm;
