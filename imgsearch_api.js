let pagenr='1';
let d1='';
let d2='';
let data={};
let flag=0;
let z=0; // Declare z outside of love() function
const input = document.getElementById("word");

async function love(pagenr) {
    const word=document.getElementById('word')?.value;
    var d1 = "Pg "+pagenr+" / ";
    document.getElementById('demo1').innerHTML=d1;

    await fetch(`https://pixabay.com/api/?key=34529916-dc1e1dbf34d62a6ed243fc9ae&q=${word}&image_type=photo&pretty=true&page=${pagenr}`).then(function(response) {
        response.json().then((data) => {
            console.log(data);

            var x=data.totalHits;
            z = x/20; // Assign value to z
            if (Number.isInteger(z)==true) {
                document.getElementById('demo2').innerHTML=z;
            }
            else {
                document.getElementById('demo2').innerHTML=Math.ceil(z);
            }

            const gallery = document.getElementById('gallery');
            while (gallery.firstChild) {
                gallery.removeChild(gallery.firstChild);
            }   

            for (var i = 0; i < data.hits.length; i++) {
                var largeImageURL= data.hits[i].largeImageURL;
                const pic = document.createElement("div");
                var orglink = data.hits[i].pageURL;
                const img="<img src='"+largeImageURL+"'/>";
                document.getElementById('gallery').innerHTML+="<a href='"+orglink+"'>"+img+"</a>"   
            }
            flag=1;
        });
    });
}

function nextpg() {
    if (flag!=0) {    
        if (pagenr<z) {
            console.log(z);
            pagenr++;
            love(pagenr);
            var d1 = "Pg "+pagenr+" / ";
            document.getElementById('demo1').innerHTML=d1;
        }
        else {
						if (Number.isInteger(z)==true) {
							console.log(z)
							var lastpg='This is page'+pagenr+' / '+z;
							alert(lastpg)
						}
						else{
							z=Math.ceil(z)
							console.log(z)
							var lastpg='This is page'+pagenr+' / '+z;
							alert(lastpg)
						}
        }
    }
    else {
        alert('Enter a Word in the searchbar')
    }
}

function prevpg() {
    if (pagenr>1) {
        pagenr--;
        love(pagenr);
        var d1 = "Pg "+pagenr+" / ";
        document.getElementById('demo1').innerHTML=d1;
    }
    else if(flag==0) {
        alert('Enter a Word in the searchbar');
    }
    else {
    			if (Number.isInteger(z)==true) {
							console.log(z)
							var firstpg='This is page'+pagenr+' / '+z;
							alert(firstpg)
						}
						else{
							z=Math.ceil(z)
							console.log(z)
							var firstpg='This is page'+pagenr+' / '+z;
							alert(firstpg)
						}
    }
}

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("Btn1").click();
    }
});

$('.dark').click(function() {
    $('body').addClass('darkbody');
    $('.search').removeClass('lightnav');
    $('.search').addClass('darknav');
});

$('.light').click(function() {
    $('body').removeClass('darkbody');
    $('.search').removeClass('darknav');
    $('.search').addClass('lightnav');
});
