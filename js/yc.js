/**
 * Created by zi on 2017/3/20.
 */
//这是我们的第一个封装函数库
function domReady(fn) {
    if(document.addEventListener){    //功能性检测==浏览器兼容
        //意味着你是现代浏览器
        document.addEventListener("DOMContentLoaded",fn,false);
    }else{
        var flag=false;

        //在IE里面，如果使用定义变量的形式定义函数，那么这个函数会立即执行
        var init=function () {
            if(!flag){
                fn();
                flag=true;
            }
        }
        //IE浏览器
        //严谨一点，并不是所有的网页都会触发onreadystatechange，因此我们要借助另外的一个事件
        //特点：DOM没有加载完毕之前，你去调用滚动条会报错

        //捕获异常（错误），我知道这一段代码可能会报错，但是又不想它影响程序的运行
        (function(){
            try{
                document.documentElement.doscroll("left");
            }catch(e){  //报错信息都存在这个e里面
                //如果报错，就会到这里来，不会终止程序的运行
                //再来一次，利用延迟
                setTimeout(arguments.callee,50);    //重新运行自己所在的函数
                //注意return
                return;
            }
            init();
        })();

        //DOM加载是有过程的，每次过程的改变都会触发这个函数
        //有四个步骤 最后一步是complete完成
        //现在这个document.readyState=="complete" 和Window.onload没区别了
        /*document.onreadystatechange=function () {
            if(document.readyState=="complete"){
                init();
            }
         }*/
    }
}

//$ 获取标签
function $(str){
    var element;
    //以#开头
    if(str.indexOf("#")==0){
        element=document.getElementById( str.substring(1) );
    }else if(str.indexOf(".")==0){
        element=document.getElementsByClassName( str.substring(1) );
    }else{
        //先暂留，后面再解决
        element=document.getElementsByTagName( str );
    }
}

//获取外部样式封装
function getStyle(obj,attr){
    if(obj.currentStyle){
        //IE
        return obj.currentStyle[attr];
    }else{
        //firefox goole
        return getComputedStyle(obj,false)[attr];
    }
}

//向下取非空格节点
function get_next(n){
    var x=n.nextSibling;
    while( x.nodeType!=1 ){
        x=x.nextSibling;
    }
    return x;
}
//向上取非空格节点
function get_pre(n){
    x=n.previousSibling;
    while(x.nodeType!=1){
        x=x.previousSibling;
    }
    return x;
}

//封装事件相关的方法和属性
var eventUtil={
    //添加事件
    addEvent:function (element,type,fn) {
        if(element.addEventListener){
            //兼容支持addEventListener这个方法的浏览器
            element.addEventListener(type,fn,false);
        }else if(element.attachEvent){
            //兼容IE浏览器
            element.attachEvent("on"+type,fn);
        }else{
            //兼容低版本浏览器，因为低版本浏览器只支持xxx.onclick=xx;
            element["on"+type]=fn;
        }
    },
    //删除事件
    removeEvent:function (element,type,fn) {
        if(element.removeEventListener){
            //兼容支持addEventListener这个方法的浏览器
            element.removeEventListener(type,fn,false);
        }else if(element.detachEvent){
            //兼容IE浏览器
            element.detachEvent("on"+type,fn);
        }else{
            //兼容低版本浏览器，因为低版本浏览器只支持xxx.onclick=xx;
            element["on"+type]=null;
        }
    },
    //阻止事件冒泡
    stopPro:function (event) {
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            //兼容IE
            event.cancelBubble=true;
        }
    },
    //组织浏览器的默认行为
    stopDefault:function (event) {
        if(event.preventDefault){
            event.preventDefault();
        }else{
            //兼容IE
            event.returnValue=false;
        }
    },
    //可以获取到触发这个时间的元素
    getElement:function (event) {
                //w3c            ie
        return event.target || event.srcElement;
    }
}

















