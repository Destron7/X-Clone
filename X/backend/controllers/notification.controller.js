import Notification from "../models/notification.models.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({ to: userId }).populate({
            path: "from",
            select: "username profileImg",
        });

        await Notification.updateMany({ to: userId }, { read: true });

        res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getNotifications function", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        await Notification.deleteMany({ to: userId });

        res.status(200).json({ message: "Notifications deleted successfully" });
    } catch (error) {
        console.log("Error in deleteNotifications function", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// MAKE API FOR DELETING SINGLE NOTIFICATION!!

export const deleteSingleNotification = async (req, res) => {
    try {
        const UserId = req.user._id;
        const NotificationId = req.params.id;

        console.log("NotificationId", NotificationId);

        const notification = await Notification.findById(NotificationId);

        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }

        if (notification.to.toString() !== UserId.toString()) {
            return res.status(401).json({ error: "You are not authorized to delete this notification" });
        }

        await Notification.findByIdAndDelete(NotificationId);
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        console.log("Error in deleteSingleNotification function", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}