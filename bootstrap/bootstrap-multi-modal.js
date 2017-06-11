/**
* Bootstrap modal 引入即可 支持 同时打开多个模态框 
**/
(function ($, dcm) {
    function Modal() {
        this.shows = [];
    }
    var modal = new Modal();
    $(dcm).on("shown.bs.modal", ".modal", function (e) {
        if ($.inArray(e.target, modal.shows) < 0) {
            if (modal.shows.length > 0) {
                var pmodal = $(modal.shows[modal.shows.length - 1]);
                var zid = parseInt(pmodal.css("z-index"));
                pmodal.append($(".modal-backdrop:last").css("z-index", zid + 1));
                $(e.target).css("z-index", zid + 2);
            }
            modal.shows.push(e.target);
            $(e.target).undelegate().delegate('[data-dismiss="modal"]', 'click.dismiss.modal', function () {
                $(this).closest(".modal").modal("hide");
            });
        }
    });
    $(dcm).on("show.bs.modal", ".modal", function (e) {
        if ($.inArray(e.target, modal.shows) < 0) {
            if (modal.shows.length > 0) {
                var $md = $(modal.shows[modal.shows.length - 1]);
                if(!$.contains($md[0], e.target)){// if contains ignor ,else insert otherwise will Infinite loop!
                    $(modal.shows[modal.shows.length - 1]).append(e.target);
                }
            }
        }
    });
    $(dcm).on("hidden.bs.modal", ".modal", function (e) {
        if ($.inArray(e.target, modal.shows) >= 0) {
            modal.shows.pop();
        }
    });
})(jQuery, document);
