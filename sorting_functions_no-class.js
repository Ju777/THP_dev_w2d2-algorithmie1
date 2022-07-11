const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });
var bubbleComparisons = 0;

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

function bubbleSort(array, limit) {
    if (limit === 0) {
        console.log(`Tri à bulles terminé : ${bubbleComparisons} comparaisons.`);
        return array;
    }

    for(let i = 0 ; i < limit ; i++) {
        if (array[i] > array[i+1]) {
            bubbleComparisons++;
            console.log(`${bubbleComparisons}e comparaison.`)
            prompt("[ENTER]");
            // Swap avec variable temporaire
            // let temp;
            // temp = array[i];
            // array[i] = array[i+1];
            // array[i+1] = temp;

            // Swap avec déstructuration
            [array[i], array[i+1]] = [array[i+1], array[i]];
        }      
    }
    
    bubbleSort(array, limit - 1);
}

function perform () {
    if (validateInputFile(process.argv[2])) {
        // Récupération des données depuis le fichier
        data = getDataFromFile(process.argv[2]);
        console.log("Le données venant de list.txt sont => ");
        console.log(data);
        prompt("[ENTER]");

        // Conversion des données de type String dans un tableau
        dataArray = dataToArray(data);
        console.log("Convertissons les en un tableau => ");
        console.log(dataArray);
        prompt("[ENTER]");

        // Tri du tableau selon l'algorithme trià bulles 
        console.log("Passons au tri");
        prompt("[ENTER]");
        console.log("dataArray AVANT tri à bulles");
        console.log(dataArray);
        bubbleSort(dataArray, dataArray.length - 1);
        console.log("dataArray APRÈS tri à bulles");
        console.log(dataArray);
    }
}

perform();