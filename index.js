let parseNum = function(str) {
    return parseFloat(str.slice(0,str.length-2));
}

function showImage(imgName) {
    document.getElementById('largeImg').src = imgName;
    showLargeImagePanel(imgName);
    document.getElementById('largeImgPanel').style.visibility = 'visible';
    unselectAll();
}
function showLargeImagePanel(imgName) {

    let imgH, imgW, w2, h2;
    for (let i=0; i<$("#middle img.fig").length; ++i) {
        let item = $("#middle img.fig:eq("+i+")");
        if (item.attr("src")==imgName) {
            imgH = $(item).height();
            imgW = $(item).width();
            break;
        }
    }

    let w = $(window).width();
    let h = $(window).height();

    if (imgH==undefined) {
        imgH = h;
        imgW = w;
    }

    if (imgW>imgH && (w<h || (w>h && w/h<imgW/imgH))) {
        // w -=10;
        h2 = w*(imgH/imgW);
        $("#largeImgPanel").css("height",h2);
        $("#largeImgPanel").css("width",w);
        $("#largeImgPanel").css("top",(h-h2)/2);
        $("#largeImgPanel").css("left",0);

        $("#largeImg").css("height",h2-4);
        $("#largeImg").css("width",w-4);
    } else {
        // h -= 10;
        w2 = h*(imgW/imgH);
        $("#largeImgPanel").css("width",w2);
        $("#largeImgPanel").css("height",h);
        $("#largeImgPanel").css("left",(w-w2)/2);
        $("#largeImgPanel").css("top",0);

        $("#largeImg").css("width",w2-4);
        $("#largeImg").css("height",h-4);
    }
}
function unselectAll() {
    if(document.selection) document.selection.empty();
    if(window.getSelection) window.getSelection().removeAllRanges();
}
function hideMe(obj) {
    obj.style.visibility = 'hidden';
}

let computeDocHeight = function() {

    if (document.getElementById('largeImgPanel').style.visibility == 'visible') {
        showLargeImagePanel($("#largeImg").attr("src"));
    }
    let h = $(window).height();
    let hdrHeight = $("#imgHdr").height();
    $("#left2").css("height",h-hdrHeight-50);

    if ($(".video").length != 0) {
        let width = $("#middle").width();
        $(".video").css("width",width);
        $(".video").css("height",width*.5625);
    }

    if ($(".video2").length != 0) {
        let width = $("#middle").width()/3;
        $(".video2").css("width",width)
        $(".video2").css("height",width*.5625)
    }

}

$(".workLinks").on("mouseenter", function() {
    let work=$(this)[0].classList[1];
    $("."+work).css("text-decoration","line-through");
    let first = "."+work+":eq(0)";
    let second = "."+work+":eq(1)";
    if ($(second).length>0) {
        $(second).animate({opacity: 0.0, "margin-left": '-100px'}, 800, setInvisible);
        $(second).animate({opacity: 1.0, "margin-left": '0px'}, 10, setVisible);
        function setInvisible() {
        $(this).css('visibility', 'hidden');
        }
        function setVisible() {
        $(this).css('visibility', 'visible');
        }
    }
});

$(".workLinks").on("mouseleave", function() {
    let work=$(this)[0].classList[1];
    $("."+work).css("text-decoration","none");
});

$(computeDocHeight);
$(showLargeImagePanel("test"));

$(window).resize(computeDocHeight);
