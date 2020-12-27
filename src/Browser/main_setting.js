let DashBoard = document.getElementById("DashBoard");
function RenderExteriorAttributes(){
    let displayAttributes = ["windowID","width","height"];
    let baseTemplate = `
    <table class="table text-nowrap table-striped text-center">
        <thead class="thead-dark">
            <tr id="topic">
                <th scope="col">#</th>
                <th class="bs-checkbox" data-field="state">
                    <label>
                        <input type="checkbox" id="SelectAllCheckBox" onclick="SelectAllCheckBox()">
                    </label>
                </th>
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
                <td class="bs-checkbox">
                    <label>
                        <input data-index="${i}" id="RenderExteriorAttributesCheckBoxItem" name="btSelectItem" type="checkbox" value="0">
                    </label>
                </td>
                <td>${args.data[i].ID==undefined?"PublicConfig":args.data[i].ID}</td>
                <td>${args.data[i].width}</td>
                <td>${args.data[i].height}</td>
            </tr>
            `;
        }
    }
});
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