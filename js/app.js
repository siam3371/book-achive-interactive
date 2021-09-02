// search area
const searchButton = () => {
    const searchInput = document.getElementById('search-input');
    const searchInputText = searchInput.value;
    searchInput.value = '';
    // load books data 
    fetch(`https://openlibrary.org/search.json?q=${searchInputText}`)
    .then(res => res.json())
    .then(data => displayBooks(data.docs));
    // empty input value
    const emptyInput = document.getElementById('empty-input');
    if(searchInputText === ''){
        emptyInput.innerText = 'Please type a book name'
    }
    else{
        emptyInput.innerText = '';
    } 
}

// display books results
const displayBooks = books => {
    const resultContainer = document.getElementById('search-result');
    resultContainer.textContent = '';
    const totalResultContainer = document.getElementById('total-result');
    let totalResult = 0;
    const emptyArray = document.getElementById('empty-array');
    // error message
    if(books.length === 0){
        emptyArray.innerText = 'No result found, Please try again';
    }
    else{
        emptyArray.innerText = '';
        books.forEach(book => {
            emptyArray.innerText = '';
            totalResult = totalResult + 1;
            const div = document.createElement('div');
            if(book.author_name === undefined){
                div.innerHTML = `
                <div class="col">
                            <div class="card h-100">
                               <div class="card-body">
                                 <div id="image-container" class="bg-secondary text-primary text-opacity-50">
                                 <img id="card-image" src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top" alt="...">
                                 </div>
                                 <h5 class="card-title text-center">${book.title}</h5>
                                 <p class="card-text"><span class="fw-bold">Athour name:</span> No author found</p>
                                 <p class="card-text"><span class="fw-bold">Publisher name:</span> ${book.publisher}</p>
                                 <p class="card-text"><span class="fw-bold">First Publish Date:</span> ${book.first_publish_year}</p> 
                            </div>
                </div>
            `
            resultContainer.appendChild(div);
            }
            else{
                div.innerHTML = `
                <div class="col">
                            <div class="card h-100">
                               <div class="card-body">
                                 <div id="image-container" class="bg-secondary text-primary text-opacity-50">
                                 <img id="card-image" src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top" alt="...">
                                 </div>
                                 <h5 class="card-title text-center">${book.title}</h5>
                                 <p class="card-text"><span class="fw-bold">Athour name:</span> ${book.author_name}</p>
                                 <p class="card-text"><span class="fw-bold">Publisher name:</span> ${book.publisher}</p>
                                 <p class="card-text"><span class="fw-bold">First Publish Date:</span> ${book.first_publish_year}</p> 
                            </div>
                </div>
            `
            resultContainer.appendChild(div);
            }
        })
    }
    
    
   totalResultContainer.innerHTML = `
   <h5 class="text-center my-4">Total Result : ${totalResult}</h5>
   `;
}