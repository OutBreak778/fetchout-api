import { SettingsIcon } from "lucide-react"
import HeaderData from "./HeaderData"

const Settings = () => {
  return (
    <div className="text-gray-800">
            <HeaderData
        title="Manage your Account"
        description="Manage your profile, endpoint and other things of your account."
        icon={SettingsIcon}
        iconColor="text-red-400"
        bgColor="bg-red-100"
      />
    </div>
  )
}

export default Settings