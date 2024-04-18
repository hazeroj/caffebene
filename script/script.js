$(function () {
    const wWith = $(window).width();
    const slide = $('#slide');
    let n, i, timer, nextSlide;
    const nav =$('nav')
    const gnb = nav.find('.gnb>li')
    const lnb = gnb.find('.sub')
    const lnbBack = $('.back')



    // 슬라이드 
    function startSlide() {

        timer = setInterval(function autoSlide() {
            n = slide.find('.act1').parent().index();
            nextSlide = (n + 1) % 3
            // console.log(nextSlide)
            slide.find('.s_btn>li a').removeClass('act1').parent().eq(nextSlide).find('a').addClass('act1')
            slide.find('.s_img').stop().animate({ 'left': -wWith * nextSlide + 'px' }, 1000)

        }, 4000);
    }

    startSlide();

    function stopSlide() {
        clearInterval(timer)
    }

    slide.mouseenter(function () { stopSlide(); })
    slide.mouseleave(function () { startSlide(); })

    slide.find('.s_btn>li a').click(function () {
        i = $(this).parent().index();
        $(this).addClass('act1').parent().siblings().find('a').removeClass('act1')
        // console.log(i);
        $('.s_img').stop().animate({ 'left': -wWith * i + 'px' }, 1000)
    })

    // 메뉴
    const menu = $('#menu')
    const menuBack = menu.find('.menu_back a')
    const menuList = menu.find('.menu_list>div')

    menuBack.click(function () {
        $(this).addClass('act2').parent().siblings().find('a').removeClass('act2');
        i = $(this).parent().index();
        $('.menu_back').css('background', 'url("./images/menu_back' + i + '.png") center /cover')
        menuList.eq(i).show().siblings().hide();
        menu.find('.menu_center').attr('src', './images/menu' + i + '.png')
    })


    // 푸드(좌우슬라이드)  
    const food = $('#food')
    let l_btn = food.find('.l_btn')
    let r_btn = food.find('.r_btn ')
    let foodSlide = food.find('ul')

    r_btn.click(function () {
        foodSlide.find('li:first-child').appendTo(foodSlide)
    })
    l_btn.click(function () {
        foodSlide.find('li:last-child').prependTo(foodSlide)
    })

    // 사이드배너
    const banner = $('#banner li');

    let m = 0
    function sBanner() {
        nextSlide = (m + 1) % 3

        banner.eq(nextSlide).fadeIn(2000);
        banner.eq(m).fadeOut(2000);

        m = nextSlide;

    }

    setInterval(sBanner, 8000);


    // 내비게이션 효과
    lnb.click(function () {
        $(this).prev().css('font-weight', '800')
    })
    lnb.mouseout(function () {
        $(this).prev().css('font-weight', '400')
    })


    // pc
    if ($(window).width() >= 1279) {


        // 내비게이션

        gnb.mouseenter(function () {
            lnb.stop().slideDown();
            lnbBack.stop().slideDown();
        })

        lnbBack.mouseout(function () {
            lnb.stop().slideUp();
            lnbBack.stop().slideUp();
        })


        // 탑버튼

        const topBtn = $('.top');

        $(window).scroll(function () {
            let scTop = $(this).scrollTop();

            // console.log(scTop)
            if (scTop >= 600) {
                topBtn.fadeIn();
            } else { topBtn.fadeOut(); }
        })

        topBtn.click(function () {
            $(window).scrollTop(0);
        });
    }


    // 태블릿
    if($(window).width()<1279){

        // 내비게이션
        nav.find('.nav_btn ').click(function(){
            $(this).siblings().stop().slideToggle();
            nav.find('a:nth-child(3)').css('display','block')
            $(this).find('span').toggleClass('c_btn');
            lnb.slideUp();
        })

        gnb.find('a').click(function(){
            $(this).next(lnb).slideToggle().parent().siblings().find(lnb).slideUp();
        })


    }

})