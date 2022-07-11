const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });

// Les 3 fonctions qui suivent valident et formattent les données du fichier list.txt en un tableau
function validateInputFile(argument) {
    if (argument === "list.txt") {
        return true;
    }
    else {
        console.log("Erreur : veuillez entrez node sorting_class.js list.txt .");
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

}

function perform () {
    var rawArray = dataReset();
    
    if (rawArray !== false) {
        let sort = new Sort(rawArray);

        // Lancement du tri à bulles de list.txt
        sort.bubbleSort(rawArray, rawArray.length - 1);
        console.log(`Tri à bulles : ${sort.nbComparisons} comparaisons - [${sort.arrayToSort}].`);
        prompt("[ENTER]");

        // Lancement du tri par insertion de list.txt
        rawArray = dataReset();
        sort.resetNbComparisons();
        // let sort2 = new Sort(rawArray);
        sort.insertionSort(rawArray);
        console.log(`Tri par insertion : ${sort.nbComparisons} comparaisons - [${sort.arrayToSort}].`);
        prompt("[ENTER]");

        // Lancement du tri par sélection de list.txt
        rawArray = dataReset();
        // let sort3 = new Sort(rawArray);
        sort.resetNbComparisons();
        sort.selectionSort(rawArray);
        console.log(`Tri par sélection : ${sort.nbComparisons} comparaisons - [${sort.arrayToSort}].`);
        prompt("[ENTER]");
    }
}

perform();