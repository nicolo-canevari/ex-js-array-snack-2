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