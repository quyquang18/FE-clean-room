const buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
        if (type === 'room') {
            inputData.map((item, index) => {
                let object = {};
                object.value = item.id;
                object.label = item.name;
                result.push(object);
                return true;
            });
        }
        if (type === 'device') {
            inputData.map((item, index) => {
                let object = {};
                object.value = item.id;
                object.label = item.deviceName;
                result.push(object);
                return true;
            });
        }
        return result;
    }
};
export { buildDataInputSelect };
