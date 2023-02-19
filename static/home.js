let price_section = document.querySelector('.price_section');
 fetch('http://localhost:3000/')
    .then(data => {
        console.log(data.json());
    })

let index = 1;


Object.keys(data).forEach(element => {
    const price_box = document.createElement('div');
    price_box.className = 'price_box';
    let final = { index: index++, name: data[element].name, last: data[element].last, 'buy': data[element].buy, 'sell': data[element].sell, volume: data[element].volume, base_unit: data[element].base_unit }

    Object.keys(final).forEach(key => {
        const li = document.createElement('li');
        li.innerText = final[key];
        price_box.appendChild(li);
    });
    price_section.appendChild(price_box);
});

