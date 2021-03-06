class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

let category = new Category();

$("#btnCreate").on("click", function () {
    create();
})

$("#btnUpdate").on("click", function () {
    update();
})

function handleDelete() {
    $("table tbody tr").on("click", ".delete", function () {
        let id = $(this).data("id");

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    headers: {
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    url: "/api/category/delete/" + id,
                    type: "GET"
                }).done(function (resp) {

                    console.log(resp)

                    if (resp === true) {

                        $("#tr_" + id).remove();

                        Swal.fire(
                            'Deleted!',
                            'This category has been deleted.',
                            'success'
                        )
                    } else {
                        alert("UnSuccess deleted")
                    }

                }).fail(function () {
                    alert("UnSuccess deleted 2")
                });

            }
        })

    });
}

function handleEdit() {
    $("table tbody tr").on("click", ".edit", function () {
        let id = $(this).data("id");
        $("#updateModal").modal("show");
        console.log("id = " + id);


        $.ajax({
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            url: "/api/category/" + id,
            type: "GET"
        }).done(function (resp) {
            $("#idE").val(resp.id);
            $("#nameE").val(resp.name);
        }).fail(function () {
            alert("ERROR")
        });
    })
}

function create() {
    category.id = $("#id").val();
    category.name=$("#name").val()

    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "/api/category/create",
        type: "POST",
        data: JSON.stringify(category)

    }).done(function (resp) {

        let str = '';

        str = `
                    <tr id="tr_${resp.id}">
                            <th scope="row">${resp.id}</th>
                            <td>${resp.name}</td>
                            <td>
                                <button type="button" data-toggle="modal" data-target="#updateModal" class="btn btn-outline-primary edit"
                                    data-id="${resp.id}"
                                >
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-outline-danger delete" data-id="${resp.id}">
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    Delete
                                </button>
                            </td>

                        </tr>
                `;

        $("#tbList").prepend(str);


        handleEdit();

        handleDelete();

    }).fail(function () {
        alert("ERROR")
    });
}

function update() {

    category.id = $("#idE").val();
    category.name = $("#nameE").val();

    $.ajax({
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        url: "/api/category/update",
        type: "POST",
        data: JSON.stringify(category)
    }).done(function (resp) {

        let str = '';

        str = `
                    <tr id="tr_${resp.id}">
                        <th scope="row">${resp.id}</th>
                        <td>${resp.name}</td>
                        <td>
                            <button type="button" data-toggle="modal" data-target="#updateModal" class="btn btn-outline-primary edit"
                                data-id="${resp.id}"
                            >
                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                Edit
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger delete" data-id="${resp.id}">
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
        $("#tr_"+ category.id).replaceWith(str);
        $("#updateModal").modal("hide");

        handleEdit();

        handleDelete();

    }).fail(function () {
        alert("ERROR")
    });
}

function getAllCategory() {
    return $.ajax({
        url: "/api/category",
        type: "GET"
    }).done(function (resp) {

        let str = '';

        $.each(resp, function(index, item) {
            str = `
                    <tr id="tr_${item.id}">
                        <th scope="row">${item.id}</th>
                        <td>${item.name}</td>
                        <td>
                            <button type="button" data-toggle="modal" data-target="#updateModal" class="btn btn-outline-primary edit"
                                data-id="${item.id}"
                            >
                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                Edit
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger delete" data-id="${item.id}">
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            $("#tbList").prepend(str);
        })

        handleEdit();

        handleDelete();
    }).fail(function () {
        alert("ERROR")
    });
}

init = function () {
    getAllCategory();
}

<!--    template-->
$(document).ready(function () {
    $('#af-preloader').delay(500).fadeOut('slow')
    init();
});