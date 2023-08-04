// Инициализация слайдера
const Slider = new Swiper('.review__swiper', {
    navigation: {
        nextEl: ".review__btn_next",
        prevEl: ".review__btn_prev",
    },
    grabCursor: true,
})



$('.modal-opener').on('click', function () {
    OpenModal($(this));
})

$('.modal-closer').on('click', function () {
    CloseModal($(this));
})

$('.modal[data-modal=reserve] .modal__btn').on('click', function () {
    let [Name, Email] = [$('#name').val().trim(), $('#email').val().trim()];

    if (Name && validateEmail(Email)) {
        SendData({ Name: Name, Email: Email }, '/somephp.php')
        $('#name').val('');
        $('#email').val('');
        CloseModal($(this));
    }
    else {
        alert("Both fields are required")
    };
})

$('.burger__btn').on('click', function () {
    let action = $(this).attr('data-burger-action');

    switch (action) {
        case 'open':
            OpenBurger();
            LockScroll();
            break;
        case 'close':
            CloseBurger();
            UnlockScroll();
            break
    }
})

// Функции
function OpenModal(elem) {
    let CurrentModal = elem.attr('data-modal');

    // Закроем все открытые модалки ** Если такие есть
    if ($('.modal.active').leghth > 0) {
        $('.modal.active').removeClass('active');
    }
    else {
        LockScroll();
    }

    $(`.modal[data-modal=${CurrentModal}]`).addClass("active");
}

function CloseModal(elem) {
    let CurrentModal = elem.parents('.modal').attr('data-modal');
    $(`.modal[data-modal=${CurrentModal}]`).removeClass("active");

    UnlockScroll();
}

function SendData(data, url) {
    // Отправка аякс запроса
    // $.ajax({
    //     method: 'POST',
    //     url: url,
    //     data: data,
    //     done: function (data) {
    //         alert(data);
    //     }
    // })
}

function LockScroll() {
    if (!$("body").hasClass('scrolllock')) {
        $("body").addClass('scrolllock');
    }
}

function UnlockScroll() {
    $("body").removeClass('scrolllock');
}


const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};



function OpenBurger() {
    $('.burger').addClass('active');
}
function CloseBurger() {
    $('.burger').removeClass('active');
}