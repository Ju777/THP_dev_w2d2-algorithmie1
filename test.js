const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });

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


function perform () {
        data = getDataFromFile(process.argv[2]);
        // console.log("Le données venant de list.txt sont => ");
        // console.log(data);
        // prompt("[ENTER]");
}

perform();