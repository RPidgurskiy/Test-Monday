
const board_id = 3934194107;
// const key = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIzODQ5NTg4MiwidWlkIjozOTk3MDEzNiwiaWFkIjoiMjAyMy0wMi0yMFQxMzozMTo1OC42NTZaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTU0Njg1OTcsInJnbiI6ImV1YzEifQ.i3C3vm3seXMJenFzLYpd7lE4wY142mVqsRzsd8JUC00';
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
        forms = document.querySelectorAll('.needs-validation')

    let query = `{boards { name id description items { name id column_values{title id type text } } } }`;
    let query3 = `mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:${board_id}, item_name:$myItemName, column_values:$columnVals) { id } }`;

    // const day = new Date();
    // day.setDate(day.getDate() - 1);
    // const picker = new Litepicker({
    //     element: document.getElementById('lite'),
    //     elementEnd: document.getElementById('liteEnd'),
    //     minDays: 7,
    //     allowRepick: true,
    //     singleMode: false,
    //     minDate: day,
    //     numberOfColumns: 2,
    //     numberOfMonths: 2,
    // });

    const week1 = moment();
    const week2 = moment();
    const week3 = moment();
    const week4 = moment();

    const firstWeek = week1.add(1, 'week').startOf('week');
    const secondWeek = week2.add(2, 'week').startOf('week');
    const thirdWeek = week3.add(3, 'week').startOf('week');
    const fourthWeek = week4.add(4, 'week').startOf('week');

    const tuesday = firstWeek.clone().add(2, 'days');
    const thursday = firstWeek.clone().add(4, 'days');
    const friday = firstWeek.clone().add(5, 'days');

    const tuesdayString = tuesday.format('MMMM D');
    const thursdayString = thursday.format('D');
    const fridayString = friday.format('D');

    const tuesday1 = secondWeek.clone().add(2, 'days');
    const thursday1 = secondWeek.clone().add(4, 'days');
    const friday1 = secondWeek.clone().add(5, 'days');

    const tuesdayString1 = tuesday1.format('MMMM D');
    const thursdayString1 = thursday1.format('D');
    const fridayString1 = friday1.format('D');

    const tuesday2 = thirdWeek.clone().add(2, 'days');
    const thursday2 = thirdWeek.clone().add(4, 'days');
    const friday2 = thirdWeek.clone().add(5, 'days');

    const tuesdayString2 = tuesday2.format('MMMM D');
    const thursdayString2 = thursday2.format('D');
    const fridayString2 = friday2.format('D');

    const tuesday3 = fourthWeek.clone().add(2, 'days');
    const thursday3 = fourthWeek.clone().add(4, 'days');
    const friday3 = fourthWeek.clone().add(5, 'days');

    const tuesdayString3 = tuesday3.format('MMMM D');
    const thursdayString3 = thursday3.format('D');
    const fridayString3 = friday3.format('D');

    date1.forEach(el => {
        el.innerHTML = `${tuesdayString}-${thursdayString}-${fridayString}`
        el.value = `${tuesdayString}-${thursdayString}-${fridayString}`
    })

    date2.forEach(el => {
        el.innerHTML = `${tuesdayString1}-${thursdayString1}-${fridayString1}`
        el.value = `${tuesdayString1}-${thursdayString1}-${fridayString1}`
    })

    date3.forEach(el => {
        el.innerHTML = `${tuesdayString2}-${thursdayString2}-${fridayString2}`
        el.value = `${tuesdayString2}-${thursdayString2}-${fridayString2}`
    })

    date4.forEach(el => {
        el.innerHTML = `${tuesdayString3}-${thursdayString3}-${fridayString3}`
        el.value = `${tuesdayString3}-${thursdayString3}-${fridayString3}`
    })

    // const startElem = document.getElementById('lite');
    // const endElem = document.getElementById('liteEnd');
    // startElem.addEventListener('changeDate', function (e) {
    //     const valueDate = e.target.value.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2")
    //     return valueDate
    // });
    // endElem.addEventListener('changeDate', function (e) {
    //     const valueDateEnd = e.target.value.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2")
    //     return valueDateEnd
    // });

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
    // await fetch("https://api.monday.com/v2", {
    //     method: 'post',
    //     headers: {
    //         'Content-Type': "application/json",
    //         'Authorization': key1
    //     },
    //     body: JSON.stringify({
    //         "query": query,
    //     })
    // })
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
        }).then(res => res.json())
            .then(data => {
                if (data) {
                    const formData = new FormData();
                    formData.append('query', 'mutation ($file: File!) { add_file_to_column (item_id: ' + data.data.create_item.id + ', column_id: "files", file: $file) { id } }');
                    formData.append('variables[file]', file.files[0]);
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
            })
    }
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', async (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    event.preventDefault();
                    if (date1[0].value) {
                        await sendData(date1[0].value)
                    }
                    if (date2[0].value) {
                        await sendData(date2[0].value)
                    }
                    if (date3[0].value) {
                        await sendData(date3[0].value)
                    }
                    if (date4[0].value) {
                        await sendData(date4[0].value)
                    }
                    validStatus.classList.add('is-active');
                    form.classList.remove('was-validated')
                    form.reset()
                }
                form.classList.add('was-validated')
            }, false)
        })
})
