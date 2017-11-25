;(function($){
    $.fn.tab = function(options){
        var defaults = {
            //各种参数 各种属性
            currentClass:'current',//高亮属性
            tabNav:'.tab>span',//导航按钮
            tabContent:'.tab_cot',//切换的内容
            eventType:'click'

        };
        
        var options = $.extend(defaults, options);

        this.each(function(){
            //各种功能
            var _this=$(this);
            _this.find(options.tabNav).on(options.eventType,function(){
                $(this).addClass(options.currentClass).siblings().removeClass(options.currentClass);
                var index = $(this).index();
                _this.find(options.tabContent).hide();
                _this.find(options.tabContent).eq(index).show();
            });
           
        })
        return this;//jQuery最强大的特性之一莫过于链式操作啦，此时如果你在$('.tab').tab()后面追加操作，你会发现无法实现，如下:
        //$('.tab').tab().find('.tab_nav>li').css('background','red');
        //但是当你return this把对象返回出去的时候你会发现又重新实现了~
    };

})(jQuery)