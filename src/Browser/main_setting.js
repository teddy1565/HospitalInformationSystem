let DashBoard = document.getElementById("DashBoard");
function RenderExteriorAttributes(){
    let displayAttributes = ["windowID","width","height"];
    let baseTemplate = `
    <table class="table text-nowrap table-striped text-center">
        <thead class="thead-dark">
            <tr id="topic">
                <th scope="col">#</th>
                <th scope="col">操作</th>
            </tr>
        </thead>
        <tbody id="WindowList" data-link="row">

        </tbody>
    </table>
    `;
    DashBoard.innerHTML = baseTemplate;
    for(let i in displayAttributes){
        document.getElementById("topic").innerHTML +=`<th scope="col">${displayAttributes[i]}</th>`;
    }
    let request = {
        requestFunc:"RenderExteriorAttributes",
        reqData:true
    }
    window.ipcRenderer.send("MainSettingWindowRequest",request);
}
window.ipcRenderer.receive("MainSettingWindowDashBoardManager",(args)=>{
    if(args.requestFunc=="RenderExteriorAttributes"){
        for(let i in args.data){
            document.getElementById("WindowList").innerHTML+=`
            <tr>
                <th scope="row">${i}</th>
                <td class="btn" id="operator_${args.data[i].ID==undefined?"PublicConfig":args.data[i].ID}">
                    <label>
                        <button type="button" class="btn btn-success" onclick="modifyExteriorAttributes('${args.data[i].ID==undefined?"PublicConfig":args.data[i].ID}')">修改</button>
                    </label>
                    <label>
                        <button type="button" class="btn btn-danger" onclick="deleteExteriorAttributes('${args.data[i].ID==undefined?"PublicConfig":args.data[i].ID}')">刪除</button>
                    </label>
                </td>
                <td id="ID_${args.data[i].ID==undefined?"PublicConfig":args.data[i].ID}">${args.data[i].ID==undefined?"PublicConfig":args.data[i].ID}</td>
                <td id="width_${args.data[i].ID==undefined?"PublicConfig":args.data[i].ID}">${args.data[i].width}</td>
                <td id="height_${args.data[i].ID==undefined?"PublicConfig":args.data[i].ID}">${args.data[i].height}</td>
            </tr>
            `;
        }
        document.getElementById("WindowList").innerHTML+=`
        <tr>
            <th scope="row"></th>
            <td class="btn">
                <label>
                    <button type="button" class="btn btn-warning">新增視窗外觀屬性</button>
                </label>
            </td>
            <td>===</td>
            <td>===</td>
            <td>===</td>
        </tr>
        `;
    }
});
function modifyExteriorAttributes(id){
    document.getElementById(`operator_${id}`).innerHTML=`
        <label>
            <button type="button" class="btn btn-warning" onclick="saveExteriorAttributes('${id}')">儲存</button>
        </label>
    `;
    let windowID = document.getElementById(`ID_${id}`).innerHTML;
    let width = document.getElementById(`width_${id}`).innerHTML;
    let height = document.getElementById(`height_${id}`).innerHTML;
    document.getElementById(`ID_${id}`).className="text";
    document.getElementById(`ID_${id}`).innerHTML=`
    <label>
        <input type="text" class="text" value="${windowID}">
    </label>
    `;
    document.getElementById(`width_${id}`).className="text";
    document.getElementById(`width_${id}`).innerHTML=`
    <label>
        <input type="text" class="text" value="${width}">
    </label>
    `;
    document.getElementById(`height_${id}`).className="text";
    document.getElementById(`height_${id}`).innerHTML=`
    <label>
        <input type="text" class="text" value="${height}">
    </label>
    `;
}
function deleteExteriorAttributes(id){

}
function SelectAllCheckBox(btnID){

}
function RenderIPCWhiteList(){
}
function RenderPreloadScript(){

}
function LocalHostDataBaseRole(){

}
function RemoteHostDataBaseRole(){

}
function CustomMenu(){

}