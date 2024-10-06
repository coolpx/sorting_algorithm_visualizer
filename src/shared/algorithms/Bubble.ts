import SortingAlgorithm, { IterationResult } from 'shared/modules/SortingAlgorithm';

// class
class BubbleSort extends SortingAlgorithm {
    private currentIndex: number = 0;
    private lastUnsorted: number;

    constructor(length: number) {
        super(length);
        this.lastUnsorted = this.array.size() - 1;
    }

    runIteration(): IterationResult {
        let highlight: number[] = [];
        let done = false;

        if (this.currentIndex < this.lastUnsorted) {
            highlight = [this.currentIndex, this.currentIndex + 1];
            if (this.array[this.currentIndex] > this.array[this.currentIndex + 1]) {
                const temp = this.array[this.currentIndex];
                this.array[this.currentIndex] = this.array[this.currentIndex + 1];
                this.array[this.currentIndex + 1] = temp;
            }

            this.currentIndex++;
        } else {
            this.lastUnsorted--;
            this.currentIndex = 0;

            if (this.lastUnsorted <= 0) {
                done = true;
            }
        }

        return { highlight, done };
    }
}

export default BubbleSort;
