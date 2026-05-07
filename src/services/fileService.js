
const path = require("path");
const fs = require("fs");
const Material = require('../models/material');

// const uploadSingleFile = async (fileObject) => {
//     let uploadPath = path.resolve(__dirname, '../public/file/document')

//     let extName = path.extname(fileObject.name);
//     let baseName = path.basename(fileObject.name, extName);

//     let finalName = `${baseName}-${Date.now()}${extName}`;
//     let finalPath = `${uploadPath}/${finalName}`;
//     try {
//         await fileObject.mv(finalPath);
//         return {
//             status: 'success',
//             path: finalName,
//             error: null
//         }
//     } catch (err) {
//         console.log("check error:", err)
//         return {
//             status: 'failed',
//             path: null,
//             error: JSON.stringify(err)
//         }
//     }
// }
const uploadSingleFile = async (fileObject, folder = "file/document") => {
    let uploadPath = path.resolve(__dirname, `../public/${folder}`);

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    let extName = path.extname(fileObject.name);
    let baseName = path.basename(fileObject.name, extName);

    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = path.join(uploadPath, finalName);

    try {
        await fileObject.mv(finalPath);

        return {
            status: "success",

            // giữ tương thích với code cũ
            path: finalName,

            // thêm cho code mới
            filename: finalName,
            fullPath: finalPath,
            publicUrl: `/${folder}/${finalName}`.replace(/\\/g, "/"),

            error: null,
        };
    } catch (err) {
        console.log("check error:", err);
        return {
            status: "failed",
            path: null,
            filename: null,
            fullPath: null,
            publicUrl: null,
            error: JSON.stringify(err),
        };
    }
};

const uploadMultipleFiles = async (filesArr) => {
    try {
        let uploadPath = path.resolve(__dirname, '../public/images/upload');
        let resultArr = [];
        let countSuccess = 0;
        for (let i = 0; i < filesArr.length; i++) {
            let extName = path.extname(filesArr[i].name);
            let baseName = path.basename(filesArr[i].name, extName);

            let finalName = `${baseName}-${Date.now()}${extName}`;
            let finalPath = `${uploadPath}/${finalName}`;
            try {
                await filesArr[i].mv(finalPath);
                resultArr.push({
                    status: 'success',
                    path: finalName,
                    fileName: filesArr[i].name,
                    error: null
                })
                countSuccess++;
            } catch (err) {
                resultArr.push({
                    status: 'failed',
                    path: null,
                    fileName: filesArr[i].name,
                    error: JSON.stringify(err)
                })
            }
        }
        return {
            countSuccess: countSuccess,
            detail: resultArr
        }

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    uploadSingleFile, uploadMultipleFiles
}