class CompanyOrg {
    constructor(data) {
        this.groupId = data.groupId
        this.text = data.text
        this.orgCd = data.orgCd
        this.upperOrgCd = data.upperOrgCd
        this.children = (data.children || []).map(child => new CompanyOrg(child));
    }
}