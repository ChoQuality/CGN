class PaginationData {
    constructor(totalCount, contents) {
        this._totalCount = totalCount ?? null;
        this._contents = (contents ?? []).map(item => new Attachment(
            item.attachmentId,
            item.roomId,
            item.companyId,
            item.sendUserKey,
            item.sendUserName,
            item.originFileName,
            item.fileExtension,
            item.fileSize,
            item.deletedYn,
            item.savedFilePath,
            item.createDt
        ));
    }

    get totalCount() {
        return this._totalCount;
    }

    get contents() {
        return this._contents;
    }
}
