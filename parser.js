function clear(x){
    var y=[]
    for(var i=0;i<x.length;i++){
        if(x[i]!=""){
            y.push(x[i]);
        }
    }

    return y;
}

parser={
    ver:"0.0.13",
    parser:[
        {
            name:"Codeforces", //oj name
            regex:`.*codeforces\.com\/problemset\/problem\/.*\/.*`, //check site
            getId:function(){ //the function for getting id. UID=oj name+"_"+id. If null is returned, the problem won't be considered valid
                var vs=location.href.split("/");
                for(var i=0;i<vs.length;i++){
                    if(vs[i]=="problem"){
                        return vs[i+1]+nqoa(vs[i+2]).toUpperCase()
                    }
                }

                return null
            },
            getTitle:function(){ //the function for getting title. Null for invalid problem.
                return document.getElementsByClassName("title")[0].innerText;
            }
        },
        {
            name:"Codeforces", //oj name
            regex:`.*codeforces\.com\/(contest|gym)\/.*\/problem\/.*`, //check site
            getId:function(){ //the function for getting id. UID=oj name+"_"+id. If null is returned, the problem won't be considered valid
                var vs=location.href.split("/");
                for(var i=0;i<vs.length;i++){
                    if(vs[i]=="contest" || vs[i]=="gym"){
                        return vs[i+1]+nqoa(vs[i+3]).toUpperCase()
                    }
                }

                return null
            },
            getTitle:function(){ //the function for getting title. Null for invalid problem.
                return document.getElementsByClassName("title")[0].innerText;
            }
        },
        {
            name:"Atcoder", //oj name
            regex:`.*atcoder\.jp\/contests\/.*\/tasks\/.*`, //check site
            getId:function(){ //the function for getting id. UID=oj name+"_"+id. If null is returned, the problem won't be considered valid
                var vs=location.href.split("/");
                for(var i=0;i<vs.length;i++){
                    if(vs[i]=="contests"){
                        return vs[i+1]+"-"+nqoa(vs[i+3])
                    }
                }

                return null
            },
            getTitle:function(){ //the function for getting title. Null for invalid problem.
                return document.getElementsByClassName("h2")[0].innerText;
            }
        },
        {
            name:"Atcoder", //oj name
            regex:`.*\.contest\.atcoder\.jp\/tasks\/.*`, //check site
            getId:function(){ //the function for getting id. UID=oj name+"_"+id. If null is returned, the problem won't be considered valid
                var vs=clear(location.href.split("/"));
                
                for(var i=0;i<vs.length;i++){
                    if(vs[i].includes("contest")){
                        return vs[i].split(".")[0]+"-"+nqoa(vs[i+2])
                    }
                }

                return null
            },
            getTitle:function(){ //the function for getting title. Null for invalid problem.
                return document.getElementsByTagName("h2")[0].innerText;
            }
        },
        {
            name:"HHSOJEssential", //oj name
            regex:`.*betaoj\.hellholestudios\.top\/HellOJ\/pview\.jsp\?.*`, //check site
            getId:function(){ //the function for getting id. UID=oj name+"_"+id. If null is returned, the problem won't be considered valid
                var vs=clear(location.href.split("/"));
                var vs2=vs[vs.length-1].split("?");
                var vs3=vs2[vs2.length-1].split("#");
                var vs4=vs3[0].split("&"); //"a=b" "c=d"

                var set=null,id=null;
                for(var i=0;i<vs4.length;i++){
                    if(vs4[i].split("=")[0]=="set"){
                        set=vs4[i].split("=")[1]
                    }
                    if(vs4[i].split("=")[0]=="id"){
                        id=vs4[i].split("=")[1]
                    }
                }

                return set+"-"+id
            },
            getTitle:function(){ //the function for getting title. Null for invalid problem.
                return document.getElementsByTagName("h1")[0].innerText;
            }
        },
        {
            name:"HHSOJ", //oj name
            regex:`.*oj\.hellholestudios\.top\/problem\.jsp\?.*id=.*`, //check site
            getId:function(){ //the function for getting id. UID=oj name+"_"+id. If null is returned, the problem won't be considered valid
                var vs=clear(location.href.split("/"));
                var vs2=vs[vs.length-1].split("?");
                var vs3=vs2[vs2.length-1].split("#");
                var vs4=vs3[0].split("&");

                var id=null;
                for(var i=0;i<vs4.length;i++){
                    if(vs4[i].split("=")[0]=="id"){
                        id=vs4[i].split("=")[1]
                    }
                }

                return id
            },
            getTitle:function(){ //the function for getting title. Null for invalid problem.
                return document.getElementsByTagName("h1")[1].innerText;
            }
        },
        {
            name:"Topcoder", //oj name
            regex:`.*community\.topcoder\.com\/stat\?.*c=problem_statement.*`, //check site
            getId:function(){ //the function for getting id. UID=oj name+"_"+id. If null is returned, the problem won't be considered valid
                var arr=document.getElementsByClassName("statTextBig")[0].innerText.split(" ")
                return arr[arr.length-1];
            },
            getTitle:function(){ //the function for getting title. Null for invalid problem.
                var arr=document.getElementsByClassName("statTextBig")[0].innerText.split(" ")
                return arr[arr.length-1];
            }
        },
        {
            name:"POJ", //oj name
            regex:`.*poj\.org\/problem.*`, //check site
            getId:function(){ //the function for getting id. UID=oj name+"_"+id. If null is returned, the problem won't be considered valid
                var x=location.href.split("?")
                var y=x[1].split("&");
                for(var i=0;i<y.length;i++){
                    if(y[i].startsWith("id=")){
                        return y[i].substr(3);
                    }
                }
            },

            getTitle:function(){ //the function for getting title. Null for invalid problem.
                return document.getElementsByClassName("ptt")[0].innerText;
            }
        },
        {
            name:"ZOJ", //oj name
            regex:`.*zoj\.pintia\.cn\/problem-sets\/.*\/problems\/.*`, //check site
            getId:function(){ //the function for getting id. UID=oj name+"_"+id. If null is returned, the problem won't be considered valid
                var x=clear(location.href.split("/"));
                return x[x.length-3]+"-"+x[x.length-1]
            },

            getTitle:function(){ //the function for getting title. Null for invalid problem.
                return document.getElementsByClassName("title_1gJgg")[0].innerText;
            }
        },
        {
            name:"Youtube", //oj name
            regex:`.*youtube\.com\/watch\?.*`, //check site
            getId:function(){ //the function for getting id. UID=oj name+"_"+id. If null is returned, the problem won't be considered valid
                var x=location.href.split("?")
                var y=x[1].split("&");
                for(var i=0;i<y.length;i++){
                    if(y[i].startsWith("v=")){
                        return y[i].substr(2);
                    }
                }
            },

            getTitle:function(){ //the function for getting title. Null for invalid problem.
                return document.getElementsByClassName("title")[0].innerText;
            }
        }
    ]
}