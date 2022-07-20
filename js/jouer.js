/*const url = "";
 if (checked == "français") url = "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getParoles.php?cat=cf";
else if (checked == "anglais") url = "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getParoles.php?cat=ca";
else url = "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getParoles.php";
 */
const xhr = new XMLHttpRequest();
xhr.open("get", "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getParoles.php?cat=cf");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const reponse = JSON.parse(xhr.responseText);
        console.log(reponse);
        const lesQuestions = reponse["resultats"];
        //console.log(lesQuestions);
        //on initialise les questions contenues dans la page HTML
        document.querySelector("section").innerHTML = integrerLesChampions(lesQuestions);
        //on affiche le nombre de questions
        document.querySelector("h1").innerHTML = document.querySelector("h1").innerHTML + "Tu dois répondre à " + lesQuestions.length + " questions";
        //on définit un comportement pour le bouton
        document.querySelector("button").addEventListener('click', function () {
            let nbBonnesRep = 0;
            document.querySelector("#message").textContent = "vos réponses vont être transmises";
            for (const ques of document.querySelectorAll("article")) { // on verifie question par question
                if (ques.querySelectorAll("li strong").length === 1) { //on s'assure qu'une seule bonne réponse a été sélectionnée
                    if (bonneReponse(ques.id, ques.querySelector("li strong").textContent, lesQuestions)) { //la fonction bonneReponse vérifie si le texte de li sélectionnée correspond à la bonne réponse donnée dans l'objet lesQuestions
                        nbBonnesRep++;
                        ques.style.border = "4px solid green";
                    }
                }
            }
            alert(nbBonnesRep + " bonnes réponses" + "données en " + document.querySelector("#timer").textContent + " secondes");
            document.querySelector("#timer").textContent = 0;

        })
        //on définit un comportement pour les li
        for (const maLi of document.querySelectorAll("article li"))
            maLi.addEventListener('click', function () {
                if (maLi.querySelector("u") === null) maLi.innerHTML = "<u>" + maLi.textContent + "</u>"
                else maLi.innerHTML = maLi.textContent;
            })
        //on lance le chrono
        window.setInterval(afficherChrono, 1000); //on appelle la fonction afficherChrono toutes les 1000 msecondes, ie toutes les secondes
    }
}
xhr.send();



function bonneReponse(idQ, reponse, lesQ) {
    juste = false;
    for (const rep of lesQ) {
        console.log("dans bonne reponse " + rep.id + ":" + idQ + "-" + rep.nom +" "+ reponse)
        if (rep.id == idQ && rep.nom == reponse) {
            juste = true;
        }
    }
    return juste;
}

function integrerLesChampions(lesQ) {
    let codeHTML;
    let resultat;
    let numQuestion = 1;
    resultat = "";
    codeHTML = "";
    for (const maQ of lesQ){
        codeHTML += "<article id=\"" + maQ.id + "\">";
        codeHTML += "<h2 >Question n°" + numQuestion + "</h2>";
        codeHTML += "<h3>Parole : "+"<blockquote>" + maQ.parole + "</blockquote>"+"</h3>";
        codeHTML += "<h3>Auteur ?</h3> ";
        codeHTML += "<ul>"
        maQ.lesAutres.push(maQ.nom)
        for (const cel of maQ.lesAutres)
            codeHTML += "<li>" + cel + "</li>"
        codeHTML += "</ul>";
        codeHTML += "</article>";
        numQuestion ++;
        resultat += codeHTML;
    }
    return (resultat);
}


function afficherChrono() {
    document.querySelector("#timer").textContent = parseInt(document.querySelector("#timer").textContent) + 1;
}




function mapopup(){
    window.open('inscription.html','mapopup','height=100,width=100,top=50,left=50,resizable=no');
}


/* chronometre :
windows.setInterval
*/
