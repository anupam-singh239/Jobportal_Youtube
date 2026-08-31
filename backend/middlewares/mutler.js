import multer from "multer";

// =====================================================
// MEMORY STORAGE
// =====================================================

const storage = multer.memoryStorage();


// =====================================================
// COMPANY LOGO UPLOAD
// ONLY IMAGE
// =====================================================

const companyLogoUploader = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },

    fileFilter: (req, file, cb) => {

        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Only image files are allowed for company logo"
                ),
                false
            );
        }

    },
});


// =====================================================
// RESUME UPLOAD
// PDF / DOC / DOCX
// =====================================================

const resumeUploader = multer({
    storage,

    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },

    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (allowedTypes.includes(file.mimetype)) {

            cb(null, true);

        } else {

            cb(
                new Error(
                    "Only PDF, DOC and DOCX files are allowed for resume"
                ),
                false
            );

        }

    },
});


// =====================================================
// EXPORTS
// =====================================================

// Company logo
export const singleUpload =
    companyLogoUploader.single("file");

// Resume
export const resumeUpload =
    resumeUploader.single("file");