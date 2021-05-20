/*
*  COS CUSTOM (20181127)
*  작성자 : 유영선
* */


var CosCustomController = [];
var BandedComponent;
var HUtil = {
    createCountrySelector: function() {
        new ContrySelector();
    }
};

(function() {
    /*
        TagElement : JSON을 HTML Object로 변환함
    */
    var TagElement = function(option) {
        var element = document.createElement(option.tag);

        (option.classname) ? element.className = option.classname: null;

        /* 스타일 관련 */
        if (option.style) {
            var styleObject = option.style;
            for (var key in styleObject) {
                if (styleObject.hasOwnProperty(key)) {
                    var propValue = styleObject[key]
                    element.style[key] = propValue;
                }
            }
        }
        /* 텍스트를 쓰거나 HTML 사용시 */
        (option.text) ? element.innerText = option.text: null;
        (option.html) ? element.innerHTML = option.html: null;
        (option.href) ? element.href = option.href: null;
        (option.src) ? element.src = option.src: null;
        if (option.link) {
            element.onclick = (function() {
                location.href = option.link
            }).bind(this);
            element.style.cursor = "pointer";
        }

        /* 태그 검증기 */
        switch (option.tag) {
            case "a":
                if (option.href && (option.text || option.html)) {

                } else {
                    //debugger;
                    console.log("A 태그에 href, text || html은 필수입니다.");
                }
                break;
            case "img":
                if (option.src) {

                } else {
                    //debugger;
                    console.log("IMG 태그에 SRC는 필수입니다.")
                }
                break;
            case "h2":
                if (option.text) {


                } else {
                    //debugger;
                    console.log("h2태그에 TEXT가 포함되어있지 않습니다.")
                }
                break;
        }

        return element;
    }

    /*
        ColumnElement : TagElement 객체를 이용하여, COS의 ColumnElement를 구현함
    */
    var ColumnElement = function(option) {
        var column = document.createDocumentFragment();

        var wrapper = new TagElement({
            tag: "div",
            classname: "column",
            style: {
                "float": (option.float) ? option.float : ""
            }
        });
        var mfreetile = new TagElement({
            tag: "div",
            classname: "m-free-tile"
        });


        if (option.total == 1) {
            if (!option.isDefaultMargin) {
                wrapper.style.marginLeft = "0"
            }
        }

        if (option.freetile) {
            (option.freetile.headline) ? mfreetile.appendChild(this.createHeadlinePreambleWrapper(option.freetile.headline)): null;
            (option.freetile.contentdata) ? mfreetile.appendChild(this.createContentdataPreambleWrapper(option.freetile.contentdata)): null;
            (option.freetile.ctalist) ? mfreetile.appendChild(this.createCtalistWrapper(option.freetile.ctalist)): null;
        } else if (option.freehtml) {
            mfreetile.innerHTML = option.freehtml.html;
        } else if (option.newsletter) {
            mfreetile.appendChild(this.createHeadlinePreambleWrapper({
                fontClass: "q-giga",
                fontColor: "#444444",
                link: "https://pf.kakao.com/_jGrxkd",
                text: "카카오톡에서 COS를 만나보세요"
            }));

            mfreetile.appendChild(this.createContentdataPreambleWrapper({
                fontClass: "q-alpha4",
                fontColor: "#444444",
                link: "https://pf.kakao.com/_jGrxkd",
                text: "COS의 다양한 소식을 받고 다음 온라인 주문 시 10% 할인 혜택도 즐겨보세요"
            }));


            mfreetile.appendChild(this.createCtalistWrapper({
                fontClass: "q-alpha4",
                fontColor: "#444444",
                linklist: [{
                    fontClass: "",
                    fontColor: "#444444",
                    text: "친구 추가하기",
                    href: "https://pf.kakao.com/_jGrxkd"
                }]
            }));

        } else if (option.storelocator) {
            mfreetile.appendChild(this.createHeadlinePreambleWrapper({
                fontClass: "q-giga",
                fontColor: "#444444",
                link: "/kr_krw/store-locator.html",
                text: "매장에서 만나요"
            }));

            mfreetile.appendChild(this.createContentdataPreambleWrapper({
                fontClass: "q-alpha4",
                fontColor: "#444444",
                link: "/kr_krw/store-locator.html",
                text: "COS 컬렉션을 매장에서도 볼 수 있습니다"
            }));


            mfreetile.appendChild(this.createCtalistWrapper({
                fontClass: "q-alpha4",
                fontColor: "#444444",
                linklist: [{
                    fontClass: "",
                    fontColor: "#444444",
                    text: "가까운 매장 찾기",
                    href: "/kr_krw/store-locator.html"
                }]
            }));
        }

        wrapper.appendChild(mfreetile);
        column.appendChild(wrapper);

        return column;
    }


    /*
        랜더링 영역
    */
    ColumnElement.prototype.createHeadlinePreambleWrapper = function(option) {
        var result = document.createDocumentFragment();

        var div = new TagElement({
            tag: "div",
            classname: "headline-preamble-wrapper " + ((option.align) ? option.align : "")

        })

        var h2 = new TagElement({
            tag: "h2",
            classname: "a-heading-2 " + ((option.fontClass) ? option.fontClass : "q-alpha4"),
            style: {
                color: (option.fontColor) ? option.fontColor : "#444444"
            },
            text: (option.text) ? option.text : "",
            link: (option.link) ? option.link : ""
        });


        div.appendChild(h2);
        result.appendChild(div);

        return result;
    }

    ColumnElement.prototype.createContentdataPreambleWrapper = function(option) {
        var result = document.createDocumentFragment();

        var div = new TagElement({
            tag: "div",
            classname: "textdata-preamble-wrapper " + ((option.align) ? option.align : ""),
        })

        var picture, img;

        if (option.imageURL) {
            picture = new TagElement({
                tag: "picture",
                classname: "a-picture"
            });
            img = new TagElement({
                tag: "img",
                classname: "a-image " + ((option.imageSize) ? option.imageSize : "full"),
                src: option.imageURL
            });
        }
        var richtext = new TagElement({
            tag: "div",
            classname: 'is-richtext ' + (option.fontClass) ? option.fontClass : "q-alpha4",
            style: {
                color: (option.fontColor) ? option.fontColor : "#444444"
            }
        });
        var p = new TagElement({
            tag: "p",
            link: (option.link) ? option.link : "",
            text: (option.text) ? option.text : ""
        });


        richtext.appendChild(p);

        if (option.imageURL) {
            picture.appendChild(img);
            div.appendChild(picture);
        }
        div.appendChild(richtext);
        result.appendChild(div);

        return result;
    }

    ColumnElement.prototype.createCtalistWrapper = function(option) {
        var result = document.createDocumentFragment();

        var div = new TagElement({
            tag: "div",
            classname: "ctalist-wrapper " + ((option.align) ? option.align : "")
        });

        if (option.linklist) {

            option.linklist.forEach(function(link) {
                var atag = new TagElement({
                    tag: "a",
                    classname: (link.fontClass) ? link.fontClass : "q-alpha4",
                    href: (link.href) ? link.href : "#",
                    html: (link.text) ? link.text : "",
                    style: {
                        color: (link.fontColor) ? link.fontColor : "#444444",
                        borderBottom: (link.fontColor) ? "1px solid " + link.fontColor : "#444444",
                    }
                });

                div.appendChild(atag);
            })
        }

        result.appendChild(div);
        return result;
    }

    /*
        ComponentGenerator 컴포넌트 생성기
    */

    var ComponentGenerator = function(option) {
        CosCustomController.push(this);
        this.target = document.querySelector(option.selector);
        this.content = option.selector + option.content;
        this.vDom = document.createDocumentFragment();
        if (option.columnlist) {
            this.columnlist = option.columnlist;
        }
    }


    /*
        BandedComponent
    */
    BandedComponent = function(option) {

        option.content = " .content .scrollable-content"


        ComponentGenerator.call(this, option);


        if (option.columnlist) {
            if (this.columnlist.length == 1) {
                document.querySelector(option.selector + " .o-grid-controller").className = "o-grid-controller";
            }
        }
        if (option.columnOption) {
            document.querySelector(option.selector + " .o-grid-controller").className = "o-grid-controller " + option.columnOption
        }
        this.init(option);
    }

    BandedComponent.prototype.init = function(option) {
        this.target.style.backgroundColor = (option.backgroundColor) ? option.backgroundColor : "#f9f9f9";
        this.columnlist.forEach((function(ele) {
            ele.total = this.columnlist.length;
            this.vDom.appendChild(new ColumnElement(ele));
        }).bind(this))
        document.querySelector(this.content).appendChild(this.vDom);
    }
    /*
        // BandedComponent
    */



    /* QR코드 작업건 */
    DescriptionMenu = function(param){
        this.ContentEvent = param.ContentEvent;
        this.ButtonEvent = param.ButtonEvent;
    }

    DescriptionMenu.prototype.custom_clickMenuListener = function(param){
        var openElement = param.openElement;
        var closelist = param.closelist;

        var MENU_EVENT = (param.Event === "content") ? this.ContentEvent : this.ButtonEvent;

        closelist.forEach(function(v){
            $(v).removeClass(MENU_EVENT);
        })
        if($(openElement).attr("class").indexOf(MENU_EVENT) === -1){
            $(openElement).addClass(MENU_EVENT);
        }
    }

    var descriptionMenu = new DescriptionMenu({
        ContentEvent : "is-open",
        ButtonEvent : "is-selected"
    });

    $(window).on("DOMContentLoaded",function(){

        $(".o-product-information .o-form .description-header .details-qrcode").on("click",(function(){
            descriptionMenu.custom_clickMenuListener({
                Event:"content",
                openElement : '.product-description .qr-code',
                closelist : ['.product-description .description-text',
                    '.product-description .delivery-and-returns-text',
                    '.product-description .details-text']
            });
            descriptionMenu.custom_clickMenuListener({
                Event:"button",
                openElement : '.description-header .details-qrcode',
                closelist : ['.description-header .description',
                    '.description-header .delivery-and-returns',
                    '.description-header .details']
            });
        }).bind(this));
    })


    /* /// QR코드 작업건 */

})();



// 2019-03-27 헤더 디자인 수정건
function registBanner(param){
    if(param.id && param.text){
        if(document.querySelector(".m-notification "+param.id)){
            var notification = document.querySelector(".m-notification");

            $(".m-notification").children().remove(); // IE....
            if(param.utm){
                notification.innerHTML = "<p class='a-paragraph'>"+param.text+" | "+
                    "<a style='border-bottom:0.5px solid white;color:white' href='https://www.cosstores.com/kr_krw/women/sale.html?utm_source=OVMTEST&utm_medium=BANNER&utm_campaign=Sale_banner'>여성복 쇼핑하기</a>&nbsp;"
                    +"<a style='border-bottom:0.5px solid white;color:white' href='https://www.cosstores.com/kr_krw/men/sale.html?utm_source=OVMTEST&utm_medium=BANNER&utm_campaign=Sale_banner'>남성복 쇼핑하기</a></p>";
            }else{
                notification.innerHTML = "<p class='a-paragraph'>"+param.text+" | "+
                    "<a style='border-bottom:0.5px solid white;color:white' href='https://www.cosstores.com/kr_krw/women/sale.html'>여성복 쇼핑하기</a>&nbsp;"
                    +"<a style='border-bottom:0.5px solid white;color:white' href='https://www.cosstores.com/kr_krw/men/sale.html'>남성복 쇼핑하기</a></p>";
            }
        }
    }
}

setTimeout(function(){
    $("#gnb_warp .search-text").on("click",function(){
        $("#gnb_warp .a-icon-search").trigger("click");
    })
    registBanner({
        id:"#SaleTempBanner1",
        text:"여름 세일이 계속됩니다",
        utm:true
    })
    registBanner({
        id:"#SaleTempBanner2",
        text:"모든 세일 상품 50% 할인",
        utm:true
    })
    registBanner({
        id:"#SaleTempBanner3",
        text:"세일 상품이 추가되었습니다",
        utm:true
    })
    registBanner({
        id:"#SaleTempBanner4",
        text:"세일이 곧 끝납니다.",
        utm:false
    })
    registBanner({
        id:"#SaleTempBanner5",
        text:"세일이 오늘 끝납니다",
        utm:false
    })
    registBanner({
        id:"#SaleTempBanner6",
        text:"세일이 시작되었습니다.",
        utm:false
    })
    registBanner({
        id:"#SaleTempBanner7",
        text:"세일 상품이 추가되었습니다",
        utm:false
    })

    registBanner({
        id:"#SaleTempBanner8",
        text:"세일이 곧 끝납니다",
        utm:false
    })

    registBanner({
        id:"#SaleTempBanner9",
        text:"세일이 오늘 끝납니다",
        utm:false
    })


},1000)
// // 2019-03-27 헤더 디자인 수정건


// 20191008 배너 시작

var ContrySelector = function() {
    var currentState = document.querySelector(".cos-hyundai-popup");
    /* INIT */
    if (currentState !== null) {
        this.removeContrySelector();
    }
    /* // INIT */

    /* GEN CODE */
    this.code += this.createHeader({
        "title": "배송국가를 선택하세요.",
        "title2": "일부 국가의 경우 아직 온라인 주문이 불가능할 수 있습니다. 매장 찾기를 통해 가까운 매장을 방문하시거나 카카오톡 채널을 추가하여 새로운 소식을 만나보세요."
    });
    this.code += this.createCountryCode();
    this.code += this.createFooter({
        "text": "상품 가격과 배송비는 국가별 정책 및 세금에 따라 변경될 수 있는 점에 유의하세요."
    });
    /* // GEN CODE */


    this.doInstance();
}
ContrySelector.prototype.removeContrySelector = function() {
    $(".cos-hyundai-popup").remove();
    $("#custombg").remove();
    $("body").removeClass("u-overflow-hidden");
}

ContrySelector.prototype.doInstance = function() {
    var CosHyundaiPopup = document.createElement("div");

    CosHyundaiPopup.className = "cos-hyundai-popup";
    CosHyundaiPopup.innerHTML = this.code;

    // 코드 적용이후

    $("body").addClass("u-overflow-hidden");
    $("body").prepend("<div id='custombg' style='width:100%;height:100%;background-color:#ffffff;position:fixed;top:0;left:0;z-index:30;opacity:0.9'></div>")
    $("body").prepend(CosHyundaiPopup);
    $("#custombg").click(this.removeContrySelector.bind(this));
    $(".cos-hyundai-popup .js-close-button").click(this.removeContrySelector.bind(this));
}

ContrySelector.prototype.createHeader = function(param) {

    return '<div class="a-overlay js-a-overlay q-opacity-0"></div>' +
        '<div class="hyundai-cos country o-lightbox is-open">' +
        '<div class="lightbox-header"></div>' +
        '<div class="js-content u-clearfix" style="overflow-y: hidden;">' +
        '<div class="scroll-wrapper scrollbar-inner" style="position: relative;">' +
        '<div class="scrollbar-inner scroll-content" style="height: auto; margin-bottom: 0px; margin-right: 0px;overflow:hidden !important">' +
        '<h2 class="a-heading-1" style="line-height: 23px;">' + param.title + '</h2>' +
        '<p class="a-paragraph">' + param.title2 + '</p>' +
        '<div class="countries">';
}

ContrySelector.prototype.createCountryCode = function() {
    function linkData(param){
        return '<a href="'+param.link+'" target="_self" class="a-link m-country-select"><span class="'+param.classname+'"></span><span>'+param.text+'</span></a>'
    }
    var countries = [
    linkData({'link' : 'https://www.cosstores.com/au/', 'text' : 'Australia', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.de_AT.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Austria', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.nl_BE.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Belgium', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.bg_BG.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Bulgaria', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselectorGlobal.en_WW.en.USD.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Canada', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.cs_CZ.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Czech Republic', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/ca/', 'text' : 'Canada', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/ca/', 'text' : 'Canada - Quebec', 'classname' : 'no-shiping'}),
    linkData({'link' : 'https://www.cosstores.cn/', 'text' : 'China', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.hr_HR.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Croatia', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.el_CY.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Cyprus', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.da_DK.en_eur.DKK.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Denmark', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.et_EE.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Estonia', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.fi_FI.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Finland', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.fr_FR.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'France', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.de_DE.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Germany', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.el_GR.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Greece', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.hu_HU.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Hungary', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.en_IE.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Ireland', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.it_IT.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Italy', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/jp/', 'text' : 'Japan', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.lv_LV.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Latvia', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.lt_LT.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Lithuania', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.fr_LU.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Luxembourg', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.nl_NL.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Netherlands', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselectorGlobal.en_WW.en.USD.jsp', 'text' : 'New Zealand', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.no_NO.en_eur.NOK.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Norway', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.pl_PL.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Poland', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.pt_PT.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Portugal', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.ro_RO.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Romania', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/ru_ru/', 'text' : 'Russia', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.sk_SK.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Slovakia', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.sl_SI.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Slovenia', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/kr_krw/index.html', 'text' : 'South Korea', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.es_ES.en_eur.EUR.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Spain', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.sv_SE.en_eur.SEK.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Sweden', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.en_CH.en_ch.CHF.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'Switzerland', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.en_GB.en_eur.GBP.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'United Kingdom', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselector.en_US.en_usd.USD.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'United States', 'classname' : 'shiping'}),
    linkData({'link' : 'https://www.cosstores.com/content/cos/page.countryselectorGlobal.en_WW.en.USD.jsp?goeorguri=%2Fen_eur%2Findex.html', 'text' : 'International Shipping', 'classname' : 'shiping'})

    ];

    return countries.reduce(function(a, v) {
        a += v;
        return a;
    }, "")
}

ContrySelector.prototype.createFooter = function(param) {
    return '</div>' +
        '<p class="a-paragraph">' + param.text + '</p>' +
        '</div>' +
        '<div class="scroll-element scroll-x">' +
        '<div class="scroll-element_outer">' +
        '<div class="scroll-element_size"></div>' +
        '<div class="scroll-element_track"></div>' +
        '<div class="scroll-bar" style="width: 100px;"></div>' +
        '</div>' +
        '</div>' +
        '<div class="scroll-element scroll-y">' +
        '<div class="scroll-element_outer">' +
        '<div class="scroll-element_size"></div>' +
        '<div class="scroll-element_track"></div>' +
        '<div class="scroll-bar" style="height: 100px;"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="m-button-icon a-icon-close js-close-button"></div>' +
        //'<div class="resize-triggers">' +
        //'<div class="expand-trigger">' +
        //'<div style="width: 353px; height: 524px;"></div>' +
        //'</div>' +
        //'<div class="contract-trigger"></div>' +
        //'</div>' +
        '</div>';
}
// 20191008 배너 끝

/* 20210401 플로팅 메뉴 */
var cosFloatingBtnHTMLCODE =
    "<div class='title'>"+
    "<p class='a-paragraph'>제목</p>" +
    "<span class='is-regular'>가격</span>" +
    "</div>"+
    "<div class='btn-area'>"+
    "<button class='goCart blackstyle'>장바구니 담기</button>"+
    "</div>";
// "<div id='COSFloatingButtonList' class='cos-floatingbtn onlyMo'>" +
//  "</div>"

var cosFloatingCartBtnHTMLCODE =
    "<div id='COSFloatingButtonList' class='cos-floatingbtn onlyMo'>" +
    "<div class='title'>"+
    "<p class='a-paragraph'>제목</p>" +
    "<span class='is-regular'>가격</span>" +
    "</div>"+
    "<div class='btn-area'>"+
    "<button class='goCart blackstyle' onclick='$WG_StartWebGate(229, Official.Cart.basktCheckout)'>장바구니 담기</button>"+
    "</div>";
"</div>"

setTimeout(function(){

    if(false){ // 작동중지

//    $(".content-section").prepend(cosFloatingBtnHTMLCODE);
        if($("#COSFloatingButtonList").length > 0){
            $("#COSFloatingButtonList").append(cosFloatingBtnHTMLCODE);
            $(".size-select").addClass("onlyMo-margin-bottom-40");
            $("#addBagBtn").addClass("onlyPc");
            $(".cos-floatingbtn .title > p").text($("#product-detail-name").text());
            $(".cos-floatingbtn .title > span").text($("#priceValue").text());
            $(document).on("click",".cos-floatingbtn .goCart",function(){
                if($(".a-size-swatch > .size-options.is-selected").length == 0){
                    $(window).scrollTop($(".description-header").offset().top - $(window).height() + 98);
                    $(".a-size-swatch > .size-options").eq(0).focus();
                    // 반영테스트 1
                }
                $("#addBagBtn").click();
            })

        }

        if($("#cartPage").length > 0){
            $("body").prepend(cosFloatingCartBtnHTMLCODE);
            $(".a-button.is-primary.checkout-button").addClass("onlyPc");
            $(".cos-floatingbtn .title > p").text("총 결제 예정 금액");
            $(".cos-floatingbtn .title > span").text($("#payPrc").text()+"원");
            setInterval(function(){
                if($(".cos-floatingbtn .title > span").text() !== $("#payPrc").text()+"원"){
                    $(".cos-floatingbtn .title > span").text($("#payPrc").text()+"원");
                }
                if($(".a-button.is-primary.checkout-button.onlyPc").length == 0){
                    $(".a-button.is-primary.checkout-button").addClass("onlyPc");
                }
            },1000)
        }
        
    }
},100);
/* // 20210401 플로팅 메뉴 */

