
const board_id = 3934194107;
const key1 = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIzNjE2NzQ4MCwidWlkIjozODY2OTA2NCwiaWFkIjoiMjAyMy0wMi0xMFQxMjoxNjowOS43NzRaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTA1OTI2MTUsInJnbiI6InVzZTEifQ.oNz6k1Glu1YMbLwRHwYnVsQiOBcsMgzTWDwDJJgkSLY';

document.addEventListener("DOMContentLoaded", async () => {
    const date = document.querySelector('#date');

    const name = document.querySelector('.js-name'),
        email = document.querySelector('.js-email'),
        address = document.querySelector('.js-address'),
        area = document.querySelector('.js-area'),
        language = document.querySelector('.js-language'),
        phone = document.querySelector("#phone"),
        payment = document.querySelector(".js-payment"),
        tariff = document.querySelector(".js-tariff"),
        comment = document.querySelector(".js-comment"),
        quantity = document.querySelector(".js-quantity"),
        file = document.querySelector(".js-file"),
        validStatus = document.querySelector('.js-valid-status'),
        form = document.querySelector('form'),
        date1 = document.querySelectorAll('.js-checkbox-1'),
        date2 = document.querySelectorAll('.js-checkbox-2'),
        date3 = document.querySelectorAll('.js-checkbox-3'),
        date4 = document.querySelectorAll('.js-checkbox-4'),
        forms = document.querySelectorAll('.needs-validation'),
        popup = document.querySelector('.js-modal'),
        reload = document.querySelector('.js-reload');

    // let query = `query { boards (ids: 3934194107) { columns { id title }}}`;
    let query3 = `mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:${board_id}, item_name:$myItemName, column_values:$columnVals) { id } }`;

    const tbilisiBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(41.628044, 44.659336),
        new google.maps.LatLng(41.727981, 44.872459)
    );
    const map = new google.maps.Map(document.getElementById('googleMap'), {
        center: {lat: 41.7151377, lng: 44.827096},
        zoom: 10,
        restriction: {
            latLngBounds: tbilisiBounds,
            strictBounds: true
        },
        mapTypeControl: false,
        streetViewControl: false,
    });

    var marker = new google.maps.Marker({
        map: map,
        draggable: true
    });
    let link = ''
    map.addListener('click', function(e) {
        if (map.getBounds().contains(e.latLng)) {
            marker.setPosition(e.latLng);
        } else {
            alert('Выберите место в пределах Тбилиси');
        }
        var latLng = marker.getPosition();
        link = 'https://www.google.com/maps/search/?api=1&query=' + latLng.lat() + ',' + latLng.lng();
        console.log(link);
    });

    marker.addListener('dragend', function() {
        var latLng = marker.getPosition();
        link = 'https://www.google.com/maps/search/?api=1&query=' + latLng.lat() + ',' + latLng.lng();
        console.log(link);
    });

    const today = moment();
    const sunday = 0;
    const tuesday = 2;
    const thursday = 4;
    const friday = 5;

    if (today.day() === 0) {
        today.add(1, 'week').startOf('week').add(tuesday, 'days');
    }

    const dates = [];

    for (let i = 0; i < 4; i++) {
        const date = moment(today).add(i * 7, 'days');
        const tuesdayDate = moment(date).day(tuesday).format('MMMM D');
        const thursdayDate = moment(date).day(thursday).format('D');
        const fridayDate = moment(date).day(friday).format('D');
        dates.push(`${tuesdayDate}-${thursdayDate}-${fridayDate}`);
    }
    console.log(dates)
    date1.forEach(el => {
        el.innerHTML = `${dates[0]}`
        el.value = `${dates[0]}`
    })

    date2.forEach(el => {
        el.innerHTML = `${dates[1]}`
        el.value = `${dates[1]}`
    })

    date3.forEach(el => {
        el.innerHTML = `${dates[2]}`
        el.value = `${dates[2]}`
    })

    date4.forEach(el => {
        el.innerHTML = `${dates[3]}`
        el.value = `${dates[3]}`
    })

    intlTelInput(phone, {
        customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
            return `${selectedCountryPlaceholder}`;
        },
        separateDialCode: true,
        autoPlaceholder: "aggressive",
        formatOnDisplay: true,
        placeholderNumberType: "MOBILE",
        initialCountry: "ge",
    });

    reload.addEventListener('click', () => {
        window.location = 'https://eco-taxi.ge/'
    })
    const sendData = async (date) => {
        const values = {
            "myItemName": "Task",
            "columnVals": JSON.stringify({
                "text": `${name.value}`,
                "dup__of_name": `${address.value}`,
                "email0": email.value,
                "phone": `${phone.value}`,
                "dropdown": `${area.value}`,
                "dropdown0": `${language.value}`,
                "dup__of_language": `${tariff.value}`,
                "dup__of_tariff": `${payment.value}`,
                "text9": `${comment.value}`,
                "text3": `${quantity.value}`,
                "text0": date,
                "location": link,
            })
        };
        await fetch("https://api.monday.com/v2", {
            method: 'post',
            headers: {
                'Content-Type': "application/json",
                'Authorization': key1
            },
            body: JSON.stringify({
                "query": query3,
                'variables': JSON.stringify(values),
            })
        }).then(res => (res.json()))
            .then(data => {
                if (data) {
                    const formData = new FormData();
                    formData.append('query', 'mutation ($file: File!) { add_file_to_column (item_id: ' + data.data.create_item.id + ', column_id: "files", file: $file) { id } }');
                    formData.append('variables[file]', file.files[0]);
                    if (file.files[0]) {
                        fetch('https://api.monday.com/v2/', {
                            method: 'POST',
                            headers: {
                                'Authorization': key1
                            },
                            body: formData
                        })
                            .then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.error(error))
                    }
                }
            })
    }
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', async (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    form.classList.add('was-validated')
                } else {
                    event.preventDefault();
                    if (date1[0].checked) {
                        await sendData(date1[0].value)
                    }
                    if (date2[0].checked) {
                        await sendData(date2[0].value)
                    }
                    if (date3[0].checked) {
                        await sendData(date3[0].value)
                    }
                    if (date4[0].checked) {
                        await sendData(date4[0].value)
                    }
                    validStatus.classList.add('is-active');
                    form.classList.remove('was-validated')
                    popup.classList.add('is-visible')
                    form.reset()
                }
            }, false)
        })
})
