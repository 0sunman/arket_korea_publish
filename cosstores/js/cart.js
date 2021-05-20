var Official = Official || {};
Official.Cart = function () {
	var createForm = function (data) {
			$.extend(true, data, {
				id : data.id,
				name : data.name || data.id,
				action : data.action || '',
				method : data.method || 'post',
				target : data.target || '_self'
			});
	    	if (isEmpty(data.id)) {
	    		console.log("form id not empty");
	    		return;
	    	}
	    	if ($("#"+data.id).length > 0) {
	    		$("#"+data.id).remove();
	    	}
	    	var template = Official.Handlebars.template("template-form", data);
	    	$("body").append(template);
	    };
	return {
		/* Official.Cart.init */
		init: function () {
			//장바구니삭제
			$(document).on( {
				"click": function (e) {
		            var obj = $(e.target);
		            var $li = $(obj).closest("div.o-cart-item");

	            	deleteBasktItem($li.data("delete"));
				}
			}, "#cartPage .removeButtonItem");
		    $(document).on({
		    	keydown : function(event) {
			        // Allow: backspace, delete, tab, escape, enter and .
			        if ( $.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
			             // Allow: Ctrl+A
			            (event.keyCode == 65 && event.ctrlKey === true) ||
			             // Allow: home, end, left, right
			            (event.keyCode >= 35 && event.keyCode <= 39)) {
			                 // let it happen, don't do anything
			                 return;
			        }
			        else {
			            // Ensure that it is a number and stop the keypress
			            if (event.shiftKey || (event.keyCode < 48 || (event.keyCode > 57 && event.keyCode < 96) || event.keyCode > 105 )) {
			                event.preventDefault();
			            }
			        }
		    	},
		    	keyup : function (evnet) {
		    		this.value = this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
		    	}
		    }, "input.onlyNumberInput");
		},
		/* Official.Cart.url
         * CONFIG_SSL_YN : 'Y' 인 경우 https 로 변경한다
         */
        url : function (vurl) {
        	var prot = "http://",
        		url = "";

        	if (hd.CONFIG_SSLYN == "Y") {
        		prot = "https://";
        	}

        	url = prot + hd.SERVER_HOST + hd.common.url(vurl);
        	return url;
        },
		/* Official.Cart.convertMiniCartData */
        convertMiniCartData: function (data, id) {
        	var TotalItems = 0;
        	var TotalPrice = 0;
        	var Products = [];
        	if (data.totBasktList != null) {
        		$.each(data.totBasktList, function (i, obj) {
        			$.each(obj.basktGrpList, function (j, grp) {
        				$.each(grp.basktList, function (k, list) {
        					TotalPrice += parseInt(list.slitmInf.sellPrc, 10) * parseInt(list.ordQty, 10);
        					TotalItems += parseInt(list.ordQty, 10);

        					list.AvailableQuantity = list.stck;
        				});
        				Products = grp.basktList;
        			});
        		});
        	}

        	data.Response = data.Response || {};
			$.extend(true, data.Response, {
				DisplaySubtotalPrice : gfn_appendComma(TotalPrice),
				TotalItems : TotalItems,
				TotalPrice : TotalPrice,
				Products : Products
			});

			if (id != null) {
				data.Response.Products = $.grep(data.Response.Products, function (obj, i) {
					return obj.slitmCd + "" + obj.uitmCd == id;
				});
//				data.Response.TotalItems = data.Response.Products.length;
			}
			return data;
        },
	    /* Official.Cart.getBasktItem */
	    getBasktItem: function () {
			var $cartWrap = $(".o-cart > .cart-items");
		    var basktInfArr = [];

			if($cartWrap.length > 0){
				var typeGb = $cartWrap.attr("id").substring(9);

				var cart_list = $cartWrap.find(".o-cart-item.nosoldout");
			    $(cart_list).find("input[name='checkbox"+typeGb+"']:checked").each(function(index, subObj) {
			        basktInfArr.push($(subObj).val());
			    });
			}
			return basktInfArr;
	    },
	    /* Official.Cart.basktCheckout */
	    basktCheckout: function () {
			var $cartWrap = $(".o-cart > .cart-items");


			if($cartWrap.length > 0){
				var typeGb = $cartWrap.attr("id").substring(9);
				if($cartWrap.find(".o-cart-item.nosoldout").length > 0){
					var basktInfArr = Official.Cart.getBasktItem();

				    if(basktInfArr.length == 0) {
				        return false;
				    }

				    if (isLoggedIn) {
				    	orderReq(basktInfArr);
				    } else {
				    	openLoginPopup("orderReq", "order");
				    }
				}
			}
	    },
	    
	    /* Official.Cart.checkItemCheckout */
	    checkItemCheckout: function (basktInfArr) {
		    if(basktInfArr.length == 0) {
		        return false;
		    }
        	var $checkout = Official.Cart.checkout(basktInfArr);
        	$checkout.fail(function (data) {
        		if (data.message.indexOf("checkStock") > -1) {
        			data.message = "재고가 부족합니다. [msg028]";
        		}
        		Official.Cart.alert_btn({msg : data.message}|| Official.Cart.DEFAULT_ERROR, function () {
        			location.href = hd.common.url("/odb/basktList");
        		});
        	});
        	return $checkout;
	    },
	    
	    /* Official.Cart.checkout */
	    checkout: function (basktInfArr, promotionCode) {
		    var $deferred = $.Deferred();
		    var url = hd.common.url("/oda/buyDirectForBaskt"),
		    	$promotionCode = $("#promotionCode");
		    url += "?basktInf=" + basktInfArr.join("&basktInf=")

		    $.ajax({
		        type: "post",
		        url: url,
		        dataType: "json",
		        success : function(data) {
		            if(!isEmpty(data.errorMessages)) {
		                $deferred.reject({
		                	code : "ERROR",
		                	message : data.errorMessages || Official.Cart.DEFAULT_ERROR
		                });
		            } else {
		            	createForm({
		        			id : "orderForm",
		        			action : Official.Cart.url("/oda/order")
		        		});
		            	var $orderForm = $("#orderForm"), formInput = "";
		            	$orderForm.empty();
		                for(var i = 0; i < basktInfArr.length; i++) {
		                	formInput += "<input type='hidden' name='basktInf' value='" + basktInfArr[i] + "'/>";
		                }

		    		    if ($.trim($promotionCode.val()) != "") {
		    		    	$("input[name='copnInf']").each(function() {
		    		    		formInput += "<input type='hidden' name='copnInf' value='" + $(this).val() + "'/>";
		    		    	});
		    		    }
		                $orderForm.append(formInput);
		                $orderForm.submit();
		            }
		        },
		        error: function(data) {
	                $deferred.reject({
	                	code : "ERROR",
	                	message : Official.Cart.DEFAULT_ERROR
	                });
		        }
		    });
		    return $deferred.promise();
	    },
	    /* Official.Cart.updateCartPage */
	    updateCartPage: function(element, data) {
	        for (var itemId = parseInt(element.attr("data-id")), products = data.Response.Products, i = 0; i < products.length; i++) {
	        	if(products[i].slitmCd + '' + products[i].uitmCd == itemId) {
	        		$(element).find("input[name='cnt']").val(products[i].ordQty);
	        		$(element).find("select").val(products[i].ordQty);
	        		$(element).find("select").data("selectBox-selectBoxIt").refresh();
	        	}
	        }
	        calcSellPrc();
	    },
    	//Official.Cart.alert
	    alert: function (msg) {
	    	var opt;
			if (typeof msg === 'string') {
				opt = {};
				opt.msg = msg;
			} else {
				opt = msg;
			}

			$.osDialog.alert(opt);
	    },
    	//Official.Cart.alert_btn
	    alert_btn: function (msg, okAction) {
	    	var opt;
			if (typeof msg === 'string') {
				opt = {};
				opt.msg = msg;
			} else {
				opt = msg;
			}

			$.osDialog.alert_btn(opt, okAction);
	    },
	    //Official.Cart.confirm
	    confirm : function (msg, callbackYes, callbackNo) {
	    	var opt;
			if (typeof msg === 'string') {
				opt = {};
				opt.msg = msg;
			} else {
				opt = msg;
			}

			$.osDialog.confirm(opt, callbackYes, callbackNo);
	    },
	    //Official.Cart.getWarningMessages
        getWarningMessages: function (warningMessages) {
        	switch($.trim(warningMessages)) {
        	case "QUANTITY_LOW_IN_STOCK_2": /* "품절임박! 주문을 서두르세요." */
        		msg = "품절임박! 주문을 서두르세요."; break;
        	default: msg = warningMessages;
        	}
        	return msg;
        },
	    //Official.Cart.promotionCheck
	    promotionCheck : function () {
			var $custUseCopnNm = $("#custUseCopnNm"),
				$validationE = $(".field-validation-error");

			$validationE.addClass("hidden");
			$validationE.html("");

			if ($.trim($custUseCopnNm.val()) == "") {
				$validationE.html("프로모션 코드를 입력해 주세요.");
				$validationE.removeClass("hidden");
				return;
			}

			$custUseCopnNm.val($.trim($custUseCopnNm.val()));
			var basktInfArr = Official.Cart.getBasktItem();

	        $.post(hd.common.url("/odb/promotionCheck") + "?basktInf=" + basktInfArr.join("&basktInf="), {
	        	custUseCopnNm : $.trim($custUseCopnNm.val())
	        }, function (data) {
	        	switch(data.errorMessages) {
	        	case "NOT_EMP":
	        	case "MIN_PRICE_5000":
	        	case "GREATER_THAN_DC_PRICE":
	        	case "NOT_AVAILABLE":
					$validationE.html("프로모션 코드가 정확하지 않습니다.");
					$validationE.removeClass("hidden");
					return; break;
	        	case "CUST_USE_COPN_NM_EMPTY":
					$validationE.html("프로모션 코드를 입력해 주세요.");
					$validationE.removeClass("hidden");
	        		return; break;
            	case "NON_MEMBER":
            		Official.Cart.alert("로그인 후 이용해주세요.");
                	return; break;
/*[더현대닷컴 H&M Hmall 입점 20200120] 임천재 시작*/            
	        	case "NOT_STLM_AMT_DC_COPN":        		
	        		if(data.errorSlitmNm != "" && data.errorSlitmNm != null && data.errorSlitmNm != undefined) {
	        			$validationE.html("아래 상품이 프로모션 코드의 적용 대상이 아니어서 본 주문에 사용이 불가합니다." + data.errorSlitmNm);
	        		} else {
	        			$validationE.html("프로모션 코드 적용 비대상 상품이 포함되어 있습니다.");
	        		}
	        		$validationE.removeClass("hidden");
	        		return;
	        	case "NOT_BSICAMT":
	        		$validationE.html("쿠폰 기준금액에 맞지 않습니다.");
	        		$validationE.removeClass("hidden");
	        		return; 
/*[더현대닷컴 H&M Hmall 입점]  임천재 끝*/	        		
	        	default: break;
	        	}
	        	if ($.trim(data.errorMessages) != "") {
	        		Official.Cart.alert(data.errorMessages);
                	return;
	        	}

	    		if (!isEmpty($("#promotionCode").val()) && $("#promotionCode").val() != $custUseCopnNm.val()) {
	       			var msg = "프로모션 코드는 1개만 사용할 수 있습니다.<br/>입력하신 코드로 변경 하시겠습니까?",
	       				_callbackYes = function () {
	       				Official.Cart.promotionApply(data);
	            		},
	            		_callbackNo = function () {
	            		};
	            		Official.Cart.confirm(msg, _callbackYes, _callbackNo);
	    		} else {
	    			//프로모션 적용
	    			Official.Cart.promotionApply(data);
	    		}
	        }).fail(function () {
	        });
		},
	    //Official.Cart.promotionRemove
		promotionRemove : function () {
			var $custUseCopnNm = $("#custUseCopnNm"),
				$custUseCopnArea = $("#custUseCopnArea"),
				$copnInf = $("input[name='copnInf']");

			$copnInf.remove();
			$custUseCopnArea.hide();
			$("#promotionCode").val("");
			$("#promotionName").val("");
			$(".o-cart-discount-code").show();
			calcSellPrc();
		},
	    //Official.Cart.promotionApply
		promotionApply : function (data) {
			var $custUseCopnNm = $("#custUseCopnNm"),
				$custUseCopnArea = $("#custUseCopnArea"),
				$copnInf = $("input[name='copnInf']");


			var exstCopnItemList = data.exstCopnItemList;
			if (exstCopnItemList == null || exstCopnItemList.length == 0) {
				Official.Cart.promotionRemove();
				return;
			}


			var input = "", copnNm = "", copnPblcNo = "";
			$.each(exstCopnItemList, function (idx, item) {
				var values = [], copn = {};
				if (item.copnList != null) {
					copn = item.copnList[0];

					copnNm = $.trim(copnNm) == "" ? copn.copnNm : copnNm;

					values.push(copn.copnNo);
					values.push(item.slitmCd);
					values.push(item.uitmCd);
					values.push(copn.famtFxrtGbcd);
					values.push(copn.famtFxrtVal);
					values.push("1");
					values.push(idx);
					values.push(copn.copnPblcNo);
					values.push(copn.maxDcPossAmt);
					values.push(copn.copnTypeGbcd);
					values.push(copn.ulmtUseYn);
					values.push(copn.dcPrice);			// [더현대닷컴 H&M Hmall 입점 20200120] 결제금액할인금액

					if (item.aplyGnrlCopnInf != null) {
						input += '<input type="hidden" name="copnInf" id="gnrlCopn_'+idx+'" itemIdx="'+idx+'" value="'+item.aplyGnrlCopnInf+'" class="gnrlCopn"/>';
					} else {
						input += '<input type="hidden" name="copnInf" id="gnrlCopn_'+idx+'" itemIdx="'+idx+'" value="'+values.join('|')+'"/>';
					}
				}
			});

			$("#copnArea").html(input);

			// 금액계산
			calcSellPrc();

			$("#promotionName").val($.trim(copnNm));
			$("#promotionCode").val($.trim(data.promotionCode));
			$custUseCopnArea.find("span.discount-label").html(copnNm);
			$custUseCopnArea.show();
			$(".o-cart-discount-code").removeClass("is-active").hide();
		},
		
	   	//Official.Cart.alert_btn_order
		alert_btn_order: function (msg, okAction) {
	    	var opt;
			if (typeof msg === 'string') {
				opt = {};
				opt.msg = msg;
			} else {
				opt = msg;
			}

			$.osDialog.alert_btn_order(opt, okAction);
	    }
	}
}();
/**
 * 미니카트
 */
Official.MiniCart = function () {
	var getData = function (minicartData) {
		    var $deferred = $.Deferred();
		    if (minicartData != null) {
				$deferred.resolve(minicartData);
		    } else {
		    	$.post(hd.common.url("/odb/basktMiniList"), {}, function (data) {
		    		$deferred.resolve(data);
		    	}).fail(function () {
		    		$deferred.reject({
		    			code : "ERROR",
		    			message : Official.Cart.DEFAULT_ERROR
		    		});
		    	});
		    }
			return $deferred.promise();
		};
	return {
		/* Official.MiniCart.render */
		render: function (minicartData) {
			var $gnbCartList = $("#gnb_cart_list");
			if ($gnbCartList.length == 0) {
				return;
			}

			var $minicartItem = $("#minicart-products"),
				$minicartCount = $("#gnb_cart_list .item-count"),
				$minicartSummary = $("#gnb_cart_list > .summary-section");

			$minicartSummary.hide();
			getData(minicartData).done(function (datal) {
				var data = Official.Cart.convertMiniCartData(datal);
				var htmItem = Official.Handlebars.template("template-minicart-item", data.Response|| {});

				if (data.Response.Products.length == 0) {
					$gnbCartList.addClass("is-empty");
					$minicartItem.removeClass("products");
					$minicartCount.html("");
					$minicartSummary = $minicartSummary.eq(1);
					$(".js-minicart-quantity").html("");
				} else {
					$gnbCartList.removeClass("is-empty");
					$minicartItem.addClass("products");
					$minicartCount.html("(" + (data.Response.TotalItems || 0) + ")");
					$minicartSummary = $minicartSummary.eq(0);
					$(".js-minicart-quantity").html("(<span>" + (data.Response.TotalItems || 0) + "</span>)");
				}


				$minicartItem.html(htmItem);
				$minicartSummary.show();
				$minicartSummary.find(".order-value").html(gfn_appendComma(data.Response.TotalPrice));
				$minicartSummary.find(".total").html(gfn_appendComma(data.Response.TotalPrice));
			}).always(function () {
			});
		},
		
	    /* Official.MiniCart.checkout */
	    checkout: function (basktInfArr) {
		    if (!isLoggedIn) {
		    	//비회원 : 주문서진입로그인으로 이동
		    	location.href = hd.common.url("/cob/loginFormForNM");
		    	return;
		    }

		    // 회원 : 주문서로 이동
		    if (!Array.isArray(basktInfArr)) {
			    basktInfArr = Official.MiniCart.getBasktItem();
		    }
		    
		    if(basktInfArr.length == 0) {
		        return false;
		    }
		    Official.Cart.checkItemCheckout(basktInfArr);
	    },
	    
		/* Official.MiniCart.getBasktItem */
		getBasktItem: function () {
		    var basktInfArr = [],
		    	$minicartItem = $("#minicart-products > .o-cart-item")
		    	;
		    
		    $minicartItem.each(function (idx, obj) {
				var cartItem = [];
				cartItem.push($(obj).data('slitmcd'));
				cartItem.push($(obj).data('uitmcd'));
				cartItem.push($(obj).data('baskttypegbcd'));
				cartItem.push($(obj).data('ordqty'));
				cartItem.push($(obj).data('bbprc'));
				cartItem.push($(obj).data('myshno'));
		    	basktInfArr.push(cartItem.join('|'));
		    });
		    return basktInfArr;
		}
	}
}();
/**
 * 우편번호
 */
Official.Post = function () {
	var TEMPLATE_POST = "#template-common-post";
	var $commonPost = $(TEMPLATE_POST); 

	var openPost = function () {
			$('body').append($('#template-common-post-warrper').html());
			$commonPost = $(TEMPLATE_POST); 
			var p = $.extend({}, Official.Cart._DEF_DIALOG, {
					position: { my: "top", at: "center", of: window },
					close: function (e, ui) {
						Official.Cart._DEF_DIALOG.close();
						$commonPost.dialog('destroy');
						$commonPost.remove();
					},
					open: function (e, ui) {
						Official.Cart._DEF_DIALOG.open();
	    				$(e.target).closest(".ui-dialog").addClass("ui-alert");
						$commonPost.find("iframe").attr("src", hd.common.url("/coa/searchNewPostAddress"));
			        }
				});
			$commonPost.dialog(p);
			// jquery scroll start
			$commonPost.find('.scroll-content').scrollbar('destroy');
			$commonPost.wrapInner('<div class="scrollbar-inner"></div>');
			$commonPost.find('.scrollbar-inner').scrollbar({
				onUpdate: function () {
					$(window).trigger('resizeDialog');
				}
			});
            if ($commonPost.children('.scroll-wrapper').length) { // for pc
                $commonPost.css('overflow-y','hidden');
				$commonPost.find('.scroll-content').on('scroll', function () {
					try{
						if (typeof $commonPost.find("iframe")[0].contentWindow.scrollEventBind !== "undefined") {
							$commonPost.find("iframe")[0].contentWindow.scrollEventBind($(this));
						}
					} catch(e) {}
				});
            } else {
                $commonPost.css('overflow-y','auto');
				$("[aria-describedby='template-common-post']").on('scroll', function () {
					try{
						if (typeof $commonPost.find("iframe")[0].contentWindow.scrollEventBind !== "undefined") {
							$commonPost.find("iframe")[0].contentWindow.scrollEventBind($(this));
						}
					} catch(e) {}
				});
            }
			// //jquery scroll end
		},
		closePost = function () { 
			$commonPost.dialog("close");
		},
	    resizePost = function (height) {
			$commonPost = $(TEMPLATE_POST);
			$commonPost.find("iframe").css({
				"overflow": "auto",
				"height": ($commonPost.find("iframe").contents().find(".popup_cont").outerHeight(true)+4) + "px"
			});
			$(window).trigger('resizeDialog');
		};
	$commonPost.resize(function () {
		try {
			resizePost();
		} catch(e) {}
	}); 
	return {
		/**
		 * Official.Post.open
		 */
		open : openPost,

		/**
		 * Official.Post.close
		 */
		close : closePost,

		/**
		 * Official.Post.resize
		 */
		resize : resizePost
	}
}();
/**
 * LIGHTBOX RESIZE EVENT
 */
$(window).on("resize", function () {
	var $commonCert = $("[data-template='template-common-cert']");
	if ($commonCert.is(":visible")) {
		var _height = $commonCert.find("iframe").contents().find(".popup_cont").height();
		Official.Cert.resize(_height);
	}
	
	var $commonPost = $("[data-template='template-common-post']");
	if ($commonPost.is(":visible")) {
		Official.Post.resize();
	}
});
/**
 * 본인인증
 */
Official.Cert = function () {
	var TEMPLATE_CERT = "[data-template='template-common-cert']";

	var openCert = function () {
			var $commonCert = $(TEMPLATE_CERT);

			$("#hidBtnCert").click();
			$("#iframeCert").attr("src", hd.common.url("/cob/commRlnmCertPup") + "?reqType=nonMember");
		},
		closeCert = function () {
			$(TEMPLATE_CERT).next(".js-close-button").click();
		},
	    resizeCert = function (height) {
			var $commonCert = $(TEMPLATE_CERT);
			if (isEmpty(height)) return;
			if (Modernizr.mq('(min-width: 768px)')) {
				//
				$commonCert.find("iframe").attr({
					"height": height + "px"
				});
				$commonCert.find("iframe").css({
					"overflow": "hidden",
					"height": height + "px"
				});
			} else {
				//popup 전체화면
				var $viewArea = $commonCert.find(".ly_popup_view"),
					$titleArea = $commonCert.find("h1.popup_title");
				$commonCert.find("iframe").css({
					"overflow": "auto",
					"height": ($viewArea.height()-$titleArea.outerHeight(true)-10) + "px"
				});
			}
		};
		
	return {
		/**
		 * Official.Cert.open
		 */
		open : openCert,

		/**
		 * Official.Cert.close
		 */
		close : closeCert,

		/**
		 * Official.Cert.resize
		 */
		resize : resizeCert
	}
}();
Official.Handlebars = function () {
	if (typeof Handlebars !== 'undefined') {
		/**
		 * 장바구니 가격 표현
		 */
		Handlebars.registerHelper('fnBasktSellPrc', function() {
			var prc = "";
			if (isEmpty(this.csmPrc) || this.csmPrc == "0" || $.trim(this.slitmInf.sellPrc) == $.trim(this.csmPrc)) {
				prc = '<span class="price">' + gfn_appendComma(this.slitmInf.sellPrc) + '</span>';
			} else {
				prc += '<span class="is-deprecated price">' + gfn_appendComma(this.csmPrc) + '</span>';
				prc += '<span class="is-reduced price">' + gfn_appendComma(this.slitmInf.sellPrc) + '</span>';
			}
			return new Handlebars.SafeString(prc);
		});

		/**
		 * 상품상세 보러가기 링크
		 */
		Handlebars.registerHelper('fnBBasktItemPtcUrl', function() {
			return new Handlebars.SafeString(hd.common.url(this.prodDtlUrl) + '?slitmCd=' + this.slitmCd);
		});

		/**
		 * 장바구니 총금액 표현
		 */
		Handlebars.registerHelper('fnBasktTotalPrc', function() {
			return gfn_appendComma(this.slitmInf.sellPrc * this.ordQty);
		});
		/**
		 * 장바구니 상품이미지
		 */
		Handlebars.registerHelper('fnBasktItemImgUrl', function() {
			var itemUrl = hd.common.imgUrl(this.slitmCd, this.sImgNm, 2);
			return new Handlebars.SafeString(itemUrl);
		});
		/**
		 * 장바구니 메시지 : 재고
		 */
		Handlebars.registerHelper('fnBasktWarningMessages', function() {
			var msg = "";
			switch($.trim(this.warningMessages)) {
        	case "QUANTITY_LOW_IN_STOCK_2": /* "품절임박! 주문을 서두르세요." */
        		msg = "품절 임박"; break;
        	default: msg = this.warningMessages;
        	}
			return new Handlebars.SafeString($.trim(msg));
		});
	}
	return {
		/* Official.Handlebars.template */
		template: function (id, data) {
	        var html = $('script#' + id).html();
	        var template = Handlebars.compile(html);
	        return template(data || {});
		}
	}
}();
Official.Cart.DEFAULT_ERROR = "시스템 오류입니다. 다시 시도해주세요.";
Official.Cart._DEF_LAYER = {
	template: "",
    $el: null,
    nopadding: true,
    classes: '',
    data : {}
};
Official.Cart._DEF_SCROLLTOP = 0;
Official.Cart._DEF_SELECTMENU = {
		/*
		 * Official.Cart._DEF_SELECTMENU.open
		 */
		open: function (obj) {
			Official.Cart._DEF_SCROLLTOP = $(window).scrollTop();
			$('html').addClass('ly_fixselect');

			var id_name = $(obj).attr('id');
			if($(obj).hasClass('except')){
				$('#' + id_name + '-menu').parent().addClass('except');
			} else {
				$('.ui-selectmenu-open').children('.ui-menu').wrapAll('<div class="div-table"></div>');
				$('.ui-selectmenu-open').addClass('se_mobile');
				$("<span class='a-icon-close'></span>").prependTo(".ui-selectmenu-open").click(function () {
					$(obj).selectmenu("close");
				});
			}

		},
		/*
		 * Official.Cart._DEF_SELECTMENU.close
		 */
		close: function (obj) {
			$('html').removeClass('ly_fixselect');
			$("body").scrollTop(Official.Cart._DEF_SCROLLTOP);
			$('.ui-selectmenu-menu').removeClass('ui-selectmenu-open');
			$(".ui-selectmenu-open .a-icon-close").remove();
			$('.div-table').children('.ui-menu').unwrap();
		}
};
Official.Cart._DEF_DIALOG = {
	    resizable: false,
		draggable: false,
		height: "auto",
		width : "650",
		position: { my: "center", at: "center", of: window },
	    modal: true ,
    	open: function (event, ui) {
			$("html, body").addClass("u-overflow-hidden");
			$(".ui-dialog-titlebar-close").show();
    	},
    	close: function () {
			$("html, body").removeClass("u-overflow-hidden");
    	}
	};




$(function () {
	Official.MiniCart.render();

	/**
	 * pattern library lightbox close event bind
	 */
	if (window.appeaser) {
		window.appeaser.subscribe(window.appeaser.Enums.listen.ON_LIGHTBOX_CLOSE, function(data) {
			$(".o-lightbox .js-close-button").removeClass("u-not-pc");
		});
	}
	/**
	 * ui
	 * checkbox live event
	 */
	$(document).on('click', '.checkbox-ui', function(){
		if ($(this).is(":checked")) {
			$(this).parent('label').addClass('checked');
		}else {
			$(this).parent('label').removeClass('checked');
		}
	});
	/**
	 * ui
	 * radio live event
	 */
	$(document).on('click', '.radio-ui', function(){
		var radio_name = $(this).attr('name');
		$('input[name='+radio_name+']').parent('label').removeClass('checked');
		$(this).parent('label').addClass('checked');
	});
	$.fn.extend({
		/**
		 * select box 새로고침
		 * jquery ui plugin
		 */
		selectBoxRefresh : function () {
			return this.each(function (idx, obj) {
				if ($(obj).prop("nodeName") == "SELECT") {
					$(obj).selectmenu({
						open: function () {
							Official.Cart._DEF_SELECTMENU.open(this);
						},
						close: function () {
							Official.Cart._DEF_SELECTMENU.close(this);
                            $('html').removeClass('ly_fixselect');
						}
						,appendTo: $(this).parent()
					});
					$(obj).selectmenu("refresh");
					$(obj).next().addClass('selectboxit-container');
					if ($(obj).hasClass("except")) {
						$(obj).next().addClass('except');
					}
				}
			});
		},
		/*
		 * input box 새로고침
		 */
		inputRefresh : function () {
			return this.each(function (idx, obj) {
				var $input = $(obj);

				if ($input.hasClass('checkbox-ui')) {
					$input.parent('label').addClass('type-checkbox');
				}
				if ($input.hasClass('radio-ui')) {
					$input.parent('label').addClass('type-radio');
				}
				if ($input.attr("disabled")) {
					$input.parent('label').addClass('disabled');
				} else {
					$input.parent('label').removeClass('disabled');
				}
				if ($input.prop('checked')) {
					$input.parent('label').addClass('checked');
				} else {
					$input.parent('label').removeClass('checked');
				}
			});
		},
		/**
		 * error 메시지 출력시 필요한 class 추가
		 */
		errorShow : function (text) {
			return this.each(function (idx, obj) {
				var $error = $(obj);

				if ($error.closest(".form_lab").length > 0)
				{
					$error.closest(".form_lab").prevAll(".form_group").find("input").addClass("has-error");
					$error.closest(".form_lab").prev(".input_group").find("input").addClass("has-error");
				}
				else if ($error.prevAll(".input_group").length > 0)
				{
					$error.prevAll(".input_group").find("input").addClass("has-error");
				}
				else
				{
					console.log("input not found, ", obj.id);
				}

				$error.html(text);
				$error.show();
			});
		},
		/**
		 * error 메시지 remove
		 */
		errorHide : function () {
			return this.each(function (idx, obj) {
				var $error = $(obj);

				if ($error.closest(".form_lab").length > 0)
				{
					$error.closest(".form_lab").prevAll(".form_group").find("input").removeClass("has-error");
					$error.closest(".form_lab").prev(".input_group").find("input").removeClass("has-error");
				}
				else if ($error.prevAll(".input_group").length > 0)
				{
					$error.prevAll(".input_group").find("input").removeClass("has-error");
				}
				else
				{
					console.log("input not found, ", obj.id);
				}


				$error.html("");
				$error.hide();
			});
		}
	});
});
