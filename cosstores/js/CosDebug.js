(function(){
    var Util = function(){}
    Util.prototype.rgb2hex = function(rgb){
        var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
        function hex(x) {
            return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
        }
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);        
    }

    
    var CosDebugger = function(param){


        $(document).on(param.event,param.active_selector,(function(){
            if(!this.checkValidate()) return;
            
            alert("디버그모드 활성화");
            this.body = "body";
            this.Util = new Util();
            this.borderBuffer = "";
            this.target = "";
    
            this.drawHelper();
            $(document).on('mouseout', this.body, this.redoFocus.bind(this));
            $(document).on('mouseover', this.body, this.MOUSEOVER.bind(this));
        }).bind(this));


    }

    CosDebugger.prototype.checkValidate = function(){
        if(!jQuery){
            console.log("해당 라이브러리는 jQuery가 필요합니다.");
            return false;
        }else if(location.href.indexOf("#CosDebug") === -1){
            return false;
        }
        return true;
    }

    /* Draw */
    CosDebugger.prototype.drawHelper = function(){
        if($("#cos_helper").length == 0){
            $(this.body).append("<div id='cos_helper' style='position:fixed;top: 5%;right: 5%;opacity: 0.7;z-index:999;width:30%;height:auto;background:yellow;padding:20px'></div>")            
        }
    }
    CosDebugger.prototype.redoFocus = function(){
        $(this.target).css("border",this.borderBuffer);
    }
    CosDebugger.prototype.drawFocus = function(){
        var target = this.target;

        this.borderBuffer = $(target).css("border");
        $(target).css("border","3px solid red");
    }
    /* // Draw */

    /* EVENT */
    CosDebugger.prototype.MOUSEOVER = function(e){
        this.target = (e.target);
        this.main();

    }
    /* // EVENT */

    /* 메인함수 */
    CosDebugger.prototype.main = function(){
        this.message = "";
        this.drawFocus();

        this.putMessage("태그 : "+$(this.target).prop('tagName'))
        this.checkLinkData();
        this.checkFontData();
        this.checkPaddingData();
        this.checkMarginData();
        this.checkImageData();

        $("#cos_helper").html(this.message);
    }
    /* // 메인함수 */

    /* 메시지 저장 */
    CosDebugger.prototype.putMessage = function(text){
        this.message += "<p style='font-family:\'Nanum Gothic\';width:100%;word-break:break-all'>"+text+"</p>";
    }
    /* // 메시지 저장 */

    /* 링크 유효성 검사 */
    CosDebugger.prototype.checkLinkData = function(){
        var target = this.target;
        var linkUrl = "";
        var isLink = ($(target).prop('tagName') === "A" || $(target).css('cursor') === 'pointer')

        if($(target).prop('tagName') === "A"){
            linkUrl = $(target).attr("href");
            this.putMessage("링크 : "+linkUrl);
        }else if($(target).css('cursor') === 'pointer'){
            linkUrl = $(target).closest("picture").attr("onclick");
            if(!linkUrl){
                linkUrl = $(target).closest("picture").find("img").attr("onclick")
            }
            this.putMessage("링크 : "+linkUrl);
        }

        if(linkUrl && isLink){
            var link = linkUrl;
            if(link.indexOf("www.cosstores.com") > -1){
                if(link.indexOf("https://") > -1 && link.indexOf(".html") > -1 && link.indexOf("www.cosstores.com/kr_krw/") > -1){
                    this.putMessage("링크 유효성 : <span style='color:green;font-weight:bold'>합격</span>");
                }else{
                    this.putMessage("링크 유효성 : <span style='color:red;font-weight:bold'>불합격</span>");
                }
            }else{
                this.putMessage("링크 유효성 : 상대주소 or 타 사이트로 연결");
                
            }
        }

        if(linkUrl && linkUrl !== undefined && linkUrl !== ""){
            this.putMessage("======= 링크 ========")
            this.putMessage(linkUrl)
        }
    }
    /* // 링크 유효성 검사 */


    
    /* 폰트 검사 */
    CosDebugger.prototype.checkFontData = function(){
        var target = this.target;
        
        this.putMessage("======= 폰트 ========")
        this.putMessage("설정폰트 : "+$(target).css("font-family") + " / 폰트크기 :"+$(target).css('font-size') + " / 색상 :"+this.Util.rgb2hex($(target).css('color')))
    }
    /* // 폰트 검사 */

    
    /* 폰트 검사 */
    CosDebugger.prototype.checkPaddingData = function(){
        var target = this.target;
        
        this.putMessage("======= 패딩 ========")
        this.putMessage("패딩상단 : "+$(target).css('paddingTop') + " / 패딩하단 :"+$(target).css('paddingBottom'))
        this.putMessage("패딩왼쪽 : "+$(target).css('paddingLeft') + " / 패딩오른쪽 :"+$(target).css('paddingRight'))
    }
    /* // 폰트 검사 */

    
    /* 폰트 검사 */
    CosDebugger.prototype.checkMarginData = function(){
        var target = this.target;
        
        this.putMessage("======= 마진 ========")
        this.putMessage("마진상단 : "+$(target).css('marginTop') + " / 마진하단 :"+$(target).css('marginBottom'))
        this.putMessage("마진왼쪽 : "+$(target).css('marginLeft') + " / 마진오른쪽 :"+$(target).css('marginRight'))
    }
    /* // 폰트 검사 */

    
    /* 이미지 검사 */
    CosDebugger.prototype.checkImageData = function(){
        var target = this.target;
        
        if($(target).css('backgroundColor')){
            try{
                this.Util.rgb2hex($(target).css('backgroundColor'))
                this.putMessage("======= 배경 색상 ========")
                this.putMessage("배경 색상 :"+this.Util.rgb2hex($(target).css('backgroundColor')))
            }catch(e){
    
            }
        }
        this.putMessage("======= 이미지 크기 ========")
        this.putMessage("[반응형] 가로 : "+$(target).css('width') + " / 세로 :"+$(target).css('height'))

        if($(target).prop('tagName') === "IMG"){
            this.putMessage("[원본이미지] 가로 : "+$(target)[0].naturalWidth + " / 세로 :" + $(target)[0].naturalHeight)
        }else if($(target).parent().find(".background").length > 0){
            var $backgroundTarget = $(target).parent().find(".background");
            if($backgroundTarget.css("backgroundImage")){
                var test = new Image();
                test.src = $backgroundTarget.css("backgroundImage").replace("url(\"","").replace("\")","").replace("url(\'","").replace("\')","")
                this.putMessage("[원본이미지] 가로 : "+test.naturalWidth + " / 세로 :" + test.naturalHeight)

            }
        
        }else if($(target).find(".background").length > 0){
            var $backgroundTarget = $(target).find(".background");
            if($backgroundTarget.css("backgroundImage")){
                var test = new Image();
                test.src = $backgroundTarget.css("backgroundImage").replace("url(\"","").replace("\")","").replace("url(\'","").replace("\')","")
                this.putMessage("[원본이미지] 가로 : "+test.naturalWidth + " / 세로 :" + test.naturalHeight)

            }
        
        }
    }
    /* // 폰트 검사 */

            
    new CosDebugger({event:"click", active_selector:"#footer_warp .txt_copy"});
    
       
        
})()