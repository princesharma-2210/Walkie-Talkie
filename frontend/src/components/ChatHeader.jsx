import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { MdMissedVideoCall } from "react-icons/md";
const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
  {/* Audio Call */}
  <MdOutlineWifiCalling3
    className="text-2xl text-primary cursor-pointer hover:scale-110 transition-transform"
    onClick={() => console.log("Initiate call")}
  />

  {/* Video Call */}
  <MdMissedVideoCall
    className="text-2xl text-primary cursor-pointer hover:scale-110 transition-transform"
    onClick={() => console.log("Initiate video call")}
  />

  {/* Close button */}
  <button
    onClick={() => setSelectedUser(null)}
    className="p-2 rounded-full hover:bg-base-200 transition"
  >
    <X className="text-2xl" />
  </button>
</div>

      </div>
    </div>
  );
};
export default ChatHeader;