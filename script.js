// SNACK 1

// Funzione che somma due numeri
function sum(a, b) {
    return a + b;
}

// Array dei libri
const books = [
    {
        title: "React Billionaire",
        pages: 250,
        author: { name: 'Alice', age: 35 },
        available: false,
        price: '101€',
        tags: ['advanced', 'js', 'react', 'senior']
    },
    {
        title: "Advanced JS",
        pages: 500,
        author: { name: 'Bob', age: 20 },
        available: true,
        price: '25€',
        tags: ['advanced', 'js', 'mid-senior']
    },
    {
        title: "CSS Secrets",
        pages: 320,
        author: { name: 'Alice', age: 17 },
        available: true,
        price: '8€',
        tags: ['html', 'css', 'junior']
    },
    {
        title: "HTML Mastery",
        pages: 200,
        author: { name: 'Charlie', age: 50 },
        available: false,
        price: '48€',
        tags: ['html', 'advanced', 'junior', 'mid-senior']
    },
];

// Filtra i libri con più di 300 pagine
const longBooks = books.filter(book => book.pages > 300);

// Estrai solo i titoli dei longBooks
const longBooksTitles = longBooks.map(book => book.title);

// Stampa ogni libro in console che abbia più di 300 pagine
console.log("Libri con più di 300 pagine:");
longBooksTitles.forEach(title => console.log(`- ${title}`));


// SNACK 2

// Libri disponibili
const availableBooks = books.filter(book => book.available);

// Stampa dei libri disponibili
console.log("Libri disponibili:", availableBooks);

// Libri disponibili con sconto del 20%
const discountedBooks = availableBooks.map(book => {

    // Estrae il prezzo in formato numerico
    const priceNumber = parseFloat(book.price.replace('€', ''));

    // Calcola lo sconto del 20% e arrotonda a 2 decimali
    const discountedPrice = (priceNumber * 0.8).toFixed(2);

    // Ritorna una copia dell'oggetto libro con il prezzo scontato
    return {
        // copia tutte le proprietà del libro originale
        ...book,
        // sovrascrive il campo `price` con il nuovo valore
        price: `${discountedPrice}€`
    };

});

// Stampa dei libri scontati
console.log("Libri scontati del 20%:", discountedBooks);

// Trova il primo libro con prezzo intero (senza centesimi)
const fullPricedBook = discountedBooks.find(book => {

    // Estrae il prezzo come numero
    const priceNum = parseFloat(book.price.replace('€', ''));
    // Verifica se il prezzo è un numero intero
    return priceNum % 1 === 0;

});

// Stampa del primo libro con prezzo scontato intero
console.log("Primo libro scontato con prezzo intero:", fullPricedBook);


// SNACK 3

// Array con gli autori
const authors = books.map(book => book.author);
console.log("Lista autori:", authors);

// Verifica se tutti gli autori sono maggiorenni
const areAuthorsAdults = authors.every(author => author.age >= 18);
console.log("Tutti gli autori sono maggiorenni?", areAuthorsAdults);

// Ordina l'array `authors` in base all’età 
if (areAuthorsAdults) {
    // Ordine crescente se tutti maggiorenni
    authors.sort((a, b) => a.age - b.age);
} else {
    // Ordine decrescente se c'è almeno un minorenne
    authors.sort((a, b) => b.age - a.age);
}

console.log("Autori ordinati per età:", authors);


// SNACK 4

// Array con le età degli autori
const ages = books.map(book => book.author.age);
console.log("Età degli autori:", ages);

// Somma delle età usando reduce
const agesSum = ages.reduce((sum, age) => sum + age, 0);
console.log("Somma delle età:", agesSum);

// Calcolo dell’età media arrotondandola
const averageAge = agesSum / ages.length;
console.log("Età media degli autori:", averageAge.toFixed(2));


// BONUS 5

// URL base 
const BASE_URL = 'https://boolean-spec-frontend.vercel.app/freetestapi';

// Funzione che prende un array di ID e restituisce una Promise che risolve un array di libri 
function getBooks(ids) {

    // Mappa ogni ID in una chiamata fetch, restituendo una Promise
    const fetches = ids.map(id =>
        fetch(`${BASE_URL}/books/${id}`)
            .then(res => {
                // Controlla se la risposta è andata a buon fine
                if (!res.ok) {
                    // Se c'è un errore HTTP, viene gestito qui
                    throw new Error(`Errore nella fetch del libro con ID ${id}`);
                }
                // Altrimenti, converte la risposta in JSON
                return res.json();
            })
    );

    // Aspetta che tutte le Promises delle fetch siano completate
    return Promise.all(fetches);
}

// TEST con gli ID specificati
const testIds = [2, 13, 7, 21, 19];

// Chiamata alla funzione con gestione del risultato
getBooks(testIds)
    .then(books => {
        // Se tutte le fetch hanno avuto successo, stampa i libri
        console.log("Libri trovati:", books);
    })
    .catch(err => {
        // Se almeno una fetch fallisce, errore!
        console.error("Errore nel recupero dei libri:", err.message);
    });


// BONUS 6

// Verifica se c'è almeno un libro disponibile
const areThereAvailableBooks = books.some(book => book.available);
// `some` restituirà true se almeno un libro ha la proprietà `available`
console.log("Ci sono libri disponibili:", areThereAvailableBooks);

// Ordina l'array dei libri per prezzo (crescente)
const booksByPrice = [...books].sort((a, b) => {

    // Rimuove il simbolo dell'euro e converte la stringa in un numero
    const priceA = parseFloat(a.price.replace('€', ''));
    const priceB = parseFloat(b.price.replace('€', ''));
    // Ordina i libri in base al prezzo
    return priceA - priceB;

});

console.log("Libri ordinati per prezzo:", booksByPrice);

// Ordina l'array booksByPrice in base alla disponibilità
booksByPrice.sort((a, b) => {
    // Se entrambi i libri hanno la stessa disponibilità, non cambia l'ordine
    if (a.available === b.available) return 0;
    // Mette il libro disponibile prima
    return a.available ? -1 : 1;
});
console.log("Libri ordinati per disponibilità e prezzo:", booksByPrice);


// BONUS 7

// Usa reduce per contare quante volte ogni tag appare
const tagCounts = books.reduce((acc, book) => {

    // Per ogni libro, itera sui suoi tag
    book.tags.forEach(tag => {

        // Se il tag è già presente nell'oggetto acc ("accumulatore"), incrementa il conteggio
        if (acc[tag]) {
            acc[tag]++;
        } else {
            // Altrimenti, inizializza il conteggio del tag a 1
            acc[tag] = 1;
        }
    });
    // Ritorna l'oggetto aggiornato
    return acc;
}, {});

console.log("Conteggio dei tag:", tagCounts);