$(() => {
    var response_json = null;
    let url = "https://infosimples.github.io/estagio-em-programacao/assets/supplies/m11/webservice_items.json"
    let count = 0
    $.getJSON(
        url,
        function (data) {
            for (const value of data) {
                elements = [
                    document.createElement("th"),
                    document.createElement("td"),
                    document.createElement("td"),
                    document.createElement("td"),
                    document.createElement("td")
                ]
                elements[0].innerText = value.categoria;
                elements[1].innerText = value.item;
                elements[2].innerText = value.preco;
                elements[2].id=`${count}-price`
                elements[2].classList.add("price");
                elements[3].innerText = value.estoque;
                elements[4].innerHTML = `<input type="number" min="0" max="${value.estoque}" id="${count}-qtnd" class="qtnd">`;

                row = document.createElement("tr");

                elements.forEach(element => {
                    row.appendChild(element)
                });

                document.querySelector("tbody").appendChild(row);
                count++;
            }

            document.querySelectorAll(`input[type="number"]`).forEach((e) => {
                e.addEventListener("click", function () {updatePrice()});
            });
            updatePrice();
        }
    );
});

function updatePrice() {
    let total_value = 0
    let products_price = document.querySelectorAll(`td[class="price"]`)
    let products_qtnd = document.querySelectorAll(`input[class="qtnd"]`)
    for (let i = 0; i < products_price.length; i++) {
        total_value += products_price[i].innerText * products_qtnd[i].value
    }
    document.getElementById("total").innerText = total_value.toFixed(2)
}