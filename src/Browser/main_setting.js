/**
 * this script just for main_setting dashboard,
 * so i declare a global variable make it easy to use
 * 此腳本檔案專為main_setting dashboard使用 所以宣告一個全局變數
 * 比較方便使用
 */
let DashBoard = document.getElementById("DashBoard");

/**
 * 渲染器外觀屬性調整處理區
 */
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
            <td class="btn" id="addNewREA">
                <label>
                    <button type="button" class="btn btn-warning" onclick="addNewRenderExteriorAttributes()">新增視窗外觀屬性</button>
                </label>
            </td>
            <td id="addNewREAID">===</td>
            <td id="addNewREAwidth">===</td>
            <td id="addNweREAheight">===</td>
        </tr>
        `;
    }else if(args.requestFunc=="saveExteriorAttributes"){
        if(args.data==false){
            document.getElementById("Message").innerHTML=`
                <div class="row bg-danger justify-content-center">
                    <div class="alert alert-danger alert-dismissible">
                        <button type="button" class="close" data-dismiss="alert" onclick="TempMessage()">&times;</button>
                        <strong>失敗!</strong> 請重新確認輸入的資料。
                    </div>
                    <script>
                        function TempMessage(){
                            document.getElementById("Message").innerHTML="";
                        }
                    </script>
                </div>
            `;
        }
        document.getElementById(`ID_${args.data.UID}`).className="";
        document.getElementById(`ID_${args.data.UID}`).innerHTML=`${args.data.ID}`;
        document.getElementById(`ID_${args.data.UID}`).id = `ID_${args.data.ID}`;
        document.getElementById(`width_${args.data.UID}`).className="";
        document.getElementById(`width_${args.data.UID}`).innerHTML=`${args.data.width}`;
        document.getElementById(`width_${args.data.UID}`).id=`width_${args.data.ID}`;
        document.getElementById(`height_${args.data.UID}`).className="";
        document.getElementById(`height_${args.data.UID}`).innerHTML=`${args.data.height}`;
        document.getElementById(`height_${args.data.UID}`).id=`height_${args.data.ID}`;
        document.getElementById(`operator_${args.data.UID}`).innerHTML = `
        <label>
            <button type="button" class="btn btn-success" onclick="modifyExteriorAttributes('${args.data.ID}')">修改</button>
        </label>
        <label>
            <button type="button" class="btn btn-danger" onclick="deleteExteriorAttributes('${args.data.ID}')">刪除</button>
        </label>
        `;
        document.getElementById("Message").innerHTML=`
        <div class="alert alert-success alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" onclick="TempMessage()">&times;</button>
            <strong>修改成功!</strong>
        </div>
        <script>
            function TempMessage(){
                document.getElementById("Message").innerHTML="";
            }
        </script>
        `;
    }else if(args.requestFunc=="deleteExteriorAttributes"){
        if(args.data!=true){
                document.getElementById("Message").innerHTML=`
            <div class="alert alert-danger alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" onclick="TempMessage()">&times;</button>
                <strong>刪除進程出現錯誤!</strong>
            </div>
            <script>
                function TempMessage(){
                    document.getElementById("Message").innerHTML="";
                }
            </script>
            `;
        }
        RenderExteriorAttributes();
    }else if(args.requestFunc=="ErrorMessage"){
        document.getElementById("Message").innerHTML=`
        <div class="alert alert-danger alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" onclick="TempMessage()">&times;</button>
            <strong>${args.Context}!</strong>出現錯誤請重新確認!
        </div>
        <script>
            function TempMessage(){
                document.getElementById("Message").innerHTML="";
            }
        </script>
        `;
    }else if(args.requestFunc=="addNewRenderExteriorAttributes"){
        if(args.result!=true){
            document.getElementById("Message").innerHTML=`
            <div class="alert alert-danger alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" onclick="TempMessage()">&times;</button>
                <strong>傳輸過程出現錯誤!</strong>請重新確認!
            </div>
            <script>
                function TempMessage(){
                    document.getElementById("Message").innerHTML="";
                }
            </script>
            `;
        }
        RenderExteriorAttributes();
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
        <input type="text" class="text" id="NewWindowID" value="${windowID}">
        <input type="hidden" value="${windowID}" id="OLDwindowID">
    </label>
    `;
    document.getElementById(`width_${id}`).className="text";
    document.getElementById(`width_${id}`).innerHTML=`
    <label>
        <input type="text" class="text" id="NewWindowWidth" value="${width}">
    </label>
    `;
    document.getElementById(`height_${id}`).className="text";
    document.getElementById(`height_${id}`).innerHTML=`
    <label>
        <input type="text" class="text" id="NewWindowHeight" value="${height}">
    </label>
    `;
}

function deleteExteriorAttributes(id){
    if(document.getElementById(`ID_${id}`).innerHTML=="PublicConfig"){
        document.getElementById("Message").innerHTML=`
        <div class="alert alert-danger alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" onclick="TempMessage()">&times;</button>
            <strong>此屬性不可刪除!</strong>
        </div>
        <script>
            function TempMessage(){
                document.getElementById("Message").innerHTML="";
            }
        </script>
        `;
        return 0;
    }

    let request={
        requestFunc:"deleteExteriorAttributes",
        ID:`${document.getElementById(`ID_${id}`).innerHTML}`
    }
    window.ipcRenderer.send("MainSettingWindowRequest",request);
}
function saveExteriorAttributes(id){
    let oldWindowID = document.getElementById("OLDwindowID").value;
    let newWindowID = document.getElementById("NewWindowID").value;
    let width = document.getElementById("NewWindowWidth").value;
    let height = document.getElementById("NewWindowHeight").value;
    if(oldWindowID=="PublicConfig"&&newWindowID!=oldWindowID){
        document.getElementById("NewWindowID").disabled=true;
        document.getElementById("NewWindowWidth").disabled=true;
        document.getElementById("NewWindowHeight").disabled=true;
        document.getElementById(`operator_${id}`).innerHTML = `
            <label>
                <button type="button" class="btn btn-danger" onclick="InputValid('${id}')">PublicConfig無法更改ID(點我重新修正)</button>
            </label>
        `;
        return 0;
    }
    if(width.match(/[A-Z]+|[a-z]+/)!=null||height.match(/[A-Z]+|[a-z]+/)!=null){
        document.getElementById("NewWindowID").disabled=true;
        document.getElementById("NewWindowWidth").disabled=true;
        document.getElementById("NewWindowHeight").disabled=true;
        document.getElementById(`operator_${id}`).innerHTML = `
            <label>
                <button type="button" class="btn btn-danger" onclick="InputValid('${id}')">請勿在ID以外的輸入框輸入數字以外的字元(點我重新修正)</button>
            </label>
        `;
        return 0;
    }
    let request = {
        requestFunc:"saveExteriorAttributes",
        reqData:{
            ID:id,
            oldWindowID:oldWindowID,
            newWindowID:newWindowID,
            width:width,
            height:height
        }
    }
    window.ipcRenderer.send("MainSettingWindowRequest",request);
}
function InputValid(id){
    document.getElementById("NewWindowID").disabled=false;
    document.getElementById("NewWindowWidth").disabled=false;
    document.getElementById("NewWindowHeight").disabled=false;
    document.getElementById(`operator_${id}`).innerHTML=`
        <label>
            <button type="button" class="btn btn-warning" onclick="saveExteriorAttributes('${id}')">儲存</button>
        </label>
    `;
}
function addNewRenderExteriorAttributes(){
    let id = document.getElementById("addNewREAID");
    let width = document.getElementById("addNewREAwidth");
    let height = document.getElementById("addNweREAheight");
    id.className="text";
    id.innerHTML=`
    <label>
        <input type="text" class="text" id="NewREAID" placeholder="ID">
    </label>
    `;
    width.className="text";
    width.innerHTML=`
    <label>
        <input type="text" class="text" id="NewREAwidth" placeholder="width">
    </label>
    `;
    height.className="text";
    height.innerHTML=`
    <label>
        <input type="text" class="text" id="NewREAwidth" placeholder="height">
    </label>
    `;
    document.getElementById("addNewREA").innerHTML=`
        <label>
            <button type="button" class="btn btn-success" onclick="addNewRECSave()">儲存</button>
            <button type="button" class="btn btn-danger" onclick="RenderExteriorAttributes()">取消</button>
        </label>
    `;
}
function addNewRECSave(){
    let request={
        requestFunc:"addNewRenderExteriorAttributes",
        ID:`${document.getElementById("NewREAID").value}`,
        width:`${document.getElementById("NewREAwidth").value}`,
        height:`${document.getElementById("NewREAwidth").value}`
    };
    window.ipcRenderer.send("MainSettingWindowRequest",request);
}
//================================================================================
/**
 * 渲染器IPC通訊白名單列表
 * 基於安全性因素只有在白名單上的channel才能夠通訊
 */
function RenderIPCWhiteList(){
}

function LocalHostDataBaseRole(){

}
function RemoteHostDataBaseRole(){

}
function CustomMenu(){

}