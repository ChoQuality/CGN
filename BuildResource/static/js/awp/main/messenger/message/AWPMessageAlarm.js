class AWPMessageAlarm{

    constructor(loginInfo,index,alarm,previousMessageAlarm) {
        this._loginInfo = loginInfo
        this._index = index
        this._alarm = alarm
        this._previousMessageAlarm = previousMessageAlarm
    }
    get index() {
        return this._index;
    }
    get alarm() {
        return this._alarm;
    }
    get previousMessageAlarm() {
        return this._previousMessageAlarm;
    }

    set previousMessageAlarm(value) {
        this._previousMessageAlarm = value;
    }

    get isSameDate(){
        const dt = this.alarm.createDtFormatted;
        const dateOnly =dt.split(" ")[0];
        return document.getElementById(dateOnly) != null;
    }

    get isSameCreateDt(){
        return this.alarm.createDt === this.previousMessageAlarm.alarm.createDt;
    }
    get isSameUser(){
        return Number(this.alarm.sendUserKey) === Number(this.previousMessageAlarm.alarm.sendUserKey);
    }
    get isMine(){
        return Number(this.alarm.sendUserKey) === Number(this._loginInfo.userKey);
    }
}
