document.addEventListener("DOMContentLoaded",function(){
	//variables needed to popup function
	var body = document.getElementsByTagName('body')[0];
	var navButton = document.querySelector('.navigation__icon');
	var menu = document.querySelector('.navigation__menu');
	var header = document.querySelector('header');
	var popupMenu = document.querySelector('.navigation__popup');
	var blackScene = document.querySelector('.blackScene');
	var background = document.querySelector('.background');
	var menuStatus = false;
	const XS_DEVICE_MAX_WIDTH = 576;
	const SM_DEVICE_MAX_WIDTH = 768;
	const MD_DEVICE_MAX_WIDTH = 991;
	const LG_DEVICE_MAX_WIDTH = 1200;
	//show popup menu function
	var showUpMenu = function(){
		startAnimation();
		menuStatus = !menuStatus;
		endAnimation();
		movingBackground();
	};
	//start the animation
	var startAnimation = function(){
		popupMenu.scrollTop = 0;
		if(window.screen.width < WINDOW_MIN_WIDTH){
			var blackSceneHeight = window.screen.height * ( WINDOW_MIN_WIDTH / window.screen.width)
			blackScene.style.height = "" + blackSceneHeight + "px" ;
		}
		if(menuStatus===false){
			body.classList.add('active');
			popupMenu.classList.add('active');
			navButton.classList.add('active');
			header.classList.add('active');
		}
		else{
			popupMenu.classList.remove('active');
			navButton.classList.remove('active');
			header.classList.remove('active');
			popupMenu.classList.add('passive');
			header.classList.add('passive');
			body.classList.remove('active');
		}
	}
	//end animation function
	var endAnimation = function(){
		blackScene.addEventListener('animationend',function(){
				popupMenu.classList.remove('passive');
				header.classList.remove('passive');
		});		
	};
	//add event listener when click navButton
	navButton.onclick = function(){
		showUpMenu();
	};
	//add mouse iteracting motion with background
	//move background function
	var movingBackground = function(){
		background.setAttribute('style','transform: translate(0px,0px)');	
		popupMenu.addEventListener('mousemove',function(){
			//get mouse position
			var x = event.clientX;
			var y = event.clientY;
			var dx = x-1100;
			var dy = y-125;
			x = dx.toFixed(2)/10;
			y = dy.toFixed(2)/10;
			if(menuStatus === true){
				background.setAttribute('style','transform: translate('+ x +'px,'+ y +'px)');
			}
		},false);
	};
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	//scroll animation for heading
	var headingScroll = function(){
		var slideHeading = document.querySelector('.description__heading');
		var servicesHeading = document.querySelector('.services__heading');
		var caseStudyHeading = document.querySelector('.case-study__heading');
		var caseStudySide = document.querySelector('.case-study__side');
		var referencesHeading = document.querySelector('.references__heading');
		var referencesSide = document.querySelector('.references__side');
		var footerHeading = document.querySelector('.footer__heading');
		var footerTel = document.querySelector('.tel');
		var footerMail = document.querySelector('.info-mail');
		var footerIcon = document.querySelector('.footer__icon');
		var footerRight = document.querySelector('.footer__right');
		var footerSide = document.querySelector('.footer__side');
		const startPositionSlide = 200;
		const startPostitionServices = 680;
		const startPositionCaseStudy = 1500;
		var startPositionReferences = (window.screen.width < XS_DEVICE_MAX_WIDTH) ? 2200 : 2400;
		var startPostitionFooter = (window.screen.width < XS_DEVICE_MAX_WIDTH ) ? 3350 : 2600;
		if(window.pageYOffset > startPositionSlide){
			slideHeading.classList.add('active');
		}
		if(window.pageYOffset > startPostitionServices){
			servicesHeading.classList.add('active');
		}
		if(window.pageYOffset > startPositionCaseStudy){
			caseStudyHeading.classList.add('active');
			caseStudySide.classList.add('active');
		}
		if(window.pageYOffset > startPositionReferences){
			referencesHeading.classList.add('active');
			referencesSide.classList.add('active');
		}
		if(window.pageYOffset > startPostitionFooter){
			footerHeading.classList.add('active');
			footerTel.classList.add('active');
			footerMail.classList.add('active');
			footerIcon.classList.add('active');
			footerRight.classList.add('active');
			footerSide.classList.add('active');
		}
		carouselItemsParalax();
	}
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	//add scroll event
	var headerStatus = false;
	//header scroll function
	var addHeaderScrollAnimation = function(){
		var scrollPosition = 300;
		if(window.pageYOffset>scrollPosition && headerStatus === false){
			header.classList.add('scroll');
			header.addEventListener('animationend',function(){
				headerStatus = true;
			})
		}
		else if (window.pageYOffset < scrollPosition && headerStatus === true){
			header.classList.remove('scroll');
			header.classList.add('scrollBack');
			header.addEventListener('animationend',function(){
				header.classList.remove('scrollBack');
				headerStatus = false;
			})
		}
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	//paralax animation
	//get needed variable
	//get slide height
	var slides = document.querySelectorAll('.slide__item');
	var slideHeight = window.getComputedStyle(slides[0],null).getPropertyValue('height');
	//get service heading offsetTop value
	//paralax function for slides
	var slideParalax = function(){
		slideHeight = parseInt(slideHeight);
		var slidePositionStart = 430;
		var slidePositionEnd = 500;
		const MAX_SLIDE_HEIGHT = 515;
		//paralax for slide height
		if(window.pageYOffset > slidePositionStart && window.pageYOffset < slidePositionEnd){
			var additionslideHeight = slideHeight + Math.floor((window.pageYOffset - slidePositionStart) / 4) ;
			if(additionslideHeight < MAX_SLIDE_HEIGHT){
				for (var i = slides.length - 1; i >= 0; i--) {
					slides[i].style.height = additionslideHeight + 'px';
				}
			}
		}
		else if(window.pageYOffset >=slidePositionEnd){
			for (var i = slides.length - 1; i >= 0; i--) {
					slides[i].style.height = '515px';
				}
		}
	}
	//paralax function for images and description 
	//get description offset top value
	var description = document.querySelector('.description');
	var descriptionTop = window.getComputedStyle(description,null).getPropertyValue('top');
	descriptionTop = parseInt(descriptionTop);
	//get images offset top value
	var images = [];
	for (var i = slides.length - 1; i >= 0; i--) {
		images[i] = slides[i].children[0];
	}
	var imagesTop = window.getComputedStyle(images[0],null).getPropertyValue('top');
	imagesTop = parseInt(imagesTop);
	var descriptionImageParalax = function(){
		var descriptionPositionStart = 170;
		var descriptionPositionEnd = 1100;
		const NORMAL_DES_OFFSET = 310;
		//for images
			var additionImageTop = imagesTop + Math.floor((window.pageYOffset) / 3);
			for (var i = images.length - 1; i >= 0; i--) {
				images[i].style.top =  additionImageTop + 'px';
			}
		//for description
		if(window.pageYOffset > descriptionPositionStart && window.pageYOffset < descriptionPositionEnd){
			var additionDescriptionTop = descriptionTop + Math.floor((window.pageYOffset - NORMAL_DES_OFFSET) / 8);
			description.style.top = additionDescriptionTop + 'px';
		}
	}
	//paralax function for service heading
	var serviceHeading = document.querySelector('.services__heading');
	var serviceHeadingTop = window.getComputedStyle(serviceHeading,null).getPropertyValue('top');
	serviceHeadingTop = parseInt(serviceHeadingTop);
	var serviceHeadingParalax = function(){
		const NORNAL_HEADING_OFFSET = 1000;
		var serviceHeadingStart = (window.screen.width < SM_DEVICE_MAX_WIDTH) ? 550 : 700;
		const serviceHeadingEnd = 1480;
		if(window.pageYOffset > serviceHeadingStart && window.pageYOffset < serviceHeadingEnd){
			var additionHeadingTop = serviceHeadingTop - Math.floor((window.pageYOffset - NORNAL_HEADING_OFFSET) /6);
			serviceHeading.style.top = additionHeadingTop + 'px';
		}
	}
	//paralax function for carousel item
	var carouselItems = document.querySelectorAll('.carousel');
	var carouselItemsStartPosition = 1700;
	var carouselItemsParalax = function(){
		if(window.pageYOffset > carouselItemsStartPosition){
			for (var i = carouselItems.length - 1; i >= 0; i--) {
				carouselItems[i].classList.add('active');
			}
		}
	};
	//scroll paralax
	var paralaxScroll = function(){
		slideParalax();
		descriptionImageParalax();
		serviceHeadingParalax();
		window.requestAnimationFrame(paralaxScroll);
	}
	///////////////////////////////////////////////////////////////////
	//add event listener to scroll event
	document.addEventListener('scroll',function(){
		//scroll animation for header
		addHeaderScrollAnimation();
		//scroll animation for headings
		headingScroll();
		if(window.screen.width >MD_DEVICE_MAX_WIDTH && window.innerWidth > MD_DEVICE_MAX_WIDTH){
			//paralax animation
			paralaxScroll();	
		}
		else{
			for (var i = images.length - 1; i >= 0; i--) {
				images[i].style.top =  '0px';
			}
			return false;
		}

	});
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	//add text change event
	var text = document.querySelectorAll('.text');
	var Text = [['d','e','s','i','g','n',''],
	['p','r','o','d','u','c','e'],
	['d','e','l','i','v','e','r']];
	var j = 0;
	setInterval(function(){
		j = (j===2) ? 0 : j+1 ;
		for (var i = text.length - 1; i >= 0; i--) {
			text[i].classList.add('textUp');
		}
		setTimeout(function(){
			for (var i = text.length - 1; i >= 0; i--){
				text[i].classList.remove('textUp');
				text[i].classList.add('textIn');
				text[i].innerHTML = Text[j][i];
				text[i].addEventListener('animationend',function(){
					for (var i = text.length - 1; i >= 0; i--) {
						text[i].classList.remove('textIn');
					}
				});
			}
		},590);
	},3000);
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	//add slider
	var slideButtonPrev = document.querySelector('.slide__prev');
	var slideButtonNext = document.querySelector('.slide__next');
	slides = document.querySelectorAll('.slide__item');
	var i = 0;
	var nextDisplay,nowDisplay;
	var animationStop = true;
	var animationRunning = 0; // count how many animations have stopped
	//get slide indicator
	var getSlide = function(button){
		nowDisplay = slides[i];
		nextDisplay = (button === 'prev') ? ((i === 0) ? slides[slides.length-1] : slides[(i-1)]) : ((i === slides.length-1) ? slides[0] : slides[(i+1)]);
	}
	var animationEnd = function(){
		this.classList.remove('displaying');
		animationRunning++;
		if(animationRunning === 2){
			animationStop = true;
			animationRunning = 0;
			nowDisplay.classList.remove('fading');
		}
	}
	//change indicatior after slide change
	var changeIndicator = function(button){
		i = (button === 'prev') ? ( (i === 0) ? slides.length - 1 : i-1 ) : ((i === slides.length -1) ? 0 : i+1 );
	}
	//change slide function
	var changeSlide = function(button){
		if(animationStop === false){
			return false;
		}
		animationStop = false;
		getSlide(button);
		nowDisplay.classList.remove('active');
		nowDisplay.classList.add('fading');
		nextDisplay.classList.add('active');
		nextDisplay.classList.add('displaying');
		nextDisplay.children[0].classList.add('displaying');
		nextDisplay.addEventListener('animationend',animationEnd);
		nextDisplay.children[0].addEventListener('animationend',animationEnd);
		changeIndicator(button);
	}
	//get what button was clicked then call changeSlide function
	var getButton = function(){
		changeSlide((this === slideButtonPrev) ? 'prev' : 'next')
	}
	slideButtonPrev.addEventListener('click',getButton);
	slideButtonNext.addEventListener('click',getButton);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	//carousel for case study
	var WINDOW_MIN_WIDTH = 400;
	var carouselBody = document.querySelector('.carousel');
	var carousel = document.querySelectorAll('.cases');
	var carouselPrev = document.querySelector('.button__prev');
	var carouselNext = document.querySelector('.button__next');
	var carouselImages = document.querySelectorAll('.cases__pic');
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	//carousel size
	if(window.screen.width >= WINDOW_MIN_WIDTH){
		if(window.screen.width <= SM_DEVICE_MAX_WIDTH){
			for(var m = 0; m< carousel.length; m++){
				carousel[m].style.width = (window.screen.width - 90) + 'px';
				carouselImages[m].style.width = (window.screen.width - 90) + 'px';
				carouselImages[m].style.height = ((window.screen.width - 90) * 180 /290 ) + 'px';
				carouselBody.style.height = ((window.screen.width - 90) * 180 /290 + 140 ) + 'px';
			}
		}
		else if ( window.screen.width > SM_DEVICE_MAX_WIDTH && window.screen.width <= MD_DEVICE_MAX_WIDTH){
			for(var m = 0; m< carousel.length; m++){
				carousel[m].style.width = (window.screen.width - 150 - 60 - 100) + 'px';
				carouselImages[m].style.width = (window.screen.width - 150 - 60 - 100) + 'px';
				carouselImages[m].style.height = ((window.screen.width - 150 - 60 - 100) * 180 /290 ) + 'px';
				carouselBody.style.height = ((window.screen.width - 150 - 60 - 100) * 180 /290 + 140 ) + 'px';
			}
		}
		
	}
	else{
		for(var m = 0; m< carousel.length; m++){
			carousel[m].style.width = (WINDOW_MIN_WIDTH - 90) + 'px';
			carouselImages[m].style.width = (WINDOW_MIN_WIDTH - 90) + 'px';
			carouselImages[m].style.height = ((WINDOW_MIN_WIDTH - 90) * 180 /290 ) + 'px';
			carouselBody.style.height = ((WINDOW_MIN_WIDTH - 90) * 180 /290 + 140 ) + 'px';
		}
	}
	window.onresize = function(){
		if(window.innerWidth >= WINDOW_MIN_WIDTH && window.innerWidth <= SM_DEVICE_MAX_WIDTH){
			for(var m = 0; m< carousel.length; m++){
			carousel[m].style.width = (window.innerWidth - 90) + 'px';
			carouselImages[m].style.width = (window.innerWidth - 90) + 'px';
			carouselImages[m].style.height = ((window.innerWidth - 90) * 180 /290 ) + 'px';
			carouselBody.style.height = ((window.innerWidth - 90) * 180 /290 + 140 ) + 'px';
			}
		}
		else if ( window.innerWidth > SM_DEVICE_MAX_WIDTH && window.innerWidth <= MD_DEVICE_MAX_WIDTH){
			for(var m = 0; m< carousel.length; m++){
				carousel[m].style.width = (window.innerWidth - 150 - 60 - 100)/2 + 'px';
				carouselImages[m].style.width = (window.innerWidth - 150 - 60 - 100)/2 + 'px';
				carouselImages[m].style.height = ((window.innerWidth - 150 - 60 - 100)/2 * 180 /290 ) + 'px';
				carouselBody.style.height = ((window.screen.width - 150 - 60 - 100)/2 * 180 /290 + 140 ) + 'px';
			}
		}
		
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	//carousel animation
	//indicator
	var k = 0;
	//state if animations are running
	var carouselRunning = false;
	// element which will be in blur state
	var blurInElement;
	//element which will remove blur state
	var blurOutElement;
	//element which will display
	var fadeInElement;
	//element which will hide
	var fadeOutElement;
	//indicate which element is gonna be display or fade
	var carouselIndicate = function(button){
		if(window.screen.width <= SM_DEVICE_MAX_WIDTH || window.innerWidth <= SM_DEVICE_MAX_WIDTH){
			if(button==='prev'){
				blurInElement = carousel[k];
				fadeInElement = (k === carousel.length - 1) ? null : carousel[k+1];
				blurOutElement = (k>0) ?carousel[k-1] : null;
				fadeOutElement = (k>1)? null : carousel[k-2];
			}
			else{
				blurInElement = carousel[k];
				fadeInElement = (k > 0) ? carousel[k-1] : null;
				blurOutElement = (k < carousel.length -1 ) ? carousel[k+1] : null;
				fadeOutElement = (k < carousel.length -2) ? carousel[k+2] : null;
			}
		}
		else if((window.screen.width > SM_DEVICE_MAX_WIDTH && window.screen.width <=MD_DEVICE_MAX_WIDTH) || (window.innerWidth > SM_DEVICE_MAX_WIDTH && window.innerWidth <=MD_DEVICE_MAX_WIDTH)){
			if(button==='prev'){
				blurInElement = (k > 0 && k+1 <= carousel.length -1) ? carousel[k+1] : null;
				fadeOutElement =(k+1 <= (carousel.length-2))? carousel[k+2] : null;
				blurOutElement = (k > 0) ? carousel[k-1] : null;
				fadeInElement = (k > 1) ? carousel[k-2] : null;
				}
			else{
				blurInElement = carousel[k];
				fadeOutElement =(k > 0) ? carousel[k-1]: null;
				blurOutElement = ( k+1 <= carousel.length - 2) ? carousel[k+2] : null;
				fadeInElement = ( k+1 < carousel.length - 2) ? carousel[k+3] : null;
				console.log('abc');
			}
		}
		else{
			if(button==='prev'){
				blurInElement = (k > 0 && k+2 <= carousel.length -1) ? carousel[k+2] : null;
				fadeOutElement =(k+2 <= (carousel.length-2))? carousel[k+3] : null;
				blurOutElement = (k > 0) ? carousel[k-1] : null;
				fadeInElement = (k > 1) ? carousel[k-2] : null;
			}
			else{
				blurInElement = carousel[k];
				fadeOutElement =(k > 0) ? carousel[k-1]: null;
				blurOutElement = ( k+2 <= carousel.length - 2) ?carousel[k+3] : null;
				fadeInElement = ( k+2 < carousel.length - 2) ? carousel[k+4] : null;
			}
		}
		
	}
	//change the indicator which indicate the index of now displaying items
	var changeIndicatorCarousel = function(button){
		if(window.screen.width < SM_DEVICE_MAX_WIDTH || window.innerWidth < SM_DEVICE_MAX_WIDTH){
			k = (button === 'prev') ? ((k==0) ? k : k-1) : ((k=== carousel.length - 1 ) ? k : k+1);

		}
		else if((window.screen.width < MD_DEVICE_MAX_WIDTH && window.screen.width > SM_DEVICE_MAX_WIDTH) || (window.innerWidth < MD_DEVICE_MAX_WIDTH  && window.innerWidth > SM_DEVICE_MAX_WIDTH)){
			k = (button === 'prev') ? ((k==0) ? k : k-1) : ((k=== carousel.length - 2 ) ? k : k+1);
		}
		else{
			k = (button==='prev') ? ((k===0) ? k : k-1) : ((k=== carousel.length-3) ? k : k+1);
		}
		
	}
	var carouselAnimate = function(button){
		//remove passive state of button when indicator has changed
		//for prev button
		if(k === carousel.length-3 ){
			if(button === 'prev'){
				carouselNext.classList.remove('passive');
			}
		}
		//for next button
		if( k === 0){
			if(button==='next'){
				carouselPrev.classList.remove('passive');
			}
		}
		//if animations are running then click buttons will return false
		if(carouselRunning === true){
			return false;
		}
		//animations are running
		carouselRunning = true;
		//if hit the beginning of the carousel then prev button will not working
		if(k===0){
			if(button === 'prev'){
				carouselRunning = false;
				return false;
			}
		}
		//if hit the end of the carousel then next button will not working
		//for device's width < SM_DEVICE_MAX_WIDTHpx
		if(window.screen.width < SM_DEVICE_MAX_WIDTH || window.innerWidth < SM_DEVICE_MAX_WIDTH){
			if(k===carousel.length -1){
				if(button==='next'){
					carouselRunning = false;
					return false;
				}
			}
		}
		else if ( (window.screen.width < MD_DEVICE_MAX_WIDTH && window.screen.width > SM_DEVICE_MAX_WIDTH) || (window.innerWidth < MD_DEVICE_MAX_WIDTH && window.innerWidth > SM_DEVICE_MAX_WIDTH)){
			if(k===carousel.length -2 ){
				if(button ==='next'){
					carouselRunning = false;
					return false;
				}
			}
		}
		else{
			if(k===carousel.length - 3){
				if(button ==='next'){
					carouselRunning = false;
					return false;
				}
			}
		}
		
		//translate carouse
		translateCarousel(button);
		//indicate what carousel to hide and fade
		carouselIndicate(button);
		//add animation
		animate(button);
		//change the indicator
		changeIndicatorCarousel(button);
		//add passive status to button when hit the begin or the end of the carousel
		if(window.screen.width < SM_DEVICE_MAX_WIDTH || window.innerWidth < SM_DEVICE_MAX_WIDTH){
			if(k === carousel.length-1 ){
			carouselNext.classList.add('passive');
			}
		}
		else if(window.screen.width < MD_DEVICE_MAX_WIDTH || window.innerWidth < MD_DEVICE_MAX_WIDTH && window.screen.width > SM_DEVICE_MAX_WIDTH && window.innerWidth > SM_DEVICE_MAX_WIDTH){
			if( k === carousel.length -2 ){
				carouselNext.classList.add('passive');
			}
		}
		else{
			if(k === carousel.length-3 ){
			carouselNext.classList.add('passive');
			}
		}
		if( k === 0){
			carouselPrev.classList.add('passive');
		}
		//delay 0.7s in order to complete transition and animation
		setTimeout(function(){
			carouselRunning = false;
		},600);
	}
	//fn to translate carousel when click button
	var translateCarousel = function(button){
		//distance want to translate the carousel body
		var distanceTranslate = window.getComputedStyle(carousel[0],null).getPropertyValue('width');
		distanceTranslate = parseInt(distanceTranslate) + 30 ;
		//get carousel translate value now
		var carouselWrapper = document.querySelector('.case-study__item');
		//return a string or null
		var carouselTranslate = window.getComputedStyle(carouselWrapper,null).getPropertyValue('transform');
		if(carouselTranslate === 'none'){
			carouselWrapper.style.transform = (button === 'prev') ? ("translateX("+distanceTranslate+"px);") : ("translateX(-"+distanceTranslate+"px)");
		}
		else{
			//get translate value in number format
			carouselTranslate = parseInt(carouselTranslate.slice(19,-4));
			if(button === 'prev'){
				carouselTranslate += distanceTranslate;
				carouselWrapper.style.transform = "translateX("+carouselTranslate +"px)";
			}
			else{
				carouselTranslate -= distanceTranslate;
				carouselWrapper.style.transform = "translateX("+carouselTranslate +"px)";
			}
		}
	}
	//animate fn to carousel item to fade and display
	var animate = function(button){
		if(fadeOutElement){
			fadeOutElement.classList.remove('blurElement');
			fadeOutElement.classList.add('passive');
		}
		if(blurOutElement){
			blurOutElement.classList.remove('passive');
		}
		if(blurInElement){
			blurInElement.classList.add('passive');
		}
		if(!!fadeInElement){
			fadeInElement.classList.remove('passive');
			fadeInElement.classList.add('fadeInCarousel');
			fadeInElement.classList.add('passive');
			fadeInElement.addEventListener('animationend',function(){
				fadeInElement.classList.remove('fadeInCarousel');
			});
		}
	}
	var getButtonCarousel = function(){
		carouselAnimate((this === carouselPrev) ? 'prev' : 'next');
	}
	carouselPrev.addEventListener('click',getButtonCarousel);
	carouselNext.addEventListener('click',getButtonCarousel);
},false);