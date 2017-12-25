var url = (function(){
    var mock = false;
    var prodEnv = require('./dev.env');
    var baseUrl = process.env.BASE_PATH + '/base';
    var url = process.env.API_ROOT + '/finance';
    console.log(url);
    if(mock) {
        return {
            MOCK: mock
        };
    }else{
        return {
            MOCK: mock,
            //common
            getOrgTree: baseUrl + '/web/office/allOfficeTree',
        }
    }
})();
module.exports = url;