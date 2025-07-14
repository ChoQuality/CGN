class CompanyOrgUser {
    constructor(org,user) {
        this._org = org
        this._user = user
        this._orgUserMap = this._setOrgUserMap(org, user);
    }


    get org() {
        return this._org;
    }

    get user() {
        return this._user;
    }

    get orgUserMap() {
        return this._orgUserMap;
    }

    _setOrgUserMap = (orgs,users) => {
        const tempMap = new Map();
        const funcRecursiveOrg = (org) => {
            const tempUserList = [];

            if (org.children && org.children.length > 0) {
                org.children.forEach(childOrg => {
                    funcRecursiveOrg(childOrg);
                });
            } else {
                if (org.groupId !== null) {
                    const usersInGroup = users.filter(user => user.orgKey === org.groupId);
                    tempUserList.push(...usersInGroup);
                    tempMap.set(org.groupId, tempUserList);
                }
            }
        }

        orgs.forEach(org => {
            funcRecursiveOrg(org);
        });

        return tempMap;

    }



}