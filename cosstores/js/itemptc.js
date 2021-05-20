var itemPtc = {
	init : function(){
		// [S] 상품 상세 페이지용
		// 옵션 클릭시 선택 컬러 적용
		$(document).on('click', '.a-option.color-list.pdp', function(){
				var selectedColor = $(this).attr('data-value');

				$('#add-to-bag').addClass('is-disabled');

				$("#itemInfForm input[name='slitmCd']").val(selectedColor);
				$("#itemInfForm input[name='uitmCd']").val('');
				$("#itemInfForm input[name='ordQty']").val('');

				// 컬러 변경시 상품 내용 변경
				itemPtc.getChangeItemInfo(selectedColor,false);
				itemPtc.getChangeItemPra(selectedColor);

				// 품절임박 메세지 제거
				$("#sizeOutOfStock").remove();

				// 상품 이미지 해당 색상의 사이즈만 show, 나머지 hide
				itemPtc.autoSelectOption(selectedColor);

				// 선택 된 컬러로 현재 옵션의 컬러칩 변경
				$("#pdpSelectedColor").html($(this).find(".colorchip-wrap").html());
		});

		// 사이즈 변경
		$(document).on('click', '.size-options.pdp:not(.out-of-stock)', function(){
			$("#itemInfForm input[name='slitmCd']").val($(this).attr('slitm-cd'));
			$("#itemInfForm input[name='uitmCd']").val($(this).attr('uitm-cd'));
			$("#itemInfForm input[name='ordQty']").val('1');

			$("#sizeOutOfStock").remove();

			if ($(this).hasClass("out-of-stock-soon")) {
				$(".a-size-swatch:last").after("<p id='sizeOutOfStock'class='a-paragraph'>품절임박! 주문을 서두르세요.</p>");
			}
		});
		// [E] 상품 상세 페이지용

		// [S] 퀵 샵용 추가
		// 옵션 클릭시 선택 컬러 적용
		$(document).on('click', '.a-option.color-list.quickpdp', function(){
			var selectedColor = $(this).attr('data-value');

			$('#quick-add-to-bag').addClass('is-disabled');

			$("#QuickSizeOutOfStock").remove();

			itemPtc.getChangeItemInfo(selectedColor,true);

			// 선택 된 컬러로 현재 옵션의 컬러칩 변경
			$("#quickSelectedColor").html($(this).find(".colorchip-wrap").html());

			$("#itemInfFormQuickShop input[name='uitmCd']").val('');
			$("#itemInfFormQuickShop input[name='ordQty']").val('');

			itemPtc.quickShopAutoSelectOption(selectedColor);

		});

		// 퀵샵 사이즈 변경
		$(document).on('click', '.size-options.quickpdp:not(.out-of-stock)', function(){
			$("#itemInfFormQuickShop input[name='slitmCd']").val($(this).attr('slitm-cd'));
			$("#itemInfFormQuickShop input[name='uitmCd']").val($(this).attr('uitm-cd'));
			$("#itemInfFormQuickShop input[name='ordQty']").val('1');

			$("#QuickSizeOutOfStock").remove();

			if ($(this).hasClass("out-of-stock-soon")) {
				$(".a-size-swatch.quickpdp:last").after("<p id='QuickSizeOutOfStock'class='a-paragraph'>품절임박! 주문을 서두르세요.</p>");
			}
		});
		// [E] 퀵 샵용 추가
	}(),
	// 반품가능여부 체크후 팝업 표시
    checkReturnsAvailability : function(btnPosition) {
        var $deferred = $.Deferred();

        // 퀵샵인 경우 폼 변경
        var formName = "itemInfForm";
        if (btnPosition == 'quickShop') {
            formName += "QuickShop";
        }
        if ($("#"+formName+" input[name='packOpenRtpNdmtYn']").val() == 'Y') {
            $.osDialog.alert_btn({msg : "위생상의 이유로 속옷 및 이어링 제품은 <br> 반품이 불가합니다. (결함의 경우 제외)"});
        }
    },
	// 장바구니담기
	addCart : function(btnPosition) {
		var $deferred = $.Deferred();

		// 퀵샵인 경우 폼 변경
		var formName = "itemInfForm";
		if (btnPosition == 'quickShop') {
			formName += "QuickShop";
		}

		if ($("#"+formName+" input[name='uitmCd']").val() == '') {
			//alert("사이즈를 선택해주세요.");
            return false;
		}

	    $("form[name='"+formName+"']").ajaxSubmit({
	        url: hd.common.url("/odb/addBaskt")+"?PageName=ProductDetail&PageBanner=Basket"
	        , dataType: "json"
	        , async: true
	        , success: function(data) {
	            if (data.needLogin) {
	            	openLoginPopup("addToBasket");
	            	$deferred.reject();
	            } else {
	            	if(data.isAddOk) {
	            		// 장바구니 리스트 가져오기
	            		// 장바구니담기 버튼 클릭시 장바구니 추가 표시 사이드바에 품절임박 메세지 표시
	            		var isOutOfStock = false;
	            		!isEmpty(data.warningMessages) && data.warningMessages=="QUANTITY_LOW_IN_STOCK_2" && (isOutOfStock = true);

        				$("#gnb_add_cart").removeClass('has-max-items');

	    	        	// 재고에 따라 품절임박문구 노출
	    	        	$("#m-cart-stock-out").hide();
	    	        	isOutOfStock && $("#m-cart-stock-out").css("display","");

	    	        	// 미니 장바구니 렌더링
	    	        	Official.MiniCart.render();

	            		// Facebook Pixel Event
	            		if (typeof fbq !== 'undefined') {
	            			fbq('track', 'AddToCart');
	            		}
	            		
	            		//20191114 dataLayer setting 
	            		dataLayer.push({	'event': 'addToCart',
	            			  'ecommerce': {
	            			    'currencyCode' : 'KOR',
		            			    'add': {
			            			    'products': [{
			            			        'name' : $("#"+formName+" input[name='slitmNm']").val(),
			            			        'id': data.ODBBasktParamVO.slitmCd,
			            			        'price': $("#"+formName+" input[name='sellPrc']").val(),
			            			        'brand': 'COS',
			            			        'category':$("#"+formName+" input[name='sectNm']").val(),
			            			        'quantity': data.ODBBasktParamVO.ordQty
			            			       }]
		            			    }
	            			  }
	            		});
	            		
                    } else {
                    	if(!isEmpty(data.errorMessages)) {
                    		var alertMessage = "";

                    		if (data.errorMessages == 'BASKT_SLITM_NOT_FOUND') {
                    			alertMessage = "존재하지 않는 상품입니다";
                    		} else if (data.errorMessages == 'BASKT_NOT_SELL_GBCD_00') {
                    			alertMessage = "판매가 중단된 상품입니다";
                    		} else if (data.errorMessages == 'BASKT_MAX_STOCK') {
                    			alertMessage = "죄송합니다. 재고가 부족하여 최대 " + data.ODBBasktParamVO.stck + "개 까지 구매 하실 수 있습니다.";
                    		} else if (data.errorMessages == 'BASKT_DLU_MAX_BUY_QTY') {
                    			alertMessage = "죄송합니다. 한번에 " + data.ODBBasktParamVO.dluMaxBuyQty + "개 이상의 상품을 담을 수 없습니다.";
                    		} else if (data.errorMessages == 'BASKT_MAX_LIMIT_CNT') {
                    			alertMessage = "장바구니에 담을 수 있는 최대 수량에 도달했습니다";
                    		}

                    		if (location.href.indexOf('odb/basktList') > -1) {
                    			alert(alertMessage);
                    		} else {
                	        	if (!$("#gnb_add_cart").hasClass('has-max-items')) {
                	        		$("#gnb_add_cart").addClass('has-max-items');
        	        			}

                	        	$(".cart-addition-section .m-cart-addition .js-a-label.max").text(alertMessage);
                    		}
		                } else {
                    		alert("장바구니 담기에 실패하였습니다.");
		                }
                    }
	            	$deferred.resolve();
	            }
	        }
		    , beforeSend: function(){
	        	//$('#loding-bar').show();
			}
			, complete:function(){
				//$('#loding-bar').hide();
			}
	        , error: function(xhr, status, error) {
	        }
	    });

	    return $deferred.promise();
	},

	// 컬러 변경시 상품 내용 변경
	getChangeItemInfo : function(pSlitmCd, isQuick){
		var isPreview = $("#itemInfForm input[name=preview]").val();
		$.ajax({
	        type : "GET",
	        cache : false,
	        dataType : "json",
	        url : hd.common.url("/pda/changeItemInfo"),
	        data : {slitmCd : pSlitmCd, preview : isPreview},
	        success: function(data) {

	        	var formNm = "itemInfForm";

	        	// 상품가격
	        	var productPrice = "";


	        	// New 마커
	        	var isNewPrd = "";
	        	if(data.itemPtc.isNew){
	        		isNewPrd = '<label class="a-label js-a-label">NEW</label>';
	        	}

	        	$("#newmarker").html(isNewPrd);

	        	// 상품 마커
	        	var prdMarkers = '<div class="m-product-marker m-product-markers">';
	        	var prdMarker = '';

	        	if(data.itemPtc.prmTagList != null && data.itemPtc.prmTagList.length > 0){
	        		for(var i=0; i < data.itemPtc.prmTagList.length; i++) {
	        			prdMarker = '<div class="marker-image product-marker pdpMarker"><img class="a-image" src="'+hd.IMAGE.SERVER+'/'+data.itemPtc.prmTagList[i].dispImflNm+'"></div>';
	    	        	if(data.itemPtc.prmTagList[i].dispUrl != null) {
	    	        		prdMarker = '<a href="'+data.itemPtc.prmTagList[i].dispUrl+'">' + prdMarker + '</a>';
	    	        	}
	        			prdMarkers += prdMarker;
	        		}
	        	}
	        	prdMarkers += '</div>';

	        	$("#prdmarker").html(prdMarkers);

	        	//할인X
				/** 주문내역에서 상품상세로 넘어온 경우 중 품절상품이라면 색상 변경시에도 품절로 표기**/
				if ($("#orderPreviewItem").hasClass(data.itemPtc.slitmCd)) {
                    productPrice = '<label class="a-label js-a-label out-of-stock">품절</label>'
				}else if (!isEmpty(data.itemPtc.clrShwYn) && data.itemPtc.clrShwYn == 'Y') {
					   productPrice = '<label class="a-label js-a-label is-reduced price">' + gfn_appendComma(data.itemPtc.sellPrc) + '</label>'

	        	}else if (isEmpty(data.itemPtc.csmPrc) || data.itemPtc.csmPrc == "0" || $.trim(data.itemPtc.sellPrc) == $.trim(data.itemPtc.csmPrc)) {
	        		productPrice = '<label class="a-label js-a-label price">' + gfn_appendComma(data.itemPtc.sellPrc) + '</label>';
	        	//할인O
	        	} else {
					productPrice = '<label class="a-label js-a-label is-deprecated price">' + gfn_appendComma(data.itemPtc.csmPrc) + '</label>';
					productPrice += '<label class="a-label js-a-label is-reduced price">' + gfn_appendComma(data.itemPtc.sellPrc) + '</label>';
				}

	        	var quickImgsrc,Imgsrc = "";

	        	if (data.sImgNm) {
	        		quickImgsrc = hd.common.imgUrl(data.itemPtc.slitmCd, data.sImgNm, 2);
	        		Imgsrc = hd.common.imgUrl(data.itemPtc.slitmCd, data.sImgNm, 1);
	        	}

	        	if(isQuick) {
	        		formNm += "QuickShop";
	        		// 이미지
	        		$(".product-image #quick-prdImg").attr("src",quickImgsrc);
	        		$(".product-image #quick-prdImg").attr("onError","hd.common.noImage(this, 2)");

	        		//가격
	        		$("#quickShopPrice").html(productPrice);
	        		// 상품명
		        	$("#product-detail-name-quick").text(data.itemPtc.slitmNm);
		        	$("#goToProdDtl").attr("href", hd.HOST_HTTP + hd.common.url(data.itemPtc.prodDtlUrl)+"?slitmCd="+data.itemPtc.slitmCd);

	        	} else {
	        		$(document).attr("title", data.itemPtc.slitmNm + " - " + data.sizeAndStockBySlitmCdList[0].u1aNm + " - COS KR");

	        		// 선택 옵션의 URL로 변경
					window.history.replaceState(null, 'article_'+data.itemSkuMngNo, hd.common.url(data.itemPtc.prodDtlUrl)+"?slitmCd="+data.itemPtc.slitmCd);

	        		//가격
	        		$("#prdDetailPrice").html(productPrice);
	        		//상품명
	        		$("#product-detail-name").text(data.itemPtc.slitmNm);
	        		// 상품 설명
		        	var productDescription = "";

		        	for (var idx=0; idx<data.itemPtc.htmlItstCntnList.length; idx++) {
						if (data.itemPtc.htmlItstCntnList[idx].htmlItstGbcd == '00') {
							productDescription += data.itemPtc.htmlItstCntnList[idx].htmlItstCntn;
						}
					}
		        	/* [COS_RENEWAL] @Description : 상품 설명 내 정보 순서 변경  @date:2018-04-26 @author : 최한비 - 시작 */
		        	// 상품측정내용
		        	if ("001" == data.prdInfNotfBsicCd && !isEmpty(data.itemPtc.itemMesrCntn)) {
		        		productDescription += data.itemPtc.itemMesrCntn + "</br>";
		        	}

		        	// 001. 의류
		        	// 모델 키/사이즈 노출 내용
		        	// 확인필요
		        	if ("001" == data.prdInfNotfBsicCd && (!isEmpty(data.itemPtc.mdlSttr) || !isEmpty(data.itemPtc.mdlBsz))) {
		        		if (!isEmpty(data.itemPtc.mdlSttr) && !isEmpty(data.itemPtc.mdlBsz)) {
		        			productDescription += "모델 키는 " + data.itemPtc.mdlSttr + "cm 이며, " + data.itemPtc.mdlBsz + "사이즈를 착용 중입니다.</br>";
		        		} else if (!isEmpty(data.itemPtc.mdlSttr) && isEmpty(data.itemPtc.mdlBsz)) {
		        			productDescription += "모델 키 " + data.itemPtc.mdlSttr + "cm.</br>";
		        		} else {
		        			productDescription += "모델 착용 사이즈 " + data.itemPtc.mdlBsz + ".</br>";
		        		}
		        	}
					/* [COS_RENEWAL] @Description : 상품 설명 내 정보 순서 변경  @date:2018-04-26 @author : 최한비 - 끝 */

		        	// 018. 화장품
		        	// Measurement : 085. 용량 또는 중량
		        	if ("018" == data.prdInfNotfBsicCd) {
		        		productDescription += data.ItstInfoMap[085]+"</br>";
		        	}

		        	productDescription += '</br><a href="#" id="essentialLink" target="_self" class="a-link-pdp-essential q-udln open-lightbox" data-template="essential-info-link" data-classes="is-large acco">상품 필수 표시 정보</a>';

		        	$(".description-text").html(productDescription);

		        	// 상품 상세 설명
		 			var productDetails = '<p class="a-paragraph">';

		 			// 니켈 테스트 완료
		 			if ("R40304" == data.itemPtc.itemSCsfCd) {
		 				productDetails = '니켈 테스트 완료</br>';
		 			}

		 			// <%-- 001. 의류 --%>
		 			if ('001' == data.prdInfNotfBsicCd) {
		 				// <%-- ProductComposition : 016. 제품소재 --%>
		 				// <%-- Washing instruction : 036. 세탁방법 및 취급시 주의사항 --%>
		 				productDetails += itemPtc.getMapData(data.ItstInfoMap, "016") + " / " + itemPtc.getMapData(data.ItstInfoMap, "036")+"</br>";
		 			}

		 			// <%-- 002. 구두/신발 --%>
		 			if ('002' == data.prdInfNotfBsicCd) {
		 				// <%-- ProductComposition : 129. 제품 주소재 --%>
		 				productDetails += itemPtc.getMapData(data.ItstInfoMap, "129");
		 				// <%-- Measurement : 굽 높이 --%>
		 				if (!isEmpty(data.itemPtc.itemMesrCntn)) {
		 					productDetails += " / 굽 높이 : " + data.itemPtc.itemMesrCntn + "cm</br>";
		 				} else {
		 					productDetails += "</br>";
		 				}
		 			}

		 			// <%-- 003. 가방 --%>
		 			if ('003' == data.prdInfNotfBsicCd) {
		 				// <%-- ProductComposition : 016. 제품소재 --%>
		 				productDetails += itemPtc.getMapData(data.ItstInfoMap, "016")+ " / " + itemPtc.getMapData(data.ItstInfoMap, "007")+"</br>"
		 				// <%-- Measurement : 007. 크기 --%>
		 			}

		 			// <%-- 004. 패션잡화 (모자 / 벨트 / 액세서리) --%>
		 			if ('004' == data.prdInfNotfBsicCd) {
		 				// <%-- ProductComposition : 098. 소재 --%>
		 				// <%-- Measurement : 011. 치수 --%>
		 				productDetails += itemPtc.getMapData(data.ItstInfoMap, "098") + " / " + itemPtc.getMapData(data.ItstInfoMap, "011")+"</br>";

		 			}

		 			// <%-- 005. 침구류 / 커튼 --%>
		 			if ('005' == data.prdInfNotfBsicCd) {
		 				// <%-- ProductComposition : 016. 제품소재 --%>
		 				productDetails += itemPtc.getMapData(data.ItstInfoMap, "016") + " / " + itemPtc.getMapData(data.ItstInfoMap, "011")+"</br>";
		 				// <%-- Measurement : 011. 치수 --%>

		 			}

		 			// <%-- 006. 가구(침대 / 소파 / 싱크대 / DIY제품) --%>
		 			if ('005' == data.prdInfNotfBsicCd) {
		 				// <%-- ProductComposition : 064. 주요소재 --%>
		 				productDetails += itemPtc.getMapData(data.ItstInfoMap, "064") + " / " + itemPtc.getMapData(data.ItstInfoMap, "007")+"</br>";
		 				// <%-- Measurement : 007. 크기 --%>

		 			}

		 			// <%-- 018. 화장품 --%>
		 			if ('018' == data.prdInfNotfBsicCd) {
		 				// <%-- ProductComposition : 065. 주요성분(유기농 화장품의경우 유기농 원료함량) --%>
		 				productDetails += itemPtc.getMapData(data.ItstInfoMap, "065")+"</br>";
		 			}

		 			// 상품코드
		 			productDetails += '</br>제품 관리에 대해 자세한 내용은 <a href="#" target="_self" class="a-link open-lightbox q-udln" data-template="productcare-popup" data-classes="is-large acco">여기</a>를 클릭하십시오.</br>';
		 			productDetails += 'Product no. ' + data.itemSkuMngNo + '</p>';

		 			// <%-- 가연성상품여부 --%>
		 			if ('Y' == data.itemPtc.flamItemYn) {
		 				productDetails += '<div class="flammable-text">';
		 				productDetails += '<img class="a-image" src="' + hd.STATIC_SERVER + '/images/cos/02/hazmat.png">';
		 				productDetails += '<p class="a-paragraph">이 제품은 인화성 물질을 포함하고 있으므로 제공된 서비스에 대한 특별 규칙이 적용됩니다</p></div>';
		 			}

		 			// <%-- 가연성문구노출여부 --%>
		 			if ('Y' == data.itemPtc.flamTxtExpsYn) {
		 				productDetails += '<div class="warning-text">';
		 				productDetails += '<img class="a-image" src="' + hd.STATIC_SERVER + '/images/cos/02/flammable.png">';
		 				productDetails += '<p class="a-paragraph">경고! 화재로부터 격리 할 것. 이 기호가 표시된 항목은 "The Nightwear Safetly Regulations 1987"의 가연성 성능 요구 사항을 준수 할 필요가 없으므로 이러한 요구 사항에 대해 테스트하지 않았습니다.</p></div>';
		 			}

		 			productDetails += '<span class="a-icon-down-arrow"></span>';

		 			$(".details-text").html(productDetails);

		 			$('#tmp-essential-info').html(itemPtc.compileEssentialInfo(data));


		 			var imgTemplate = Handlebars.compile($('script#product-Image').html());
		 			var mainImgTemplate = Handlebars.compile($('script#product-main-image').html());

		 			data.imgList[0].selected = " is-selected";
		 			
		 			var imgAlt = "";
		 			for(var h=0;  h < data.imgList.length; h++) {
			 			if (data.imgList[h].slitmCd == pSlitmCd) {
			 				// <%--SEO : alt태그 색상변경시 적용되도록 수정--%>
			 				imgAlt = "COS "+data.imgList[h].slitmNm+"의 "+data.imgList[h].u1aNm+"컬러 "+ data.imgList[h].itemImgTypeName+"입니다.";
			 				data.imgList[h].prdImg = hd.common.imgUrl(data.imgList[h].slitmCd, data.imgList[h].imflNm, 3);
			 				data.imgList[h].prdMainImg = hd.common.imgUrl(data.imgList[h].slitmCd, data.imgList[h].imflNm, 3);
			 				data.imgList[h].prdZoomImg = hd.common.imgUrl(data.imgList[h].slitmCd, data.imgList[h].imflNm, 4);
			 				data.imgList[h].prdAlt = imgAlt;
			 			} else {
			 				data.imgList.splice(h, 1);
			 				h--;
			 			}
		 			}
		 			var imgHtml = imgTemplate(data);

		 			imgHtml = '<div data-slides-desktop="7" data-slides-tablet="5" data-slides-mobile="1" class="o-slider"><div class="a-heading-2 slider-title u-align-center"></div><div class="slider">' + imgHtml + '</div></div>';

		 			$(".prdslider").html(imgHtml);

		 			var mainImgHtml = mainImgTemplate(data);
		 			mainImgHtml = '<ul>' + mainImgHtml + '</ul>';

		 			$(".main-image-wrapper").html(mainImgHtml);

		 			$(".o-product-gallery.swiper-initialized").removeAttr("data-component-id");
		 			window.appeaser.scan();

		 			$(window).scrollTop(0);

	        	}

	        	$("#"+formNm+" input[name=slitmNm]").val(data.itemPtc.slitmNm);
	        	$("#"+formNm+" input[name=sellPrc]").val(data.itemPtc.sellPrc);

	        	// 미니카트 이미지...
	        	$("#"+formNm+" input[name=mini-cart-image]").attr("value",Imgsrc);
	    		$("input[name='selectColor']:first").val($(".color-list.pdp[data-value="+data.itemPtc.slitmCd+"]").find(".color-name").text());
	        },
	        timeout: 30000,
	        beforeSend: function(){
			},
			complete:function(){
			},
	        error: function (XMLHttpRequest, textStatus, error) {
	            alert("서버 통신 중 에러가 발생했습니다.");
	        }
	    });
	},

	getChangeItemPra  : function(pSlitmCd){

		var sectId = $("#itemInfForm input[name='sectId']").val()
		  , brndCd = $("#itemInfForm input[name='brndCd']").val()
		  , isPreview = $("#itemInfForm input[name=preview]").val();

		$.ajax({
	        type : "GET",
	        dataType : "html",
	        url : hd.common.url("/pda/changeItemPra"),
	        data : {slitmCd : pSlitmCd, preview : isPreview, sectId : sectId, brndCd : brndCd},
	        success: function(data) {
	        	$("#pdp-styleWith").html(data);
	        },
	        timeout: 30000,
	        beforeSend: function(){
			},
			complete:function(){
	        	window.appeaser.scan();
			}
	    });
	},

	getMapData : function(mapData, key){
		if (mapData.hasOwnProperty(key)) {
			return mapData[key] + "";
        } else {
        	return "";
        }
	},

	makeEssentialInfoRowData : function(mapData, key, rowTitle){
		if (mapData[key]) {
			return '<tr><th scope="row">' + rowTitle + '</th><td>' + mapData[key] + '</td></tr>';
		} else {
			return '<tr><th scope="row">' + rowTitle + '</th><td> </td></tr>';
		}
	},

	compileEssentialInfo : function (data) {
		var template = Handlebars.compile($('script#essential-info-link').html());

        Handlebars.registerHelper('essentialInfo', function() {
        	var essentialInfo = "";

        	// <%-- 001. 의류 --%>
        	if ('001' == this.prdInfNotfBsicCd) {
        		// <%-- 016. 제품소재 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "016", "제품소재");
        		// <%-- 009. 색상 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "009", "색상");
        		// <%-- 011. 치수 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "011", "치수");
        		// <%-- 004. 제조자(수입자명) --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "004", "제조자(수입자명)");
        		// <%-- 001. 제조국 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "001", "제조국");
        		// <%-- 036. 세탁방법 및 취급 시 주의사항 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "036", "세탁방법 및 취급 시 주의사항");
        		// <%-- 030. 제조연월 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "030", "제조연월");
        		// <%-- 003. 품질보증기준 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "003", "품질보증기준");
        		// <%-- 002. A/S책임자와 전화번호 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "002", "A/S책임자와 전화번호");
        	}

        	// <%-- 002. 구두/신발 --%>
        	if ('002' == this.prdInfNotfBsicCd) {
        		// <%-- 129. 제품소재 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "129", "제품 주소재");
        		// <%-- 009. 색상 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "009", "색상");
        		// <%-- 011. 치수 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "011", "치수");
        		// <%-- 004. 제조자(수입자명) --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "004", "제조자(수입자명)");
        		// <%-- 001. 제조국 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "001", "제조국");
        		// <%-- 015. 취급시 주의사항 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "015", "세탁방법 및 취급 시 주의사항");
        		/*// <%-- 030. 제조연월
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "030", "제조연월");*/
        		// <%-- 003. 품질보증기준 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "003", "품질보증기준");
        		// <%-- 002. A/S책임자와 전화번호 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "002", "A/S책임자와 전화번호");
        	}

        	// <%-- 003. 가방 --%>
        	if ('003' == this.prdInfNotfBsicCd) {
        		// <%-- 029. 종류 : 상품분류의 한글명 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "029", "종류");
        		// <%-- 016. 제품소재 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "016", "제품소재");
        		// <%-- 009. 색상 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "009", "색상");
        		// <%-- 007. 크기 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "007", "크기");
        		// <%-- 004. 제조자(수입자명) --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "004", "제조자(수입자명)");
        		// <%-- 001. 제조국 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "001", "제조국");
        		// <%-- 015. 취급시 주의사항 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "015", "취급 시 주의사항");
        		/*// <%-- 030. 제조연월 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "030", "제조연월");*/
        		// <%-- 003. 품질보증기준 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "003", "품질보증기준");
        		// <%-- 002. A/S책임자와 전화번호 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "002", "A/S책임자와 전화번호");
        	}

        	// <%-- 004. 패션잡화 (모자 / 벨트 / 액세서리) --%>
        	if ('004' == this.prdInfNotfBsicCd) {
        		// <%-- 029. 종류 : 상품분류의 한글명 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "029", "종류");
        		// <%-- 098. 소재 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "098", "소재");
        		// <%-- 011. 치수 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "011", "치수");
        		// <%-- 004. 제조자(수입자명) --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "004", "제조자(수입자명)");
        		// <%-- 001. 제조국 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "001", "제조국");
        		// <%-- 015. 취급시 주의사항 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "015", "취급 시 주의사항");
        		// <%-- 003. 품질보증기준 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "003", "품질보증기준");
        		// <%-- 002. A/S책임자와 전화번호 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "002", "A/S책임자와 전화번호");
        	}

        	// <%-- 005. 침구류 / 커튼 --%>
        	if ('005' == this.prdInfNotfBsicCd) {
        		// <%-- 016. 제품소재 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "016", "제품소재");
        		// <%-- 009. 색상 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "009", "색상");
        		// <%-- 011. 치수 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "011", "치수");
        		// <%-- 012. 제품구성 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "012", "제품구성");
        		// <%-- 004. 제조자(수입자명) --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "004", "제조자(수입자명)");
        		// <%-- 001. 제조국 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "001", "제조국");
        		// <%-- 036. 세탁방법 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "036", "세탁방법");
        		// <%-- 003. 품질보증기준 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "003", "품질보증기준");
        		// <%-- 002. A/S책임자와 전화번호 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "002", "A/S책임자와 전화번호");
        	}

        	// <%-- 006. 가구(침대 / 소파 / 싱크대 / DIY제품) --%>
        	if ('006' == this.prdInfNotfBsicCd) {
        		// <%-- 005. 품명 및 모델명 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "005", "품명 및 모델명");
        		// <%-- 024. KC인증필유무 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "024", "KC인증필유무");
        		// <%-- 009. 색상 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "009", "색상");
        		// <%-- 040. 구성품 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "040", "구성품");
        		// <%-- 064. 주요소재 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "064", "주요소재");
        		// <%-- 004. 제조자(수입자명) --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "004", "제조자(수입자명)");
        		// <%-- 001. 제조국 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "001", "제조국");
        		// <%-- 007. 크기 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "007", "크기");
        		// <%-- 112. 배송.설치비용 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "112", "배송.설치비용");
        		// <%-- 003. 품질보증기준 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "003", "품질보증기준");
        		// <%-- 002. A/S책임자와 전화번호 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "002", "A/S책임자와 전화번호");
        	}

        	// <%-- 018. 화장품 --%>
        	if ('018' == this.prdInfNotfBsicCd) {
        		// <%-- 085. 용량 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "085", "용량");
        		// <%-- 068. 제품주요사양 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "068", "제품주요사양");
        		// <%-- 106. 사용기한 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "106", "사용기한");
        		// <%-- 105. 사용방법 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "105", "사용방법");
        		// <%-- 070. 제조자/판매사 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "070", "제조자/판매사");
        		// <%-- 150. 제조판매업자 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "150", "제조판매업자");
        		// <%-- 001. 제조국 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "001", "제조국");
        		// <%-- 065. 성분 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "065", "성분");
        		// <%-- 121. 식품의약품안전처 심사필 유무 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "121", "식품의약품안전처 심사필 유무");
        		// <%-- 103. 사용시 주의사항 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "103", "사용시 주의사항");
        		// <%-- 003. 품질보증기준 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "003", "품질보증기준");
        		// <%-- 008. A/S책임자와 전화번호 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "008", "A/S책임자와 전화번호");
        	}

        	// <%-- 038->035. 기타 재화 노출 오류 수정 --%>
        	if ('035' == this.prdInfNotfBsicCd) {
        		// <%-- 005. 품명 및 모델명 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "005", "품명 및 모델명");
        		// <%-- 111. KC인증대상 여부 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "111", "KC인증대상 여부");
        		// <%-- 001. 제조국 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "001", "제조국");
        		// <%-- 004. 제조자(수입자명) --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "004", "제조자(수입자명)");
        		// <%-- 002. A/S책임자와 전화번호 --%>
        		essentialInfo += itemPtc.makeEssentialInfoRowData(this.ItstInfoMap, "002", "A/S책임자와 전화번호");
        	}
        	essentialInfo += '<tr><th scope="row">안전인증정보</th><td><span class="kcIcon"><span>본 상품은 국가통합인증(KC마크) 대상품목으로 국가통합인증을 필하였습니다.</span><br/>';

        	// 안전인증번호가 존재하는 경우에만 안전인증정보 표시
        	if (!isEmpty(this.itemPtc.safeCertNo)) {
        		essentialInfo +=  '<span> 신고필증번호 : ' + this.itemPtc.safeCertNo + '</span></span></td></tr>';
        	} else {
        		essentialInfo +=  '<span>안전인증정보 상세 이미지 참조</span></span></td></tr>';
        	}

			return new Handlebars.SafeString(essentialInfo);
		});

        return template(data);
	},

	autoSelectOption : function (colorData,isInit) {
		$(".a-size-swatch[color-value!="+colorData+"], .size-options.pdp[slitm-cd!="+colorData+"]").hide();
		$(".a-size-swatch[color-value="+colorData+"], .size-options.pdp[slitm-cd="+colorData+"]").css("display","");


		$(".o-slider .a-image").removeClass("is-selected");
		$(".o-slider .pdpDefaultImg:visible").addClass("is-selected");

		if(!isInit){
			$(".size-options.pdp").removeClass("is-selected");
			$("#addBagBtn").addClass("is-disabled");
		}

		var ostkexpsstat = $(".color-list.pdp.is-active").data("ostkexpsstat");

		if(ostkexpsstat == "" || ostkexpsstat == null) {
			ostkexpsstat = "품절";
		}

		if($(".size-options.pdp:visible:not(.out-of-stock)").length == 0 ) {
			$("#addBagBtn").text(ostkexpsstat);
			$("#addBagBtn").attr("outOfStock","true");
		} else {
			$("#addBagBtn").text("장바구니 담기");
			$("#addBagBtn").attr("outOfStock","false");
		}

		if($(".size-options.pdp.free-size:visible:not(.out-of-stock)").length != 0) {
			$(".size-options.pdp[slitm-cd="+colorData+"]").addClass("is-selected").trigger("click");
			$("#addBagBtn").removeClass("is-disabled");
		}
	},

	quickShopAutoSelectOption : function (colorData) {
		/* 옵션별 사이즈*/
		$(".a-size-swatch.quickpdp[color-value!="+colorData+"], .size-options.quickpdp[slitm-cd!="+colorData+"]").hide();
		$(".a-size-swatch.quickpdp[color-value="+colorData+"], .size-options.quickpdp[slitm-cd="+colorData+"]").css("display","");

		$(".size-options.quickpdp").removeClass("is-selected");

		$("#quick-add-to-bag").addClass("is-disabled");

		var ostkexpsstat = $(".color-list.quickpdp.is-active").data("ostkexpsstat");

		if(ostkexpsstat == "" || ostkexpsstat == null) {
			ostkexpsstat = "품절";
		}

		if($(".size-options.quickpdp:visible:not(.out-of-stock)").length == 0 ) {
			$("#quick-add-to-bag").text(ostkexpsstat);
			$("#quick-add-to-bag").attr("outOfStock","true");
		} else {
			$("#quick-add-to-bag").text("장바구니 담기");
			$("#quick-add-to-bag").attr("outOfStock","false");
		}

		if($(".size-options.quickpdp.free-size:visible:not(.out-of-stock)").length != 0) {
			$(".size-options.quickpdp[slitm-cd="+colorData+"]").addClass("is-selected").trigger("click");
			$("#quick-add-to-bag").removeClass("is-disabled");
		}
	}
};

$(function($){
	
	/*
	window.appeaser.subscribe(window.appeaser.Enums.trigger.ADD_ITEM_TO_CART, function(){
    	var formName = "itemInfForm",
    		sizeOp = ".size-options";
    	if ($(event.target).attr('id') == "quick-add-to-bag") {
    		formName += "QuickShop";
    		sizeOp += ".quickpdp";
    	}

        window.appeaser.publish(window.appeaser.Enums.listen.ON_ITEM_ADDED_TO_CART, {
            imgSrc: $("#"+formName+" input[name='mini-cart-image']").val(),
            title: $("#"+formName+" input[name='slitmNm']").val(),
            price: $("#"+formName+" input[name='sellPrc']").val(),
            size: $(sizeOp+".is-selected span").html(),
            color: $("input[name='selectColor']:first").attr("value")
        });
    });*/
	
	/* 20190208 : 버튼을 jquery 이벤트로 연결함. */
	$("button#addBagBtn").click(function(event){
		var formName = "itemInfForm",
			sizeOp = ".size-options"
		if ($(event.target).attr('id') == "quick-add-to-bag") {
			formName += "QuickShop";
			sizeOp += ".quickpdp";
		}
		
		/* 20190208 : 파이어폭스 대응 */
		if(navigator.userAgent.indexOf("Firefox") !== -1){
			window.event = {};
			window.event.target = "button#addBagBtn"
		}
		/* // 20190208 : 파이어폭스 대응 */
		
		window.appeaser.publish(window.appeaser.Enums.listen.ON_ITEM_ADDED_TO_CART, {
			imgSrc: $("#"+formName+" input[name='mini-cart-image']").val(),
			title: $("#"+formName+" input[name='slitmNm']").val(),
			price: $("#"+formName+" input[name='sellPrc']").val(),
			size: $(sizeOp+".is-selected span").html(),
			color: $("input[name='selectColor']:first").attr("value")
		});
		
		if(navigator.userAgent.indexOf("Firefox") !== -1){
			window.event = null;
		}
	})
	/* // 20190208 : 버튼을 jquery 이벤트로 연결함. */
});
