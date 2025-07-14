class PortletFunc {
    constructor(companyOrgs) {
        this._companyOrgs = companyOrgs;
        this._parseData = (serverData)  => {
            try {
                const parsed = JSON.parse(serverData);
                if (parsed.code === undefined || parsed.code === null) {
                    throw new Error("code 값이 없습니다.");
                }
                if (parsed.code !== 0) {
                    throw new Error(`서버 오류 발생: code=${parsed.code}`);
                }
                return parsed.data;
            } catch (error) {
                console.error("JSON 파싱 오류:", error);
                return error;
            }
        }
        this._makeLoginInfo = (dataset) => {
            return new LoginInfo(
                dataset.awpCorpId
                ,dataset.awpOrgKey
                ,dataset.awpOrgName
                ,dataset.awpUserKey
                ,dataset.awpUserName
                ,dataset.awpUserImage
                ,dataset.awpSelectedDb
                ,dataset.awpToken
            );};
    }

    get parseData(){
        return this._parseData;
    }

    get makeLoginInfo(){
        return this._makeLoginInfo;
    }
    get companyOrgs() {
        return this._companyOrgs;
    }
}