let touristSpots = [];
let sortOrder = "";
let searchString = "";
let imageBase64 = "";
let assignId = generateId();

$(document).ready(function () {
    $.get("places.json", function (dummyData, status) {
        console.log("Status: " + status);
        // console.log("Data: " + data);

        insertIntoTouristSpotsArray(dummyData);

        $("#table2").on("click", "input[value='Delete']", deleteRow);
        $("#table2").on("click", "input[value='Update']", populateForm);
        
        $("#table1").on("click", "input[type='button']", updateRow);
        $("#imageSubmit").click(convertImageToBase64);
        // $("#preview").attr("src", dummyData[0]["image"]);

    });
});

function generateId() {
    let id = 0;
    return function() {
        return id++;
    };
}

function addTouristSpot() {
    let newTouristSpot = {};
    newTouristSpot["name"] = $("#table1 #name").val();
    newTouristSpot["address"] = $("#table1 #address").val();
    newTouristSpot["rating"] = $("#table1 #rating").val();
    convertImageToBase64();     
    tnewTouristSpot["image"] = imageBase64;
    imageBase64 = "";
    touristSpots.push(newTouristSpot);

    if(sortOrder != "") {
        // sortTouristSpotsArray(sortOrder);
    }
    if(searchString != "") {
        // findMatchingSpots();
    }

    updateTableView();
}

function deleteRow() {
    rowId = $(this).parent().parent().parent().attr("id");
    spotIndex =  touristSpots.findIndex(spot => spot["id"] === parseInt(rowId));
    touristSpots.splice(spotIndex, 1);

    updateTableView();
}

function populateForm() {
    console.log("== POPULATE UPDATE FORM ==");
    rowId = $(this).parent().parent().parent().attr("id");
    spotIndex =  touristSpots.findIndex(spot => spot["id"] === parseInt(rowId));
    console.log("spot index: ", spotIndex);
    // spot = touristSpots[spotIndex];

    $("#table1 #name").val(touristSpots[spotIndex]["name"]);        // -- REQUIRED FIELDS --
    $("#table1 #address").val(touristSpots[spotIndex]["address"]);
    $("#table1 #rating").val(touristSpots[spotIndex]["rating"]);
    // $("#table1 image").val(touristSpots[spotIndex]["image"]);
    $("#table1 input[type='button']").val("Update");
    $("#table1 #updateId").val(touristSpots[spotIndex]["id"]); // ADD A HIDDEN ELEMENT FOR ID IN THE FORM [DISPLAY: NONE]
}

function updateRow() {
    let id = $("#table1 id").val();
    spotIndex =  touristSpots.findIndex(spot => spot["id"] === parseInt(id));
    
    touristSpots[spotIndex]["name"] = $("#table1 name").val();
    touristSpots[spotIndex]["address"] = $("#table1 address").val();
    touristSpots[spotIndex]["rating"] = $("#table1 rating").val();
    convertImageToBase64();                     
    if (imageBase64 != "") {      
        touristSpots[spotIndex]["image"] = imageBase64;
        imageBase64 = "";
    }
    updateTableView();
}

function updateTableView() {
    $("#table2 tr").remove(".nonHeader");
    console.log("Here in updateTableView");

    touristSpots.forEach(spot => {
        if (searchString === "" || spot["isAMatch"] === true) {
            let tableRow = `<tr id=${spot["id"]} class="nonHeader"> <td> <img src=${spot["image"]} alt=${spot["name"]}> </td>`;
            tableRow += `<td> ${spot["name"]} </td> <td> ${spot["address"]} </td> <td> ${spot["rating"]} </td>`;
            tableRow += `<td><span> 
                    <input type="button" value="Update">&nbsp;<input type="button" value="Delete">
                </span></td> </tr>`;
            $("#table2").append(tableRow);
        }
        
    });
    console.log("Here in END of updateTableView");
}

function insertIntoTouristSpotsArray(dummyData) {
    dummyData.forEach(spot => {
        spot["id"] = assignId();
        spot["isAMatch"] = false;

        console.log(spot);
        touristSpots.push(spot);
    });
    updateTableView();
}

function convertImageToBase64() {
    let imageFile = $("#spotImage").prop("files")[0];
    if (imageFile) {          
        // $("#preview").attr("src", URL.createObjectURL(imageFile));
        console.log(imageFile);

        let reader = new FileReader();
        reader.readAsDataURL(imageFile);

        reader.onloadend = function () {
            imageBase64 = reader.result;
            // console.log(imageBase64);
            // $("#image64").text(imageBase64);
            $("#preview").attr("src", imageBase64);
        }
    }
}