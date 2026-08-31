const getDataUri = (file) => {
    if (!file) {
        throw new Error("File not received");
    }

    if (!file.buffer) {
        throw new Error("File buffer not received");
    }

    const extName = file.originalname
        .split(".")
        .pop()
        .toLowerCase();

    const mimeType = file.mimetype;

    const base64 = file.buffer.toString("base64");

    return {
        content: `data:${mimeType};base64,${base64}`,
        extName: extName,
    };
};

export default getDataUri;