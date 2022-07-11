const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });

// Les 3 fonctions qui suivent valident et formattent les données du fichier list.txt en un tableau
function validateInputFile(argument) {
    if (argument === "list.txt") {
        return true;
    }
    else {
        console.log("Erreur : le nom du fichier de données doit être list.txt.");
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
    }
}

class Sort {
    constructor(arrayToSort) {
        this.arrayToSort = arrayToSort;
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
                // Swap avec variable temporaire était possible

                // Swap avec déstructuration
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
}

function perform () {

    // Lancement du tri à bulles de list.txt
    var rawArray = dataReset();
        
    let sort1 = new Sort(rawArray);
    sort1.bubbleSort(rawArray, rawArray.length - 1);
    console.log(`Tri à bulles : ${sort1.nbComparisons} comparaisons - [${sort1.arrayToSort}].`);
    prompt("[ENTER]");

    // Lancement du tri par insertion de list.txt
    rawArray = dataReset();
  
    let sort2 = new Sort(rawArray);
    sort2.insertionSort(rawArray,0);
    console.log(`Tri par insertion : ${sort2.nbComparisons} comparaisons - [${sort2.arrayToSort}].`);
    prompt("[ENTER]");

    // Lancement du tri par sélection de list.txt
    rawArray = dataReset();
  
    let sort3 = new Sort(rawArray);
}

perform();