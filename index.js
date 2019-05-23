


                           /*  COSTRUTTORE MONTAGNA   */

/**                                     // Tramite param definisco i parametri che passo
 *                                      // attraverso il costruttore Montagna quindi:
 * @param {HTMLElement} map             // mappa diventa map
 * @param {HTMLButtonElement} button    // bottoneGeneratore diventa button
 */
function Montagna (map, button) {       //In questa maniera globalVariable a cui ho assegnato
    this.btnGenerator = button;         //il costruttore Montagna e quindi sarà this.
    this.mapContainer = map;            //diverrà un oggetto contenente
    this.__SIZE_HEIGHT = 10;            //btnGenerator che contiene button,
    this.__SIZE_WIDTH = 10;             //mapContainer che contiene map,
    this.dataMatrix = [];               //le misure della matrice _SIZE_HEIGHT e _SIZE_WIDTH
};                                      //infine dataMatrix un array vuoto che mi servirà d'appoggio
                                        //dove creerò una copia della matrice con i valori generati
                                        //che utilizzerò per fare il confronto dei valori



                 /* AGGIUNTA DELL'ATTRIBUTO ONCLICK E COSA RICHIAMERA' */

Montagna.prototype.init = function init () {   //Definisco la funzione init() e tramite il
    this.btnGenerator.addEventListener(        // costruttore Montagna lo aggiungo come proprietà
        'click',                               //a qualunque oggetto costruito con Montagna e che
        () => {                                //chiama init(), in questo caso globalVariable, quindi this.
            this.cleanGrid();                  //Quindi a btnGenerator <button class="btn">Genera montagna</button>
            this.generateGrid();               //aggiungo l'attributo onclick tramite addEventListener
        }                                      //e che funzione richiamerà tale click.
    );                                         //In questo caso 2 funzioni cleanGrid() -> reset della matrice
};                                             // e generateGrid() -> creazione della matrice
                                               
                                               // NOTA: addEventListener richiama 1 funzione non 2
                                               // e this. sarebbe stato window.
                                               //Per risolvere il problema usiamo le function arrow
                                               //() => una funzione che richiama 2 e che avrà come padre Montagna
                                               //costruttore di globalVariable



                                       /* RESET DELLA MATRICE*/

Montagna.prototype.cleanGrid = function cleanGrid () {   //Sempre attraverso il costruttore aggiungo all'oggeto
    this.mapContainer.innerHTML = '';                    //una proprietà funzione.
};                                                       //Quindi this. sarà chiunque sarà Montagna in questo caso
                                                         //globalVariable. Al suo interno è già presente mapContainer
                                                         //che corrisponde a map cioè <div id="map"></div>
                                                         //Quindi tramite innerHTML lo ripulisco inserendo
                                                         //una stringa vuota ""



                                    /* GENERATORE ALTEZZE MONTAGNE ALL'INTERNO DELLA MATRICE */

Montagna.prototype.generateGrid = function generateGrid () {         //Quindi sempre tramite Montagna aggiungo una funzione
  for (let i = 0; i < this.__SIZE_HEIGHT; i++) {                     //Faccio partire un ciclo For per la riga [i]
        this.dataMatrix[i] = [];                                     //Per creare una Matrice vuota e quindi per poter usare dopo
                                                                     //il push assegno per ogni indice i un array vuoto
        const row = this.createRowElement();                         //Creo una varibile d'appoggio row al quale assegno
        console.log(row);                                            //ciò che mi ritornerà dalla funzione createRowElement()
                                                                     //sapendo sempre che this. è globalVariable
                                                                     //createRowElement mi rimanderà <div class="row"></div>

        for(let j = 0; j < this.__SIZE_WIDTH; j++) {                 //Faccio partire un ciclo For per la colonna [j]
            const randomNum = Math.floor(Math.random()*100);         //Assegno a una variabile d'appoggio randomNum un numero random da 0 a 99
            const block = this.createBlockElement(randomNum, i, j);  
            this.dataMatrix[i].push({
                                      height: randomNum,
                                      block: block
                                     }); // inserisco numero generato all'interno della matrice logica

            row.appendChild(block); // <div class="row"><div class="block"></div> .... <div class="block"></div></div>
               }
        this.mapContainer.appendChild(row);
    }
};



                                              /* METODO CHE GENERA L'ELEMENTO RIGA */
/**
 * 
 * @return {HTMLDivElement}
 */
Montagna.prototype.createRowElement = function createRowElement () {  //Quindi avrò una nuova funzione all'interno di
    const row = document.createElement('div');                        //globalVariable. Poi definisco una nuova variabile row
    row.classList.add('row');                                         //dove creo un elemento o tag div -> <div></div>
    return row;                                                       //e tramite classList aggiungo la classe 'row'
}                                                                      //Quindi tramite return a chiunque abbia chiamato createRowElement
                                                                      //assegnerò o rimanderò <div class="row"></div>


                                         /* METODO CHE GENERA IL BLOCCO */                             

/**
 *
 * @return {HTMLDivElement}
 */
Montagna.prototype.createBlockElement = function createBlockElement (numero, nRiga, nColonna) {  //Quindi dentro avrò una funzione createBlockElement
    let block = document.createElement('div');                                                   //Definisco una variabile block dove creo <div></div>
    block.innerText = numero; // inserisco il numero                                             //Tramite innerText inserisco il parametro numero, generato
    block.classList.add('block'); // aggiungo la classe 'block'                                  //e passato precedentemente. Quindi aggiungo la classe
    block.setAttribute('n_row', nRiga);                                                          //block
    block.setAttribute('n_col', nColonna);

    this.enhanceBlockWithCreateSource(block);

    return block; // <div class="block"></div>
};

/**
 * @param {HTMLDivElement} elementThatWillGenerateSource
 */
Montagna.prototype.enhanceBlockWithCreateSource = function enhanceBlockWithCreateSource (elementThatWillGenerateSource) {
    elementThatWillGenerateSource.addEventListener(
        'click',
        (event) => {
            // this qui è uguale a <div class="block"></div> che ha fatto scattare l'evento
            const elementoCheHaFattoScatenareQuestoEvento = event.target;
            
            // elementoCheHaFattoScatenareQuestoEvento === elementThatWillGenerateSource === true
            elementoCheHaFattoScatenareQuestoEvento.classList.add('wet');
            // this.classList.add('wet');
            const n_row = elementoCheHaFattoScatenareQuestoEvento.getAttribute('n_row');
            const n_col = elementoCheHaFattoScatenareQuestoEvento.getAttribute('n_col');

            this.flowTheRiver(parseInt(n_row, 10), parseInt(n_col, 10));
        }
    );
}

Montagna.prototype.flowTheRiver = function flowTheRiver (x, y) {
    if (this.dataMatrix[x] !== undefined && this.dataMatrix[x][y] !== undefined) {
        const num = this.dataMatrix[x][y].height;
    
        for (let R = x-1; R < x + 2; R++) {
            for (let C = y-1; C < y + 2; C++) {
                // if (R === i && C === y) continue;
                if (this.dataMatrix[R] !== undefined && this.dataMatrix[R][C] !== undefined) {
                    if (!this.dataMatrix[R][C].alreadyChecked && this.dataMatrix[R][C].height < num) {
                        this.dataMatrix[R][C].block.classList.add('wet');
                        this.flowTheRiver(R, C);
                    }
                } else {
                    return;
                }
            }
        }
    } else return;
}
}
