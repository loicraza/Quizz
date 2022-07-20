const xhr = new XMLHttpRequest();
xhr.open("get", "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getChampions");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const reponse = JSON.parse(xhr.responseText);
        console.log(reponse);
        document.querySelector("section").innerHTML = integrerLesChampions(reponse["resultats"]);
    }
}
xhr.send();



function integrerLesChampions(lesChampions) {
    let codeHTML;
    let resultat;
    codeHTML = "";
    resultat = "";
    for (const unChamp of lesChampions){
        codeHTML = "<article id=\""+unChamp.id+"\">";
        codeHTML += "<h3>Nom : "+unChamp.nom+"</h3>";
        codeHTML += "<h3>Prénom : "+unChamp.prenom+"</h3> ";
        codeHTML += "<h3>Temps : "+unChamp.temps+"</h3> ";
        codeHTML += "<h3>Score : "+unChamp.score+"</h3> ";
        codeHTML += "</article>";
        resultat += codeHTML;
    }
    return (resultat);
}
