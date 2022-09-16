
function search(terms) {
    terms = terms.reduce((js, el) => {
        js[el.name] = el.value
        return js
    }, {})
    console.log(terms.title);
    $.post("/search", { st: terms.title }, (data) => {
        data = data.map((item) => buildlist(item))
        $("#listpreviews").html(data)
    })
    classchanges()
    preview("listpreviews", "formpreviews")


}
function preview(to, off) {
    
    $(`#${off}`).hide('fast')
    $(`#${to}`).show("fast")
}
function classchanges() {
    
    if ($("#listpreviews").is(":visible") && $("#formpreviews").is(":visible")) {
        $("#formpreviews:visible").hide()
    }

    if ($("#formpreviews").is(":visible") && $("#listpreviews").is(":visible")) {
        $("#listpreviews:visible").hide()
    }

    $(".addform").removeClass('addform').addClass('enlist').text("Show List")
    $(".enlist").removeClass('enlist').addClass('addform').text("Add New")

}
function buildlist(item) {
    return `<div class="card mb-2">
    <div class="row align-items-center">
        <div class="col-10">
            <div class="card mb-2" id="${item.isbn}">
                <div class="card-body">
                <div class="row p-1">
                <h6 id="title" >Title : ${item.title} </h6>
            </div>    
            <div class="row p-1">
                <span id="auth" >Author: ${item.authors} </span>
            </div>    
            <div class="row p-1">
                <span>ISBN : ${item.isbn} </span>
            </div>
                </div>
            </div>
        </div>
        <div class="col-2 text-right">
            <button data-isbn="${item.isbn}" data-type="${item.type}" class="btn remove_item btn-danger">Remove</button>
        </div>
    </div>
</div>`

}

function refeshlist(){
    $.get("/get_data",(data)=>{
        data = data.map((item)=>buildlist(item))
        $("#listpreviews").html(data)
    })
}
function add_book(form) {
    console.log(form);
    if(Boolean(form.title) && Boolean(form.author)){
        $.post("/add",form,(data) => {
            console.log("🚀 ~ file: helper.js ~ line 75 ~ $.post ~ data", data)
        })
    }
    
}
module.exports = {
    search, preview, classchanges, refeshlist,add_book
}