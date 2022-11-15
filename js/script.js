var massTel = []
massTel[0] = {name: "Иванов Петр", phone:"8(916)283-4920", like:false}
massTel[1] = {name: "Романова Оксана", phone:"8(837)475-8849", like:false}
massTel[2] = {name: "Буранов Алексей", phone:"8(916)893-8338", like:false}
//--------
addPhone = false;
//======================
function sortTel()
{
    massTel.sort((x, y) => x.name.localeCompare(y.name));
}
//======================
function loadTel()
{
    sortTel();
    let str = "";
    massTel.forEach(function(e,index) {if(e.like) str += getTel(e,index)});
    massTel.forEach(function(e,index) {if(!e.like) str += getTel(e,index)});
    $("#content").html(str);
}
//======================
function getTel(e,index)
{
    let str = `<table width="100%"><tr><td rowspan="2"><img src="img/user.png" width="32px"></td>
    <td style="width:80%;">${e.name}</td>
    <td><img src="img/${(e.like) ? 'heartOn.png' : 'heartOff.png'}" onclick="likeTel(${index})" width="12px"/></td>
    </tr><tr>
    <td style="width:80%;">${e.phone}</td>
    <td><img src="img/del.png" onclick="delTel(${index})" width="12px"/></td></tr></table>`;
    
    return str;
}
//======================
function searchTel(ev)
{
    let s = ev.value;
    let str = "";
    massTel.forEach(function(e,index) {if(((e.name.indexOf(s) != -1) || (e.phone.indexOf(s) != -1)) & (e.like)) str += getTel(e,index)});
    massTel.forEach(function(e,index) {if(((e.name.indexOf(s) != -1) || (e.phone.indexOf(s) != -1)) & (!e.like)) str += getTel(e,index)});
    $("#content").html(str);
}
//======================
function delTel(index) 
{
    delete massTel[index];
    loadTel();
}
//======================
function likeTel(index)
{
    if (massTel[index].like) {massTel[index].like = false}
    else {massTel[index].like = true}
    loadTel();
}
//======================
function addTel()
{
    if (!addPhone)
    {
        $(`#command`).html("Создать");
        addPhone = true;
        //---------------
        let str = ` <label for="name">Фамилия и Имя:</label><br>
                    <input type="text" id="name" style="width:80%"/><br><br>
                    <label for="phone">Телефон:</label><br>
                    <input type="text" id="phone" style="width:80%"/><br><br>
                    <input type="checkbox" id="like" />
                    <label for="like">Избранное</label>`;
        //----------------
        $("#content").html(str);
        $("#phone").mask("8(999)999-9999");            
    }
    else 
    {
        let nm = $("#name").val().trim();
        let ph = $("#phone").val().trim();
        //-------------------
        if ((nm.length > 0) & (ph.length > 0)) 
        {
            let obj = {};
            obj.name = nm;
            obj.phone = ph;

            if(document.getElementById('like').checked) {obj.like = true}
            else {obj.like = false}
            massTel.push(obj);
            //---------
            loadTel();
            $(`#command`).html("Добавить");
            addPhone = false;
        }
        //-------------------
        else {alert("Неправильные данные!");}
    }
}
//======================
loadTel();