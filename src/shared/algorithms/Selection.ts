import SortingAlgorithm, { IterationResult } from 'shared/modules/SortingAlgorithm';

// class
class SelectionSort extends SortingAlgorithm {
    private currentIndex: number = 0;
    private minIndex: number = 0;
    private sortedIndex: number = 0;

    constructor(length: number) {
        super(length);
    }

    runIteration(): IterationResult {
        let highlight: number[] = [];
        let done = false;

        if (this.sortedIndex < this.array.size() - 1) {
            highlight = [this.currentIndex, this.minIndex];

            // Find the smallest element in the unsorted portion
            if (this.array[this.currentIndex] < this.array[this.minIndex]) {
                this.minIndex = this.currentIndex;
            }

            // Move to the next element in the unsorted portion
            this.currentIndex++;

            // If we've scanned the entire unsorted portion, swap
            if (this.currentIndex >= this.array.size()) {
                // Swap the smallest element found with the start of the unsorted portion
                const temp = this.array[this.sortedIndex];
                this.array[this.sortedIndex] = this.array[this.minIndex];
                this.array[this.minIndex] = temp;

                // Move the sorted boundary and reset currentIndex and minIndex
                this.sortedIndex++;
                this.currentIndex = this.sortedIndex;
                this.minIndex = this.sortedIndex;
            }
        } else {
            // If we reach the end of sorting
            done = true;
        }

        return { highlight, done };
    }
}

export default SelectionSort;
