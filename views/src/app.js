
import { search, add_book, refeshlist, preview, classchanges } from './helper'
$(function () {
    preview("listpreviews", "formpreviews")
    $('form#search').on("submit", (e) => {
        e.preventDefault();
        let form = $('form#search').serializeArray()
        search(form)
        $('form#search').trigger("reset");
    })
    $('form#add').on("submit", (e) => {
        e.preventDefault();
        let form = $('form#add').serializeArray();
        form = form.reduce((js, el) => {
            js[el.name] = el.value
            return js
        }, {})
        
        add_book(form)
        $('form#add').trigger("reset");
    })
    $(document).on("click", ".remove_item", (e) => {

        $.post(`/delete/${$(e.target).data('type')}`, {"isbn": $(e.target).data('isbn')}, (data) => {
            console.log("🚀 ~ file: app.js ~ line 26 ~ $.put ~ data", data)
            refeshlist()
        })
    })
    $(".addform,.enlist").on("click", (e) => {
        refeshlist()
        $(e.target).hasClass('addform') ?
            $(e.target).removeClass('addform').addClass('enlist').text("Show List") && preview("formpreviews", "listpreviews") :
            $(e.target).removeClass('enlist').addClass('addform').text("Add New") && preview("listpreviews", "formpreviews")
    })
})




