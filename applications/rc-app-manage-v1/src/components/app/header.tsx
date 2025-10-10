import React, {useState} from "react"
import { TbSquareToggle } from "react-icons/tb";
import { RiLogoutCircleLine } from "react-icons/ri";
import { ImSpinner8 } from "react-icons/im";
import { IoMdCloudOutline } from "react-icons/io";
import { useAuthStore } from "@/store";
import { useDataStore } from "@/store/data.store";

interface HeaderProps {
  onToggleSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [isUpdate, seIsUpdate] = useState(false);
  const {logout, user} = useAuthStore();
  const {update} = useDataStore();

  const hanfleUpdate = async () => {
    seIsUpdate(true)
    await update()

    setTimeout(() => {
      seIsUpdate(false)
    }, 1500);
  }

  return (
    <header className="header">
      <button className="menu-btn" onClick={onToggleSidebar}>
        <TbSquareToggle />
      </button>
      <h1>Bienvenido, {user?.username}</h1>
      <button className="logout" type="button" onClick={() => logout()}>
        <RiLogoutCircleLine />
        Salir
      </button>
      <button className={`updated ${isUpdate ? 'on' : ''}`} type="button" onClick={() => hanfleUpdate()}>
        {
          isUpdate ? <ImSpinner8/> : <IoMdCloudOutline />
        }
      </button>
    </header>
  )
}

export default Header
