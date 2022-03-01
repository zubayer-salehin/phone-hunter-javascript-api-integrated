document.getElementById("searchBtn").addEventListener("click",function(){
    const searchInput = document.getElementById("searchInput");
    const searchResult = document.getElementById("searchResult");
    const searchInputText = searchInput.value;
    const phoneDetails = document.getElementById("phone-details");
    if(searchInputText == ""){
        document.getElementById("emptyStringError").style.display = "block";
        document.getElementById("noFoundPhoneError").style.display = "none";
        phoneDetails.textContent = "";
        searchResult.textContent = "";
    }else{
        document.getElementById("loading").style.display = "block";
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

const phoneDisplay = (searchPhones) => {
    const container = document.getElementById("searchResult");
    const phoneDetails = document.getElementById("phone-details");
    container.textContent = "";
    const phones = searchPhones.data;
    if(phones.length == 0){
        document.getElementById("emptyStringError").style.display = "none";
        document.getElementById("noFoundPhoneError").style.display = "block";
        phoneDetails.textContent = "";
        container.textContent = "";
    }
    const phoneNumber20 = phones.slice(0,20);
    phoneNumber20.forEach(singlePhone => {
        let div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `<div class="card">
                            <h6 class="my-2 ms-3">Latest</h6> 
                            <img src="${singlePhone.image}" class="img-width ms-5" alt="...">
                            <div class="card-body">
                                <h3 class="card-title">${singlePhone.brand}</h3>
                                <h5 class="card-title text-success">${singlePhone.phone_name}</h5>
                            </div>
                            <div class="ms-3 mb-3">
                            <button onclick="phoneDetails('${singlePhone.slug}')" class="btn btn-success" type="button">Veiw Details</button>
                            </div>
                        </div>`
        container.appendChild(div);
    });
    document.getElementById("loading").style.display = "none";
}

const phoneDetails = (singlePhoneSlug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${singlePhoneSlug}`
    fetch(url)
    .then(response => response.json())
    .then(data => phoneDetailsDisplay(data))
}

const phoneDetailsDisplay = (singlePhoneData) => {
    let singlePhone = singlePhoneData.data;
    let phoneDetails = document.getElementById("phone-details");
    phoneDetails.innerHTML = `<div class="col-12 mt-5">
                                <div class="card">
                                    <div class="d-flex justify-content-center">
                                        <div>
                                        <h6 class="my-3">Latest</h6> 
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
                                                    <td colspan="3">${singlePhone.mainFeatures.displaySize}</td>
                                                </tr>
                                                <tr>
                                                    <td>Chipset</th>
                                                    <td colspan="3">${singlePhone.mainFeatures.chipSet}</td>
                                                </tr>
                                                <tr>
                                                    <td>Memory</th>
                                                    <td colspan="3">${singlePhone.mainFeatures.memory}</td>
                                                </tr>
                                                <tr>
                                                    <td>Storage</th>
                                                    <td colspan="3">${singlePhone.mainFeatures.storage}</td>
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

const sensors = (phoneSlug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`
    fetch(url)
    .then(response => response.json())
    .then(data => sensorsDisplay(data))
}

const sensorsDisplay = (singlePhoneData) => {
    let singlePhone = singlePhoneData.data;
    const phoneSensors = document.getElementById("phoneSensors");
    singlePhone.mainFeatures.sensors.forEach(sensor => {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${sensor}</td>`
        phoneSensors.appendChild(tr);
    })
}