
function game(boxSize,num,jilv){
    this.boxSize=boxSize||600;
    this.box;
    this.num=num||5;
    this.sboxArr=[];
    this.leiArr=[];
    this.jilv=jilv||0.1;
    this.pauseBox;
    this.t;
    this.nowTime=0;
}
game.prototype={
    play:function(){
        this.makeBox();
        this.makeSbox();
        this.downboom();
        this.clickStuff();
        this.gameTime();
        this.makePauseBox();
    },
    makeBox:function(){
        this.box=$("<div>");
        this.box.css({
            width:this.boxSize,
            height:this.boxSize,
            border:"1px solid blue",
            position:"relative"
        }).appendTo($("body"));
    },
    makeSbox:function(){
        for(var i=0;i<(this.num*this.num);i++){
            var random1=parseInt(Math.random()*255);
            var random2=parseInt(Math.random()*255);
            var random3=parseInt(Math.random()*255);
            var color="rgb("+random1+","+random2+","+random3+")"
            var divs=$("<div>").css({
                width:(this.boxSize/this.num),
                height:(this.boxSize/this.num),
                background:color,
                float:"left",
                opacity:0,
                animation:"divs 0.3s ease "+(i*0.05)+"s 1 forwards"
            }).appendTo(this.box);
            this.sboxArr.push(divs);
        }
    },
    downboom:function(){
        var arr1=[];
        //确定哪些是有雷的
        for(var i=0;i<(this.num*this.num);i++){
            var random=Math.random();
            if(random>this.jilv){
                arr1.push(0)
            }else{
                arr1.push(-1)
            }
        }

        //是为了判断周围的雷数，模拟扫雷界面排列
        var arr2=[];
        for(var i=0;i<this.num;i++){
            arr2[i]=[];
            for(var j=0;j<this.num;j++){
                var m=(i*this.num)+j;
                arr2[i][j]=arr1[m]
            }
        }

        //为了计算每一个没有雷的地方的数
        var lei=[];
        for(var i=0;i<this.num;i++){
            lei[i]=[];
            for(var j=0;j<this.num;j++){
                if(arr2[i][j]==-1){
                    lei[i][j]="lei";
                }else{
                    var onum=this.num-1;
                    var d1=j<onum?arr2[i][j+1]:0;
                    var d2=j>0?arr2[i][j-1]:0;
                    var d3=i>0?arr2[i-1][j]:0;
                    var d4=i<onum?arr2[i+1][j]:0;
                    var d5=(i>0&&j<onum)?arr2[i-1][j+1]:0;
                    var d6=(i<onum&&j<onum)?arr2[i+1][j+1]:0;
                    var d7=(i>0&&j>0)?arr2[i-1][j-1]:0;
                    var d8=(i<onum&&j>0)?arr2[i+1][j-1]:0;
                    lei[i][j]=Math.abs(d1+d2+d3+d4+d5+d6+d7+d8);
                }
            }
        }

        //是为了给div赋值比较方便
        var olei=[];
        for(var i=0;i<this.num;i++){
            for(var j=0;j<this.num;j++){
                olei.push(lei[i][j]);
            }
        }
		console.log(lei)
        //是为了避免用户作弊
        for(var i=0;i<olei.length;i++){
            this.leiArr[i]=olei[i];
        }
        

    },
    clickStuff:function(){
		
        var that=this;
        $(this.sboxArr).each(function(i){
            var index=i;
            this.click(function(){

                var lei=that.leiArr[index];
                if(lei=="lei"){
                    var yes=confirm("是不是要重来");
                    if(yes){
                        that.restart();
                    }else{
                        $("body").html("你妈让你回家吃饭！！！");

                    }
                }else{
                    $(this).html(lei)
                }
            })
        })
    },
    restart:function(){
        this.box.remove();
        this.sboxArr=[];
        this.leiArr=[];
        this.play();
    },
    gameTime:function(){
        var time=this.nowTime;
        $("#time").html(time);
        var that=this;
        this.t =setInterval(function(){
            time++;
           $("#time").html(time);
            that.nowTime=time;
        },1000)
    },
    makePauseBox:function(){
        this.pauseBox=$("<div>").css({
            width:this.boxSize,
            height:this.boxSize,
            position:"absolute",
            top:0,
            zIndex:1000,
            display:"none"
        }).appendTo(this.box)
    },
    pause:function(){
        $(this.pauseBox).show()
        clearInterval(this.t);

    },
    continue:function(){
        $(this.pauseBox).hide();
        this.gameTime();
    }
}


var game=new game();
game.num=20;

var gameFlag=true;
$("#start").click(function(){
    if(gameFlag){
        game.play();
        this.value="暂停游戏";
        gameFlag=false;
    }else{
        if(this.value=="暂停游戏"){
            this.value="继续游戏";
            game.pause();
        }else{
            this.value="暂停游戏";
            game.continue();
        }
    }
})

