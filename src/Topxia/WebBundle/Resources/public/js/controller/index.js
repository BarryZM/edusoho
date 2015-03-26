define(function(require, exports, module) {

    var Share = require('../util/share.js');
    require('jquery.cycle2');

    exports.run = function() {
        $('.homepage-feature').cycle({
            fx:"scrollHorz",
            slides: "> a, > img",
            log: "false",
            pauseOnHover: "true"
        });
        Share.create({
            selector: '.share',
            icons: 'itemsAll',
            display: ''
        });

        $('input:checkbox[name="coursesTypeChoices"]').on("change", function () {
            var element = $(this);alert(element.attr("id"));
            if(element.attr("id") == "liveCourses" && element.prop('checked')){
                $("#vipCourses").prop('checked', false);
            }
            if(element.attr("id") == "vipCourses" && element.prop('checked')){
                $("#liveCourses").prop('checked', false);
            }
            if(element.attr("id") == "freeCourses" && element.prop('checked')){
                $("#freeCourses").prop('checked', false);
            }
            $(this).parents("form").submit();
        });

    };

});