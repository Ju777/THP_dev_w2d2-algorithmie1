const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });

// Les 3 fonctions qui suivent valident et formattent les données du fichier list.txt en un tableau
function validateInputFile(argument) {
    if (argument === "list.txt") {
        return true;
    }
    else {
        console.log("Erreur, veuillez saisir :\n-> node sorting.js list.txt <-");
        return false;
    }
}

function getDataFromFile(fileName) {
    var data;
    try {
        data = fs.readFileSync(fileName, 'utf8');
    } catch (error) {
        console.error(error.message);
    }
    return data;
}

function dataToArray(data) {
    let array = data.split(' ');
    array = array.map(string => string = parseInt(string));
    return array;
}
// Fin des 3 fonctions de validation et formatage des données de list.txt en un tableau

// La fonction suivante ré-intialise le tableau de données à trier.
function dataReset(){
    if (validateInputFile(process.argv[2])) {
        const data = getDataFromFile(process.argv[2]);
        const dataArray = dataToArray(data);
        return dataArray;
    } else {
        return false;
    }
}

class Sort {
    constructor(arrayToSort) {
        this.arrayToSort = arrayToSort;
        this.nbComparisons = 0;
    }

    resetNbComparisons() {
        this.nbComparisons = 0;
    }

    bubbleSort(array, limit) {
        if (limit === 0) {
            // console.log(`Tri à bulles terminé : ${this.nbComparisons} comparaisons.`);
            return array;
        }

        for(let i = 0 ; i < limit ; i++) {
            if (array[i] > array[i+1]) {
                this.nbComparisons++;
                // console.log(`${this.nbComparisons}e comparaison.`)
                // prompt("[ENTER]");

                // Swap avec la déstructuration
                [array[i], array[i+1]] = [array[i+1], array[i]];
            }      
        }
        this.bubbleSort(array, limit - 1);

        return array;
    }

    insertionSort(array) {
        for(let i = 1 ; i < array.length ; i++) {
            let current = array[i];
            let j = i -1;
            while(j >= 0 && array[j] > current) {
                this.nbComparisons++;
                array[j+1] = array[j];
                j--;
            }
            array[j+1] = current;
        }

        return array;
    }

    selectionSort(array) {
        for(let i = 0 ; i < array.length ; i++) {
            let current_min = array[i];
            for(let j = i+1 ; j < array.length ; j++) {
                if (array[j] < current_min) {
                    current_min = array[j];
                    this.nbComparisons++;
                }
            }
            let min_index = array.indexOf(current_min);
            [array[i], array[min_index]] = [array[min_index], array[i]];
        }
        return array;
    }

    quickSort(array, start, end) { // Using recursion
        // Base cases
        if (start >= end ) { return array; }
        else {
            let pivIndex = this.partition(array, start, end);
            this.quickSort(array, start, pivIndex-1);
            this.quickSort(array, pivIndex+1, end);
            return array;
        }
    }

    partition(array, start, end) {
        let pivot = array[start];
        let partIndex = start+1;

        // Boucle : on compare chaque élément du tableau avec le pivot
        // Si l'élément est plus petit => swap entre l'élément et l'élément qui est au pIndex.
        for(let j = start+1 ; j <= end ; j++) {

            if (array[j] < pivot) {
                this.nbComparisons++;
                // on fait le swap en question.
                [array[j], array[partIndex]] = [array[partIndex], array[j]];
                // l'index de partition avance d'un cran pour isoler la partie triée sur la gauche
                partIndex++;
            }
        }

        //Quand toutes les valeurs ont été testées (et donc triés gauche/droite)
        // Il faut placer le pivot juste avant le partIndex : pour cela on fait donc un swap entre pivot et array[partIndex-1]
        [array[start], array[partIndex-1]] = [array[partIndex-1], array[start]];
        return partIndex-1;        
    }
}

function perform () {
    var rawArray = dataReset();
    
    if (rawArray !== false) {
        let sort = new Sort(rawArray);

        // Lancement du tri à bulles
        let bubbleSorting = sort.bubbleSort(rawArray, rawArray.length - 1);
        console.log(`Tri à bulles : ${sort.nbComparisons} comparaisons - [${bubbleSorting}].`);
        prompt("[ENTER]");

        // Lancement du tri par insertion
        rawArray = dataReset();
        sort.resetNbComparisons();

        let insertionSorting = sort.insertionSort(rawArray);
        console.log(`Tri par insertion : ${sort.nbComparisons} comparaisons - [${insertionSorting}].`);
        prompt("[ENTER]");

        // Lancement du tri par sélection
        rawArray = dataReset();
        sort.resetNbComparisons();
        
        let selectionSorting = sort.selectionSort(rawArray);
        console.log(`Tri par sélection : ${sort.nbComparisons} comparaisons - [${selectionSorting}].`);
        prompt("[ENTER]");

        // Lancement du tri rapide
        rawArray = dataReset();
        sort.resetNbComparisons();
        
        let quickSorting = sort.quickSort(rawArray, 0, rawArray.length - 1);
        console.log(`Tri rapide : ${sort.nbComparisons} comparaisons - [${quickSorting}].`);
        prompt("[ENTER]");
    }
}

perform();