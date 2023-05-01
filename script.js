//Notları yükleme fonksiyonu
function load_notes(){
    $("#note-list").html("")

    $(JSON.parse(localStorage.getItem("notes"))).each(function(i, e){
        for (const obj of e.notes)
        {
            if(obj.isim != null)
                $("#note-list").html(`${$("#note-list").html()} <a href='#' id='note-name'>${obj.isim}</a>`)
        }
    })

    // Listeden Seçilen Görevi Ekrana Getirme
    $("a").on("click", function(){
        var text = this.innerText

        $(JSON.parse(localStorage.getItem("notes"))).each(function(i, e){
            for (const obj of e.notes)
            {
                if(text == obj.isim)
                {
                    $("input").val(obj.isim)
                    $("textarea").val(obj.icerik)
                }
            }
        })
    })
}

$(function(){
    /*
    Notların kayıt edileceği ögeyi oluşturur.
    Sadece ilk kullanımda çalışır.
    */
    if(!localStorage.getItem("notes"))
        localStorage.setItem("notes",JSON.stringify({notes: [{isim:null,icerik:null}]}))

    //Kayıtlı notları yükler
    load_notes()

    //Form Submit olayında sayfanın yenilenmesini engeller
    var form=document.getElementById("myForm");
    function submitForm(event){
        event.preventDefault();
    }

    //Notu Kaydetme
    $("#save-note").on("click", function(){
        var yeni_not = {isim:$("input").val(), icerik:$("textarea").val()}
        if(yeni_not.isim.trim() && yeni_not.icerik.trim())
        {
            /*
            Kontrol Değişkenine göre hareket eder.
            Kontrol değişkeni sıfır ise yeni not kaydediliyordur.
            Eğer kontrol değişkeni 0 değilse daha önce kayıt edilen notun index numarasını döndürür.
            */
            var kontrol = 0
            $(JSON.parse(localStorage.getItem("notes"))).each(function(i, e){
                for(const j in e.notes) 
                {
                    const obj = e.notes[j]
                    if(obj.isim == yeni_not.isim)
                    {
                        kontrol = j
                    }
                }
                if(kontrol != 0)
                {
                    this.notes[kontrol].icerik = $("textarea").val()
                    localStorage.setItem("notes",JSON.stringify(this))
                    $("#status").text("Not Güncellendi")
                }
                else
                {
                    this.notes.push(yeni_not)
                    localStorage.setItem("notes",JSON.stringify(this))
                    $("#status").text("Not Eklendi")
                }
            })
            $("input").val("")
            $("textarea").val("")
            load_notes()
        }
    })

    //Notu Silme İşlemi
    $("#delete-note").on("click", function(){

        //Not ismi ve içeriğini almak için kullanılır
        var yeni_not = {isim:$("input").val(), icerik:$("textarea").val()}
        if(yeni_not.isim.trim() && yeni_not.icerik.trim())
        {
            $(JSON.parse(localStorage.getItem("notes"))).each(function(i, e){
                for (const j in e.notes){
                    const obj = e.notes[j]
                    if(obj.icerik == $("textarea").val() && obj.isim == $("input").val())
                    {
                        e.notes.splice(j, 1)
                        localStorage.setItem("notes",JSON.stringify(e))
                        $("#status").text("Not Silindi")
                    }
                }
            })
            $("input").val("")
            $("textarea").val("")
            load_notes()
        }
    })


})

