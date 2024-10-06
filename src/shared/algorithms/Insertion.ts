import SortingAlgorithm, { IterationResult } from 'shared/modules/SortingAlgorithm';

// class
class InsertionSort extends SortingAlgorithm {
    private currentIndex: number = 1;
    private innerIndex: number = 1;

    constructor(length: number) {
        super(length);
    }

    runIteration(): IterationResult {
        let highlight: number[] = [];
        let done = false;

        if (this.currentIndex < this.array.size()) {
            highlight = [this.innerIndex, this.innerIndex - 1];

            if (
                this.innerIndex > 0 &&
                this.array[this.innerIndex] < this.array[this.innerIndex - 1]
            ) {
                const temp = this.array[this.innerIndex];
                this.array[this.innerIndex] = this.array[this.innerIndex - 1];
                this.array[this.innerIndex - 1] = temp;

                this.innerIndex--;
            } else {
                this.currentIndex++;
                this.innerIndex = this.currentIndex;
            }
        } else {
            done = true;
        }

        return { highlight, done };
    }
}

export default InsertionSort;
