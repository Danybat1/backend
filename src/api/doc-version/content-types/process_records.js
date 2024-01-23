
// processes records control

class ProcessRecords {
    static fileProcesses = [];
    static docUpdates = [];

    static appendDocUpdates(docObj) {
        this.docUpdates = [...this.docUpdates, docObj];

        console.log("doc notifs processes ", [this.docUpdates]);
    }

    static appendFProcesses(versionObj) {
        this.fileProcesses = [...this.fileProcesses, versionObj];

        console.log("file versions processes data", [this.fileProcesses]);
    }
};

module.exports = {
    ProcessRecords
}