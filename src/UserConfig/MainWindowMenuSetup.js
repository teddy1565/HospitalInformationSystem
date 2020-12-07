function setup(MENU){
    MENU[1].submenu[1].submenu[0].click = ()=>{
        console.log(1);
    }
    return MENU;
}
exp = {
    setup:setup
}
module.exports = exp;