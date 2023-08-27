const loadPhone = async (searchText=9, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
    console.log(phones);
    // 1. 
    const phoneContainer = document.getElementById('phone-container')
    //  clear phone container cards before adding new cards
    phoneContainer.textContent = "";
    // display show all button if there are more than 10 phones
    const showAllContainer = document.getElementById("show-all-container")
    if (phones.length > 9 && !isShowAll) {
        showAllContainer.classList.remove("hidden")
    } else {
        showAllContainer.classList.add("hidden")
    }
    console.log("is show all:", isShowAll)
    //  display only first 10 phones if not show All
    if (!isShowAll) {
        phones = phones.slice(0, 9);
    }
    phones.forEach(phone => {
        console.log(phone);
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-300 shadow-xl`;
        // 3. set inner HTML
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>There are many variations of passages of available, but the majority have suffered</p>
                        <div class="card-actions">
                            <button onclick="handleShowDetails('${phone.slug}');show_detail_modal.showModal()"  class="btn btn-primary">Show Details</button>
                        </div>
                    </div>

        `
        // 4. appendChild
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}
// handle search

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById("search-field")
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText, isShowAll)
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden")
    }
    else {
        loadingSpinner.classList.add("hidden")
    }
}

// handle show all

const handleShowAll = () => {
    handleSearch(true);
}
// handle show Details
const handleShowDetails = async (id) => {
    console.log('Show Details btn is working:', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089 ${id}`)
    const data = await res.json();
    console.log(data) 
}

loadPhone();