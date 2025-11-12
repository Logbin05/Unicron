import { Notification } from "./notification";
import { AnimatePresence, motion } from "framer-motion";
import { useNotificationStore } from "@store/notification";

export function NotificationContainer() {
  const notification = useNotificationStore((state) => state.notification);

  return (
    <>
      <div className="fixed bottom-4 xs:right-0 sm:right-4 flex flex-col gap-2 z-50">
        <AnimatePresence>
          {notification.map((n) => (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Notification key={n.notification_id} {...n} />
              </motion.div>
            </>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
