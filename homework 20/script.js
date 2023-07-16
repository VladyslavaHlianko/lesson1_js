let block = $('.wrapper');
let colors = $('.colors');
let car = $('.car');
let colorName = $('.text');

$.ajax({
    url: 'https://raw.githubusercontent.com/brightestsirius/Front-end-Pro-19/master/lesson_27/tesla.json',
    method: 'GET',
    success: function (data) {
        const parsedData = JSON.parse(data);
        parsedData.forEach(el => {
            const colorBlocks = $(`.colors.${el.img}`);
            colorBlocks.css({
                backgroundColor: `${el.color}`
            })
        });
    },
    error: error => console.log(error)
});

function click_color(parsedData) {
    parsedData.forEach((el, i) => {
        $(colors[i]).data('img', el.img).on('click', (event) => {
            car.attr('src', `https://mc-astro.github.io/tesla-roadster-colors/img/${$(event.currentTarget).data('img')}.jpg`);
            $(colors).removeClass('active');
            $(event.currentTarget).addClass('active');
            $(colorName).html(`${el.title}`)
        });
    });
}

$.ajax({
    url: 'https://raw.githubusercontent.com/brightestsirius/Front-end-Pro-19/master/lesson_27/tesla.json',
    method: 'GET',
    success: function (data) {
        const parsedData = JSON.parse(data);
        click_color(parsedData);
    },
    error: error => console.log(error)
})