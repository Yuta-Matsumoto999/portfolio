import { BiCategory, BiSpreadsheet, BiPaste, BiGrid, BiPlayCircle, BiBookBookmark, BiChat, BiCog, BiLogOut, BiCaretRight } from "react-icons/bi";

const menuItems = [
    {
        "name": "Dashboard",
        "path": "/admin",
        "judgementActive": undefined,
        "child": null,
        "icon": <BiCategory />,
        "mobileOnly": false
    },
    {
        "name": "Schedule",
        "path": null,
        "judgementActive": "schedule",
        "icon": <BiGrid />,
        "mobileOnly": false
    },
    {
        "name": "Member",
        "path": "/admin/member",
        "judgementActive": "member",
        "icon": <BiPaste />,
        "mobileOnly": false
    },
    {
        "name": "Game",
        "path": "/admin/game",
        "judgementActive": "game",
        "icon": <BiPlayCircle />,
        "mobileOnly": false
    },
    {
        "name": "Training",
        "path": "/admin/training",
        "judgementActive": "training",
        "icon": <BiBookBookmark />,
        "mobileOnly": false
    },
    {
        "name": "Chat",
        "path": "/admin/chat    ",
        "judgementActive": "chat",
        "icon": <BiChat />,
        "mobileOnly": false
    },
    {
        "name": "Settings",
        "path": null,
        "judgementActive": "settings",
        "icon": <BiCog />,
        "child": [
            {
                "name": "Organization",
                "path": "/admin/settings/organization"
            },
            {
                "name": "Permission",
                "path": "/admin/settings/permission"
            },
            {
                "name": "Role",
                "path": "/admin/settings/role"
            }
        ],
        "mobileOnly": false
    },
    {
        "name": "User setting",
        "path": null,
        "judgementActive": "user",
        "icon": null,
        "child": [
            {
                "name": "Your profile",
                "path": "/admin/user/profile"
            },
            {
                "name": "Edit Password",
                "path": "/admin/user/edit/password"
            }
        ],
        "mobileOnly": true,
        "type": "auth"
    }
]

export default menuItems

