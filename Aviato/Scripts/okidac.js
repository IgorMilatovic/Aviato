﻿// Pokupi skrivena polja u koja se upisuju podaci koji se šalju serveru
var pass = document.querySelector("#pass"),
    tipovi = document.querySelector("#TipoviZaUnos"),
    datumi = document.querySelector("#DatumiZaUnos");


let okidac = document.querySelector(".okidac");
var moguceVrednosti = []; // Lista sve jezike koje je moguće izabrati kao "Engleski"
window.onload = () => {
//    /*
//     * Pošto pri učitavanju podataka iz baze, 
//     * vrednosti bivaju upisane u innerHTML input elementa
//     * umesto u value, ova funkcija ih vraća u value
//     */
    
    //let stvarneVrednosti = [];
    //if (document.URL.split('/')[3] !== "Let") {
    //    let node = polja[0].options; // iščitava iz bilo kog polja koji su sve jezici dostupni
    //    if (node != undefined) {
    //        for (let i = 1; i < node.length; i++) {
    //            moguceVrednosti.push(node[i].label);
    //        }

    //        for (let polje of polja) {
    //            let stvarnaVrednost = polje.options[0].innerHTML; // u innerHTML-u 0-tog rezultata je jezik koga baza vraća kao "Engleski"
    //            stvarneVrednosti.push(moguceVrednosti.indexOf(stvarnaVrednost) + 1); // pravi array stvarno odabranih jezika, kao njihove id-ijeve
    //            polje.value = moguceVrednosti.indexOf(stvarnaVrednost) + 1; // dodeljuje kao value stvarno izabran jezik
    //        }
    //    }
    //}

//    /*
//     * Ovaj loop prikazuje samo datum, umesto datuma i vremena u datetime polju
//     */
    if (datumi) {
        for (let datum of datumi) {
            datum.value = datum.defaultValue.split(" ")[0];
        }
    }
    
} // window.onload

/**
 * Očitava vrednost kao primary key, npr 1, a vraća ljudski prepoznatljiv string,
 * kao npr "Engleski" ili "Sreten Dudić"
 * u svrhu obaveštavanja korisnika kad odabere dve iste vrednosti
 * kada će se na ekranu ispisati koja vrednost je uneta dva puta.
 */

function vratiPrave(val) {
    let pozicija,
        polje = document.querySelector('.polje').options;
    
    //if (document.URL.split('/')[3] == "Let" && document.URL.split('/')[4] == "Create") {
        
        
    //    console.log($0.textContent.split("\n"))
    //    let duplikat = polje.options[polje.options.selectedIndex].innerHTML;
    //    return duplikat
    //}
    //if (document.URL.split('/')[3] == "Let") {
    //    let polje = document.querySelectorAll('.polje');
    //    for (let p of polje) {
    //        if (p.value == val) {
    //            var duplikat = p.textContent.split('\n')[p.options.selectedIndex];
    //        }
    //    }
    //    return duplikat
    //}
    if (!document.querySelector('#RoleName') == null) {
        pozicija = document.querySelector('#RoleName').value;
    }
    if (pozicija == "Stjuard") {
        let duplikat = polje[val - 1].innerHTML;
        return duplikat;
    }
    else if (pozicija == "Mehaničar" || document.URL.split('/')[4] == "Edit") {
        let duplikat = polje[val].innerHTML;
        return duplikat;
    }
    //else if (document.URL.split('/')[4] == "Edit") {
    //    let duplikat = polje[val].innerHTML;
    //    return duplikat
    //}
} // vrati prave


/* 
 * vraća prave vrednosti
 */

function vrPrave(index) {
    let polja = document.querySelectorAll('.polje');
    let pv = polja[index].textContent.split('\n');
    pv = pv.splice(1, pv.length - 2) // array
    let poz = pv.indexOf(polja[index].options[0].label) + 1;
    let val = polja[index].options[poz].value;
    return val;
}



/**
 * onclik okidač kupi vrednosti sa fronta i pohranjuje ih u skrivena polja za bekend
 * 
 */

okidac.onclick = (e) => {
    console.log("klik")
    // Pokupi vrednosti koje je korisnik uneo
    let poljaZaUnos = document.querySelectorAll('.polje'), // kupi sva polja za unos (bez datuma) radi na oba unosa
        izabraniDatumi = document.querySelectorAll(".izabraniDatum");

    // prazni array-i u koje će da se čuvaju unete vrednosti i koji se upisuju u skrivena polja 
    var jeziciZaUnos = [],
        tipoviZaUnos = [],
        datumiZaUnos = [];
        
    for (let i = 0; i < poljaZaUnos.length; i++) {

        /*
         * Proverava da li je pri ispisu iz baze, value zamenjen praznim stringom
         */

        /*
         * prvo za mehaničare:
         */
        if (poljaZaUnos[i].value == "") {
            var trenutnaVrednost = vrPrave(i);
            if (tipovi) {
                console.log(trenutnaVrednost)
                console.log(Number(trenutnaVrednost))
                console.log(tipoviZaUnos)
                if (tipoviZaUnos.includes(Number(trenutnaVrednost))) {
                    alert(`Licenca za ${poljaZaUnos[i].options[0].label} je već izabrana`);
                    return false;
                }
                else {
                    tipoviZaUnos.push(Number(trenutnaVrednost))
                    datumiZaUnos.push(izabraniDatumi[i].value);
                }
                
            }
            /* proverava za duple unose jezika i šalje u bazu samo jedinstvene. 
             * ako korisnik unese isti jezik dva puta dobija obaveštenje da to nije dozvoljeni
             * osim toga lista se čisti pre submita za svaki slučaj
             */

            /* ovde za jezike */
            else if (pass) {
                if (jeziciZaUnos.includes(Number(trenutnaVrednost))) {
                    
                    console.log(poljaZaUnos[i].options[0].label)
                    alert(`${poljaZaUnos[i].options[0].label} jezik je već izabran`)
                    return false;
                }
                else {
                    jeziciZaUnos.push(Number(trenutnaVrednost))
                    console.log(jeziciZaUnos)
                }
            }
            
        }
        /*
         * za polja koja imaju ispravan value, odnosno korisnik ih je ručno uneo:
         */
        else {
            var trenutnaVrednost = poljaZaUnos[i].value
            console.log(trenutnaVrednost)
            console.log(Number(trenutnaVrednost))
            console.log(tipoviZaUnos)

            if (pass) {
                if (jeziciZaUnos.includes(Number(poljaZaUnos[i].value))) {
                    alert(`${poljaZaUnos[i].selectedOptions[0].innerHTML} jezik je već izabran`)
                }
                else {
                    jeziciZaUnos.push(Number(poljaZaUnos[i].value))
                }
            }
            else if (tipovi) {
                if (tipoviZaUnos.includes(Number(trenutnaVrednost))) {
                    alert(`${poljaZaUnos[i].selectedOptions[0].innerHTML} je već izabran`);
                    return false;
                }
                else {
                    tipoviZaUnos.push(Number(trenutnaVrednost))
                    datumiZaUnos.push(izabraniDatumi[i].value);
                }
                
            }
        }
    }

    if (pass) {
        jeziciZaUnos = [...new Set(jeziciZaUnos)]; // Vraća samo jedinstvene jezike
        pass.value = jeziciZaUnos;
    }
    else if (tipovi) {
        tipovi.value = tipoviZaUnos;
        datumi.value = datumiZaUnos;
    }    

    //for (let i = 0; i < izabraniTipovi.length; i++) {
    //    if (izabraniTipovi[i].value == 0 || izabraniDatumi[i].value == "") {
    //        continue;
    //    }
    //    else if (tipoviZaUnos.includes(Number(izabraniTipovi[i].value))) {
    //        continue;
    //    }
            
    //    else {
    //        tipoviZaUnos.push(Number(izabraniTipovi[i].value)); // Prepoznaje odabrani tip u trenutno posmatranom select polju, i ubacuje ga u array
    //        datumiZaUnos.push(izabraniDatumi[i].value);
    //    }
    //    return false;
    //}

        /*
         * Proverava da se ne unese ista vrednost dva puta
         */
        //let test = [];
        //test[0] = poljaZaUnos[0].value;
        //for (let i = 1; i < poljaZaUnos.length; i++) {
        //    console.log(poljaZaUnos[i])
        //    if (test.includes(poljaZaUnos[i].value)) {
        //        let val = poljaZaUnos[i].value;
        //        alert(`Uneli ste ${vratiPrave(val)} više puta, proverite svoj unos`);
        //        return false;
        //    }
        //    else {
        //        test.push(poljaZaUnos[i].value);
        //    }
        //}

}
