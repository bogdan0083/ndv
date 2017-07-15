jQuery(document).ready(function () {

	$(".fancybox").fancybox();

	$(".select").selectize({});
    $('.selectize-control').click(function(){
        var sInt = $(this).find(".selectize-dropdown-content .option").size();
        if (sInt > 7) {
            $('.nicescroll-rails').removeClass('hides');
            $(this).find(".selectize-dropdown-content").niceScroll({
                autohidemode: false,
                cursorwidth: 24,
                cursorcolor: '#fff',
                cursorborder: '1px solid #bdbdbd',
                cursorborderradius: 24,
                scrollspeed: 20,
                cursorminheight: 24,
                cursorfixedheight: 24,
                railoffset: {left: 4}
            });
    	}else if(sInt < 7){
            setTimeout(function(){
                $('.nicescroll-rails').addClass('hides');
            }, 0);
            $(this).find(".selectize-dropdown-content").getNiceScroll().hide();
        }
    });

	$(".scroll").click(function() {
		$.scrollTo($(".divScroll"), 800, {
			offset: 0
		});
	});

	$(".scrollTo").click( function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top - 25;
		$('body,html').animate({scrollTop: top}, 1500);
	});


	$('.gf_list li:not(.active) .desc_txt').hide();
	$('.gf_list li .desc_ttl h4').click(function(){
		$('.gf_list li').removeClass('active');
		$(this).closest('li').toggleClass('active');
		$('.gf_list li .desc_txt').slideUp();
		$(this).closest('li').find('.desc_txt').slideDown();
	});

	$('input.email').inputmask({
		mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
		greedy: !1,
		onBeforePaste: function (pastedValue, opts) {
			pastedValue = pastedValue.toLowerCase();
			return pastedValue.replace("mailto:", "");
		},
		definitions: {
			'*': {
				validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
				cardinality: 1,
				casing: "lower"
			},
			"-": {
				validator: "[0-9A-Za-z-]",
				cardinality: 1,
				casing: "lower"
			}
		}
	});

	if($('input').is('.phone')){
		$('input.phone').inputmask("+7 (999) 999-99-99");
	};

	$('.intg').bind("change keyup input click", function() {
	    if (this.value.match(/[^0-9]/g)) {
	        this.value = this.value.replace(/[^0-9]/g, '');
	    };
	});

	$('.btn_price').click(function(){
		$('.btn_price').removeClass('active');
		$(this).addClass('active');
	});

	$('#number_rooms .gb').click(function(){
		$(this).toggleClass('active');
	});

	$('.global_filter .adv_search').click(function(){
		$(this).toggleClass('open');
		$('.adv_search_desc').slideToggle();
	});

	$('.os_btn').click(function(){
		$(this).toggleClass('open');
		$('.offers_shares_desc').slideToggle();
	});

	$('#hmbrg').click(function(){
		$(this).toggleClass('open');
	});

	$('#finish_btn .gb').click(function(){
		$('#finish_btn .gb').removeClass('active');
		$(this).addClass('active');
	});

	$('#location_btn .gb').click(function(){
		$('#location_btn .gb').removeClass('active');
		$(this).addClass('active');
	});

	resizeFlatImg();

	function resizeFlatImg(){
		var fDescImg = $('.mc_list li .desc_img img').height();
		$('.mc_list li .desc_img').css({"height": fDescImg});
	}

    $(window).resize(function(){
        resizeFlatImg();
    });


 	$(function(){
		$('.news_list li .desc a .desc_txt p').succinct({size : 48});
	});


    var slr_card_product = new Swiper('.slr_card_product', {
		loop: true,
		autoplay: 0,
		speed: 4200,
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
		preventClicks: false,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		paginationType: 'fraction'
    });

    var cpTtl = $('.cpd_list li .desc .desc_ttl h5');
    $(cpTtl).click(function(){
    	$('.cpd_list li').removeClass('active');
    	$(this).closest('li').addClass('active');
    	$('.cpd_list li .desc .desc_txt').slideUp();
    	$(this).closest('li').find('.desc .desc_txt').slideDown();
    });



    if($('div').is('#cp_map')){
    	initCpMap();
    }

	var map;
	function initCpMap() {

		var myLatlng = {lat: 55.638406, lng: 37.8457162};

		map = new google.maps.Map(document.getElementById('cp_map'), {
			center: myLatlng,
			zoom: 12
		});


		var image = 'img/cp_marker.png';
        var cpMarker = new google.maps.Marker({
          position: {lat: 55.638406, lng: 37.8457162},
          map: map,
          icon: image,
          animation: google.maps.Animation.DROP,
        });
   }


	$(".fancy_albums").fancybox({
       fitToView : false,
       width     : 'auto',
       height    : 'auto',
       margin: [0, 0, 0, 0],
       autoSize  : false,
       padding:[0, 0, 0, 0],
       	beforeShow: function () {
        	$('.fancybox-overlay-fixed').addClass('alb_bg');
    	},
       tpl: {
         wrap: '<div class="fancybox-wrap popup_alb" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
       },
	});



    if($('div').is('#one_map')){
    	initOneMap();
    }

	var map;
	function initOneMap() {

		var myLatlng = {lat: 55.639007, lng: 37.847461};

		map = new google.maps.Map(document.getElementById('one_map'), {
			center: myLatlng,
			zoom: 14,
			disableDefaultUI: true
		});


		var image = 'img/cp_marker.png';
        var cpMarker = new google.maps.Marker({
          position: {lat: 55.639007, lng: 37.847461},
          map: map,
          icon: image,
          //animation: google.maps.Animation.DROP,
        });
   }

   var rtdTtl = $('.rtd_list li .desc .desc_ttl h5');

   $(rtdTtl).click(function(){
   		$('.rtd_list li .desc .desc_txt').slideUp();
   		$(this).closest('.desc').find('.desc_txt').slideDown();
   		$('.rtd_list li .desc').removeClass('active');
   		$(this).closest('.desc').addClass('active');
   		var rtdTxt = $(this).closest('.desc').find('.desc_ttl').find('.i_car').find('i').text();
   		$('.map_time h4').text(rtdTxt)
   });

	if($('div').is('.cnt_gallery')){

$('#cnt_slideshow').desoSlide({
    thumbs: $('#cnt_slideshow_thumbs li > a'),
    auto: {
        start: true
    },
    first: 1,
    interval: 2000,
    controls:{
    	show:   false,
    	keys:   false
    }
});

	}



});


(function($){
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Mac') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
		$('html').addClass('safari_mac');
	}
})(jQuery);

(function($) {
	$(function() {
		$('ul.tm_list').on('click', 'li:not(.active)', function() {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('div.tab_menu').find('div.tm_desc').removeClass('active').eq($(this).index()).addClass('active');
		});
	});
})(jQuery);


$(window).load(function () {

	// rsCol();
	// function rsCol(){
	// 	var hH = $('#wrapper').outerHeight(true);
	// 	$('.global_filter').css({'height': hH});
	// }

	// $(window).resize(function(){
	// 	rsCol();
	// });

    function setEqualHeight(columns) {
      var tallestcolumn = 0;
      columns.css('height', '');
      columns.each(function() {
        currentHeight = $(this).height();
        if(currentHeight > tallestcolumn) {
          tallestcolumn = currentHeight;
        }
      });
      columns.height(tallestcolumn);
    }

    setEqualHeight(jQuery(".sic"));


	var columns = $('.sic');


	jQuery(window).resize(function(){

	    setEqualHeight(jQuery(".sic"));

	});

});
(function($) {
	$(function() {
		$('.route_tabs_list').on('click', 'li:not(.active)', function() {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.route_tabs').find('.route_tabs_desc').removeClass('active').eq($(this).index()).addClass('active');
				if($('.route_tabs_list li').is('.active')){
					$('.route_tabs_list li').removeClass('nb');
					$(this).prev().addClass('nb');
				};
		});
		$('.route_tabs_list').on('click', 'li:first-child', function() {
			$('.map_time').removeClass('pedestrian');
			$('.map_time').removeClass('public_transport');
			//$('.map_time h4').text('0');
		});
		$('.route_tabs_list').on('click', 'li:nth-child(2)', function() {
			$('.map_time').removeClass('pedestrian');
			$('.map_time').addClass('public_transport');
			//$('.map_time h4').text('0');
		});
		$('.route_tabs_list').on('click', 'li:last-child', function() {
			$('.map_time').addClass('pedestrian');
			$('.map_time').removeClass('public_transport');
			//$('.map_time h4').text('0');
		});
	});

  // Новые скрипты
  // Показ полных фильтров в самом проекте
	$('.filter-inner .adv_search').click(function(){
		$(this).toggleClass('open');
		$('.js-filter-toggle').slideToggle();
	});

  // Кнпоки сортировки проектов
  $('.filter-sort-buttons').on('click', '.js-sort-btn', function (e) {
    e.preventDefault();
    $(this).parent().find('.js-sort-btn').removeClass('active');
    $(this).addClass('active');
  });

  // круг с прогрессом
  $('.js-circle').circleProgress({
    startAngle: Math.PI * 1.5,
    size: 32,
    thickness: 2,
    emptyFill: "#dfdfdf"
  });

  // Показать всю таблицу с проектами по клику
  var tableHeight = null;
  var $projectTableWrap = $('.js-table-wrap');
  var $projectTable = $projectTableWrap.find('table');

  $('.js-table-toggle').click(function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('active');
    if ($this.hasClass('active')) {
      $this.find('span').text('Скрыть');
      tableHeight = $projectTableWrap.height();
      $projectTableWrap.animate({
        'max-height': $projectTable.height()
      });
    } else {
      $this.find('span').text('Показать все');
      $projectTableWrap.animate({
        'max-height': tableHeight
      });
    }
  });

  var $rangeSlider = $('.js-range-slider');
  var rangeCount = $rangeSlider.length;
  var rangeInitializedTimes = 0;

  $rangeSlider.ionRangeSlider({
      grid: false,
      min: 1800000,
      max: 30000000,
      from: 3200000,
      to: 25000,
      step: 100000,
      hide_min_max: true,
      hide_from_to: true,
      onStart: onSliderRangeChange,
      onChange: onSliderRangeChange
    });

  function onSliderRangeChange(data) {
    var $parent = $(data.input).parent();
    var $rangeInput = $parent.find('.js-input');
    var $triangle = $parent.find('.js-triangle');
    var offset = Math.round(data.from_percent) / ($parent.width() - 138) * 100;
    var $knob = $(data.slider[0]).find('.irs-slider');

    if (rangeInitializedTimes <= rangeCount) {
      setTimeout(function () {
        $triangle.css('left', Math.round($knob.position().left));
      }, 100);
      rangeInitializedTimes += 1;
    } else {
      $triangle.css('left', $knob.position().left);
    }

    $rangeInput.css('left', offset)
    $rangeInput.val( numberWithSpaces(data.from) );
  }

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

    var projectPreviewSlider = new Swiper('.project-preview-slider', {
  		loop: false,
  		autoplay: 0,
  		speed: 4200,
      pagination: '.swiper-pagination',
      slidesPerView: 1,
      paginationClickable: true,
      spaceBetween: 0,
  		preventClicks: false,
  		nextButton: '.swiper-button-next',
  		prevButton: '.swiper-button-prev',
  		paginationType: 'fraction'
    });

    // Открытие изменений в документах при клике
    $('.js-toggle-changes').click(function (e) {
      e.preventDefault();
      $(this).toggleClass('active');
      $(this).closest('.js-doc').find('.doc-changes').slideToggle();
    });

    // Открытие всех документов в блоке
    $('.js-docs-toggle').click(function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.toggleClass('active')
      if ($this.hasClass('active')) {
        $this.find('span').text('Скрыть');
        $this.parent().prev().slideToggle();
      } else {
        $this.find('span').text('Еще 15');
        $this.parent().prev().slideToggle();
      }
    });

    // Показываем ВСЕ блоки с документами в определенной секции (кнопка "Показать все")

    $('.js-all-docs-toggle').click(function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.toggleClass('active');
      var $hiddenDocs = $this.parent().prev('.js-hidden-docs');
      var $hiddenDocsInner = $hiddenDocs.find('.inner');
      var height = $hiddenDocsInner.height();
      if ($this.hasClass('active')) {
        $this.find('span').text('Скрыть все');
        $hiddenDocs.animate({ height: height });
      } else {
        $this.find('span').text('Показать все');
        $hiddenDocs.animate({ height: 168 });
      }
    });

    // Яндекс карты
    ymaps.ready(init);
    var locationMap, infrastructureMap;

    function init(){
        // Карта

        // Задаем шаблон для метки. Это необходимо, т.к метка это кружочек и внутри иконка. Сохранять каждую метку вместе с кружком не нужно, можно через свойства метки добавить нужную иконку в круг

        var markLayout = ymaps.templateLayoutFactory.createClass('<div class="map-mark $[properties.class]"><img src="$[properties.imgSrc]"/></div>');

        // Карта локации
        // Если элемент присутствует в DOM, запускаем карту
        if ($('#location-map').length > 0) {
          locationMap = new ymaps.Map("location-map", {
              center: [55.637988, 37.845992],
              zoom: 16,
              controls: []
          });
          // Метки
          myPlacemark1 = new ymaps.Placemark([55.640402, 37.849277], {imgSrc: 'img/building-big.svg', class: 'red'}, {
            // Шаблон иконки
            iconLayout: markLayout,
            iconImageSize: [47, 50]
          });

          myPlacemark2 = new ymaps.Placemark([55.638900, 37.845500], {imgSrc: 'img/bus.svg'}, {
            iconLayout: markLayout,
            iconImageSize: [47, 50],
          });

          myPlacemark3 = new ymaps.Placemark([55.638022, 37.846301], {imgSrc: 'img/bus.svg'}, {
            iconLayout: markLayout,
            iconImageSize: [47, 50]
          });

          myPlacemark4 = new ymaps.Placemark([55.638500, 37.841050], {imgSrc: 'img/bus.svg'}, {
            iconLayout: markLayout,
            iconImageSize: [47, 50]
          });

          myPlacemark5 = new ymaps.Placemark([55.637408, 37.839626], {imgSrc: 'img/m.svg'}, {
            iconLayout: markLayout,
            iconImageSize: [47, 50]
          });

          locationMap.geoObjects
            .add(myPlacemark1)
            .add(myPlacemark2)
            .add(myPlacemark3)
            .add(myPlacemark4)
            .add(myPlacemark5);
          }

          // Карта инфраструктур ЖК
          if ($('#infrastructure-map').length > 0) {
            infrastructureMap = new ymaps.Map("infrastructure-map", {
                center: [55.637988, 37.845992],
                zoom: 15,
                controls: []
            });
            // Метки
            myPlacemark1 = new ymaps.Placemark([55.637594, 37.844335], {imgSrc: 'img/cart.svg'}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });
            myPlacemark2 = new ymaps.Placemark([55.634651, 37.852961], {imgSrc: 'img/smile.svg'}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });

            myPlacemark3 = new ymaps.Placemark([55.637758, 37.850086], {imgSrc: 'img/r.png'}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });
            myPlacemark4 = new ymaps.Placemark([55.640075, 37.850876], {imgSrc: 'img/building-big.svg', class: "red"}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });
            myPlacemark5 = new ymaps.Placemark([55.640415, 37.853579], {imgSrc: 'img/r.png'}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });
            myPlacemark6 = new ymaps.Placemark([55.641823, 37.845404], {imgSrc: 'img/med.svg'}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });
            myPlacemark7 = new ymaps.Placemark([55.644080, 37.848387], {imgSrc: 'img/school.svg'}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });
            myPlacemark8 = new ymaps.Placemark([55.642976, 37.853086], {imgSrc: 'img/cart.svg'}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });
            myPlacemark9 = new ymaps.Placemark([55.645883, 37.853834], {imgSrc: 'img/smile.svg'}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });
            myPlacemark10 = new ymaps.Placemark([55.641927, 37.858212], {imgSrc: 'img/school.svg'}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });

            myPlacemark11 = new ymaps.Placemark([55.640471, 37.859843], {imgSrc: 'img/tree.svg'}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });

            myPlacemark12 = new ymaps.Placemark([55.641369, 37.868082], {imgSrc: 'img/tree.svg'}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });

            myPlacemark13 = new ymaps.Placemark([55.642291, 37.871644], {imgSrc: 'img/tree.svg'}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });


            myPlacemark14 = new ymaps.Placemark([55.645616, 37.869756], {imgSrc: 'img/tree.svg'}, {
              // Шаблон иконки
              iconLayout: markLayout,
              iconImageSize: [47, 50],
              iconOffset: [-23, -50]
            });

            infrastructureMap.geoObjects
              .add(myPlacemark1)
              .add(myPlacemark2)
              .add(myPlacemark3)
              .add(myPlacemark4)
              .add(myPlacemark5)
              .add(myPlacemark6)
              .add(myPlacemark7)
              .add(myPlacemark8)
              .add(myPlacemark9)
              .add(myPlacemark10)
              .add(myPlacemark11)
              .add(myPlacemark12)
              .add(myPlacemark13)
              .add(myPlacemark14)
          }
    }
})(jQuery);
