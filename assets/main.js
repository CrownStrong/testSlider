const saleCounts = [100, 500, 1000, 5000, 10000];
const count = saleCounts.length;
const sliderEl = $('#priceSlider');

const values = (()=>{
    let arr = [saleCounts[0]]
    for(let i=1; i < saleCounts.length; i++){
        const diff = (saleCounts[i] - saleCounts[i - 1]) / 10;
        let num = saleCounts[i - 1];
        for(let j=0; j < 10; j++){
            num += diff;
            arr.push(num);
        }
    }
    return arr;
})()

$(()=>{
    sliderInit();
    getPrice().then(
        price=>{
            sliderEl.on(
                'slidechange', 
                (ev, ui)=>{
                    $('.form__price').text((values[ui.value]*price).toFixed(2));
                }
            );
            $('.form__price').text(saleCounts[1] * price);
        }
    )
    $('.form__buy').on('click', ev=>{
        ev.preventDefault();
        const card = $('.modal__content');
        console.log(card);
        card.addClass('rotate');
        setTimeout(()=>{
            card.removeClass('rotate');
        }, 3000);
    });
});

function sliderInit(price){
    sliderEl.slider({
        min: 0,
        max: values.length - 1,
        animate: 'fast',
        step: 1,
        value: 10,
        classes: {
            "ui-slider-handle": "slider__handle"
        }
    });
    generateLabels();
}
async function getPrice(){
    return 0.9349;
    const response = await fetch('https://eodhd.com/api/eod/EUR.FOREX?filter=last_close&api_token=demo&fmt=json');
    const json = await response.json();
    return json;
}
function generateLabels(){
    const template = $('.slide__label');
    for(let i=1; i < count; i++){
        const clone = template.clone(false);
        const label = clone.text(saleCounts[i]);
        label.css('left', `calc(${i/(count-1)*100}% - 12px)`);
        $('.slide__list').append(label);
    }
    template.text(saleCounts[0]);
}
