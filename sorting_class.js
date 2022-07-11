const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });

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
}


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

function perform () {
    if (validateInputFile(process.argv[2])) {
        data = getDataFromFile(process.argv[2]);
        dataArray = dataToArray(data);
    }

    // Lancement du tri à bulles de list.txt
    let sort1 = new Sort(dataArray);
    sort1.bubbleSort(dataArray, dataArray.length - 1);
    console.log (`Tri à bulles : ${sort1.nbComparisons} comparaisons - [${sort1.arrayToSort}].`);
}

perform();