export const getPathStatusDeviceFirebase = (companyId, roomId, deviceId) => {
    return `${companyId}/${roomId}/statusDevice/${deviceId}/status`;
};
