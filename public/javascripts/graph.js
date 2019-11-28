var ctx = document.getElementById('myChart').getContext('2d');
var btn_get_stock = document.getElementById('btn_get_stock')
var label_array = [];
var sold_array = [];

if(btn_get_stock) {
    btn_get_stock.addEventListener('click', function (e) {
        console.log('button was clicked');

        fetch('graph/get_stock_data', {method: 'POST'})
            .then(res => res.json())
            .then(result => set_data(result));
    });

}

function set_data(data){

    for(let i = 0; i < data.length; i++){
        label_array[i] = data[i].product_name;
        sold_array[i] = data[i].units_sold;
    }

     var chart = new Chart(ctx, {
            type: 'line',

            data: {
                labels: label_array,
                datasets: [{
                    label: 'Sales',
                    backgroundColor: 'rgb(255, 255, 0)',
                    borderColor: 'rgb(255, 255, 0)',
                    data: sold_array
                }]
            },

            // Configuration options go here
            options: {
                legend: {
                            labels: {
                                fontColor: "white",

                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: "white",
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: "white",

                                }
                            }]
                        }
            }
        });

}



