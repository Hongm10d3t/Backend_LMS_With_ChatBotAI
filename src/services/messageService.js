const Course = require("../models/course");
const Message = require("../models/message");

const checkUserInCourse = async (courseId, userId) => {
    let course = await Course.findById(courseId).select("teacherIds studentIds");

    if (!course) {
        throw new Error("Lớp học không tồn tại");
    }

    let isTeacher = course.teacherIds.some(
        (item) => String(item) === String(userId)
    );

    let isStudent = course.studentIds.some(
        (item) => String(item) === String(userId)
    );

    if (!isTeacher && !isStudent) {
        throw new Error("Bạn không có quyền truy cập chat của lớp học này");
    }

    return course;
};

const getCourseMessagesService = async (courseId, userId, limit = 50) => {
    await checkUserInCourse(courseId, userId);

    let messages = await Message.find({ courseId })
        .populate("senderId", "code fullName role avatarUrl")
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();

    return messages.reverse();
};

const postCreateMessageService = async (data) => {
    await checkUserInCourse(data.courseId, data.senderId);

    if (data.type === "text" && !data.content?.trim()) {
        throw new Error("Nội dung tin nhắn không được để trống");
    }

    if (data.type === "image" && !data.imageUrl) {
        throw new Error("Thiếu ảnh gửi lên");
    }

    let message = await Message.create(data);

    let result = await Message.findById(message._id).populate(
        "senderId",
        "code fullName role avatarUrl"
    );

    return result;
};

module.exports = {
    getCourseMessagesService,
    postCreateMessageService,
};