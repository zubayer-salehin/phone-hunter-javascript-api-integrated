// Search Button Click Event
document.getElementById("searchBtn").addEventListener("click",function(){
    // Get search Input
    const searchInput = document.getElementById("searchInput");
    // Get Search-result value
    const searchResult = document.getElementById("searchResult");
    const searchInputText = searchInput.value;
    // Get phone-details
    const phoneDetails = document.getElementById("phone-details");
    // Empty String Error Check
    if(searchInputText == ""){
        document.getElementById("emptyStringError").style.display = "block";
        document.getElementById("noFoundPhoneError").style.display = "none";
        // showAll button hide
        document.getElementById("showAll").style.display = "none";
        phoneDetails.textContent = "";
        searchResult.textContent = "";
    }else{
        // loading start
        document.getElementById("loading").style.display = "block";
        // searchPhone data fetch
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`
        fetch(url)
        .then(response => response.json())
        .then(data => phoneDisplay(data))
        phoneDetails.textContent = "";
        searchInput.value = "";
        document.getElementById("emptyStringError").style.display = "none";
        document.getElementById("noFoundPhoneError").style.display = "none";
    }
    
})

// searchResult display in UI
// phoneDisplay function
const phoneDisplay = (searchPhones) => {
    const container = document.getElementById("searchResult");
    const phoneDetails = document.getElementById("phone-details");
    container.textContent = "";
    const phones = searchPhones.data;
    // Phone Not Found Error Check
    if(phones.length == 0){
        document.getElementById("emptyStringError").style.display = "none";
        document.getElementById("noFoundPhoneError").style.display = "block";
        // showAll button hide
        document.getElementById("showAll").style.display = "none";
        // Phone-details empty
        phoneDetails.textContent = "";
        // SerchResult empty
        container.textContent = "";
    }
    // Display first 20 phones item in UI
    const phoneNumber20 = phones.slice(0,20);
    phoneNumber20.forEach(singlePhone => {
        let div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `<div class="card">
                            <div class="mx-auto mt-3">
                            <img src="${singlePhone.image}" class="img-width" alt="...">
                            </div>
                                <h3 class="card-title mx-auto mt-3">${singlePhone.brand}</h3>
                                <h5 class="card-title text-success mx-auto">${singlePhone.phone_name}</h5>
                            <div class="mx-auto mt-1 mb-3">
                            <button onclick="phoneDetails('${singlePhone.slug}')" class="btn btn-success" type="button">Veiw Details</button>
                            </div>
                        </div>`
        container.appendChild(div);
    });
    // Display all Phones item
    if(phones.length > 20){
        // ShowAll button show
        document.getElementById("showAll").style.display = "block";
        document.getElementById("showAll").addEventListener("click",function(){
        // SerchResult empty
        container.textContent = "";
        // Phones all item Display in UI
        phones.forEach(singlePhone => {
            let div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `<div class="card">
                                <div class="mx-auto mt-3">
                                <img src="${singlePhone.image}" class="img-width" alt="...">
                                </div>
                                    <h3 class="card-title mx-auto mt-3">${singlePhone.brand}</h3>
                                    <h5 class="card-title text-success mx-auto">${singlePhone.phone_name}</h5>
                                <div class="mx-auto mt-1 mb-3">
                                <button onclick="phoneDetails('${singlePhone.slug}')" class="btn btn-success" type="button">Veiw Details</button>
                                </div>
                            </div>`
            container.appendChild(div);
        });
        // showAll button hide
        document.getElementById("showAll").style.display = "none";
    })
  }
    // loading stop
    document.getElementById("loading").style.display = "none";
}

// Phone-details data fetch function
const phoneDetails = (singlePhoneSlug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${singlePhoneSlug}`
    fetch(url)
    .then(response => response.json())
    .then(data => phoneDetailsDisplay(data))
}

// singlePhoneDetails data display in UI
// phoneDetailsDisplay function
const phoneDetailsDisplay = (singlePhoneData) => {
    let singlePhone = singlePhoneData.data;
    let phoneDetails = document.getElementById("phone-details");
    phoneDetails.innerHTML = `<div class="col-12 mt-5">
                                <div class="card pt-3">
                                    <div class="d-flex justify-content-center">
                                        <div>
                                        <img src="${singlePhone.image}" class="detail-img-width" alt="...">
                                        <h3 class="card-title mt-3 text-center">${singlePhone.brand}</h3>
                                            <h5 class="card-title text-success text-center">${singlePhone.name}</h5>    
                                        </div>
                                    </div>
                                    <p class="text-center mb-1"><span class="font-weight">Relase Date : </span>${singlePhone.releaseDate ? singlePhone.releaseDate : "release date not found"}</p>
                                    <div class="card-body">
                                        <div class="row">
                                          <div class="col-12 col-md-4 gapConnectivity">
                                            <table class="table table-striped table-bordered mb-0">
                                            <tbody>
                                                <tr>
                                                    <th colspan="4" scope="row">Connectivity</th>
                                                </tr>
                                                <tr>
                                                    <td>WLAN</th>
                                                    <td colspan="3">${singlePhone.others? singlePhone.others.WLAN : "No Data Available"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Bluetooth</th>
                                                    <td colspan="3">${singlePhone.others? singlePhone.others.Bluetooth : "No Data Available"}</td>
                                                </tr>
                                                <tr>
                                                    <td>USB</th>
                                                    <td colspan="3">${singlePhone.others? singlePhone.others.USB : "No Data Available"}</td>
                                                </tr>
                                                <tr>
                                                    <td>GPS</th>
                                                    <td colspan="3">${singlePhone.others? singlePhone.others.GPS : "No Data Available"}</td>
                                                </tr>
                                                <tr>
                                                    <td>NFC</th>
                                                    <td colspan="3">${singlePhone.others? singlePhone.others.NFC : "No Data Available"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Radio</th>
                                                    <td colspan="3">${singlePhone.others? singlePhone.others.Radio : "No Data Available"}</td>
                                                </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                          <div class="col-12 col-md-4">
                                            <table class="table table-striped table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th colspan="4" scope="row">Performance &  Storage</th>
                                                </tr>
                                                <tr>
                                                    <td>Display Size</th>
                                                    <td colspan="3">${singlePhone.mainFeatures.displaySize ? singlePhone.mainFeatures.displaySize : "No Date Available"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Chipset</th>
                                                    <td colspan="3">${singlePhone.mainFeatures.chipSet ? singlePhone.mainFeatures.chipSet : "No Data Available"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Memory</th>
                                                    <td colspan="3">${singlePhone.mainFeatures.memory ? singlePhone.mainFeatures.memory : "No Data Available"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Storage</th>
                                                    <td colspan="3">${singlePhone.mainFeatures.storage ? singlePhone.mainFeatures.storage: "No Data Available"}</td>
                                                </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                          <div class="col-12 col-md-4">
                                            <table class="table table-striped table-bordered">
                                            <tbody id="phoneSensors">
                                                <tr>
                                                    <th colspan="4" scope="row">sensors</th>
                                                </tr>
                                                <p class="none">${sensors(singlePhone.slug)}</p>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>  
                                </div>
                            </div>`
}

// Senosrs data fetch function
const sensors = (phoneSlug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`
    fetch(url)
    .then(response => response.json())
    .then(data => sensorsDisplay(data))
}

// Sensors Data Display in UI
// sensorsDisplay functoin
const sensorsDisplay = (singlePhoneData) => {
    let singlePhone = singlePhoneData.data;
    // Get Phonesensors 
    const phoneSensors = document.getElementById("phoneSensors");
    // sensors all item display in UI
    singlePhone.mainFeatures.sensors.forEach(sensor => {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${sensor}</td>`
        phoneSensors.appendChild(tr);
    })
}


/*Code End Bye Bye*/