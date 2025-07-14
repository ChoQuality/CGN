document.addEventListener("DOMContentLoaded", async function () {
    const userInfoElement = document.getElementById("user-info");
    const applicationElement=document.getElementById('app');
    try {

        window.commonApi = await new Promise((resolve, reject) => {
            try {
                resolve(new CommonApi());
            } catch (error) {
                reject("CommonApi 생성 오류");
            }
        });
        const awpInstance = await new Promise((resolve, reject) => {
            try {
                resolve(new AWP());
            } catch (error) {
                reject("AWP 생성 오류");
            }
        });

        await awpInstance.init(userInfoElement, TODO_VIEW_TYPE.REPORT_WEEKLY);
    } catch (error) {
        this._func.showToastModal("에러 발생:", error);
    }
});
