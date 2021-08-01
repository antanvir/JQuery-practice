let touristSpots = [];
let sortOrder = "", searchString = "";
let assignId = generateId();

$(document).ready(function () {
    $.get("places.json", function (dummyData, status) {
        console.log("Status: " + status);
        // console.log("Data: " + data);
        console.log(dummyData[0], dummyData[3]);
        insertIntoTouristSpotsArray(dummyData);
        $("#imageSubmit").click(convertImageToBase64);

    });
});

function generateId() {
    let id = 0;
    return function() {
        return id++;
    };
}

function insertIntoTouristSpotsArray(dummyData) {
    dummyData.forEach(spot => {
        spot["id"] = assignId();
        spot["isAMatch"] = false;

        console.log(spot);
        touristSpots.push(spot);
    });
}

function convertImageToBase64() {
    let imageFile = $("#spotImage").prop("files")[0];
    console.log(imageFile);
    // if (imageFile) {          
    //     $("#preview").attr("src", URL.createObjectURL(imageFile));
    // }
    let imagebase64 = "";
    let reader = new FileReader();
    reader.onloadend = function () {
        imagebase64 = reader.result;
        // console.log(imagebase64);
        $("#imageBase64").text(imagebase64);
        $("#preview2").attr("src", imagebase64);
    }
    reader.readAsDataURL(imageFile);

}