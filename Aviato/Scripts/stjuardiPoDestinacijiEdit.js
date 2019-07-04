
//window.onload = () => {

    var destinacija = document.querySelector("#Destinacija");

//    $(".stjuardi").load(`/Let/StjuardiPoDestinaciji?id=${destinacija.value}`);
    destinacija.addEventListener("change", function () {
        $(".stjuardi").load(`/Let/StjuardiPoDestinaciji?id=${destinacija.value}`);
    })
//}