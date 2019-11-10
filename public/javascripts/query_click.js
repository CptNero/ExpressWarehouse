console.log('Client-side code running');

var div = document.getElementById("target");
var btn_all = document.getElementById("query_all_btn");
var btn_outofstock = document.getElementById("query_outofstock_btn");
var btn_pos = document.getElementById("query_pos_btn");

if(btn_all)
{
    btn_all.addEventListener('click', function(e) {
        console.log('button was clicked');

        fetch('query/query_all_click', {method: 'POST'})
            .then(res => res.json())
            .then(result => render_all_productsHTML(result));
    });
}

if(btn_outofstock) {
    btn_outofstock.addEventListener('click', function (e) {
        console.log('button was clicked');

        fetch('query/query_outofstock_click', {method: 'POST'})
            .then(res => res.json())
            .then(result => render_outofstock_products(result));
    });
}

if(btn_pos) {
    btn_pos.addEventListener('click', function (e) {
        console.log('button was clicked');

        fetch('query/query_pos_click', {method: 'POST'})
            .then(res => res.json())
            .then(result => render_posof_products(result));
    });
}

function render_all_productsHTML(data) {

    document.getElementById("target").innerHTML = "";

    div.insertAdjacentHTML('beforeend', `
    <table class="table" id="retarget">
    <tr>
        <th>Serial ID</th>
        <th>Shelf ID</th>
        <th>Product name</th>
        <th>Stored at row</th>
        <th>Stored at column</th>
        <th>Date</th>
        <th>Quantity</th>
        <th>Units sold</th>
        <th>Cooled</th>
        <th>Guarded</th>
    </tr>
    </table>`);

    table = document.getElementById("retarget");

    for(var i = 0; i < data.length; i++){
        table.insertAdjacentHTML('beforeend', `
            <tr>
            <td>${data[i].serial_id}</td>
            <td>${data[i].shelf_id}</td>
            <td>${data[i].product_name}</td>
            <td>${data[i].stored_at_row}</td>
            <td>${data[i].stored_at_column}</td>
            <td>${data[i].year}/${data[i].month}/${data[i].day} ${data[i].hour}:${data[i].minute}</td>
            <td>${data[i].quantity}</td>
            <td>${data[i].units_sold}</td>
            <td>${data[i].is_cooled}</td>
            <td>${data[i].is_guarded}</td>
            </tr>`)
    }
}

function render_outofstock_products(data) {

    document.getElementById("target").innerHTML = "";

    div.insertAdjacentHTML('beforeend', `
    <table class="table" id="retarget">
    <tr>
        <th>Serial ID</th>
        <th>Shelf ID</th>
        <th>Product name</th>
        <th>Stored at row</th>
        <th>Stored at column</th>
        <th>Date</th>
        <th>Quantity</th>
        <th>Units sold</th>
        <th>Cooled</th>
        <th>Guarded</th>
    </tr>
    </table>`);

    table = document.getElementById("retarget");

    for(var i = 0; i < data.length; i++){
        table.insertAdjacentHTML('beforeend', `
            <tr>
            <td>${data[i].serial_id}</td>
            <td>${data[i].shelf_id}</td>
            <td>${data[i].product_name}</td>
            <td>${data[i].stored_at_row}</td>
            <td>${data[i].stored_at_column}</td>
            <td>${data[i].year}/${data[i].month}/${data[i].day} ${data[i].hour}:${data[i].minute}</td>
            <td>${data[i].quantity}</td>
            <td>${data[i].units_sold}</td>
            <td>${data[i].is_cooled}</td>
            <td>${data[i].is_guarded}</td>
            </tr>`)
    }
}

function render_posof_products(data) {

    document.getElementById("target").innerHTML = "";

    div.insertAdjacentHTML('beforeend', `
    <table class="table" id="retarget">
    <tr>
        <th>Product name</th>
        <th>Warehouse name</th>
        <th>Ware house ID</th>
        <th>Sector ID</th>
        <th>Shelf ID</th>
        <th>Stored at row</th>
        <th>Stored at column</th>
    </tr>
    </table>`);

    table = document.getElementById("retarget");

    for(var i = 0; i < data.length; i++){
        table.insertAdjacentHTML('beforeend', `
            <tr>
            <td>${data[i].product_name}</td>
            <td>${data[i].warehouse_name}</td>
            <td>${data[i].warehouse_id}</td>
            <td>${data[i].sector_id}</td>
            <td>${data[i].shelf_id}</td>
            <td>${data[i].stored_at_row}</td>
            <td>${data[i].stored_at_column}</td>
            </tr>`)
    }
}