webpackJsonp(["app/js/attachment/index"],[function(a,e,t){"use strict";function n(a){return a&&a.__esModule?a:{default:a}}var i=t("b334fd7e4c5a19234db2"),l=n(i),d=$("#attachment-modal"),s=d.find("#uploader-container"),o=new UploaderSDK({id:s.attr("id"),initUrl:s.data("initUrl"),finishUrl:s.data("finishUrl"),accept:s.data("accept"),process:s.data("process"),fileSingleSizeLimit:s.data("fileSingleSizeLimit"),ui:"single",locale:document.documentElement.lang});o.on("error",function(a){(0,l.default)("danger",a.message)}),o.on("file.finish",function(a){if(a.length&&a.length>0){var e=parseInt(a.length/60),t=Math.round(a.length%60);$("#minute").val(e),$("#second").val(t),$("#length").val(60*e+t)}var n=$('[data-role="metas"]'),i=n.data("currentTarget"),l=$("."+n.data("idsClass")),s=$("."+n.data("listClass"));""!=i&&(l=$("[data-role="+i+"]").find("."+n.data("idsClass")),s=$("[data-role="+i+"]").find("."+n.data("listClass"))),$.get("/attachment/file/"+a.id+"/show",function(e){s.append(e),l.val(a.id),d.modal("hide"),s.siblings(".js-upload-file").hide()})}),d.one("hide.bs.modal",function(a){o.destroy(),o=null})}]);