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
        "child": [
            {
                "name": "All schedule",
                "path": "/admin/schedule"
            },
            {
                "name": "Register",
                "path": "admin/schedule/register"
            }
        ],
        "mobileOnly": false
    },
    {
        "name": "Team",
        "path": null,
        "judgementActive": "team",
        "icon": <BiPaste />,
        "child": [
            {
                "name": "All team",
                "path": "/admin/team"
            },
            {
                "name": "Team register",
                "path": "/admin/team/register"
            },
        ],
        "mobileOnly": false
    },
    {
        "name": "Game",
        "path": null,
        "judgementActive": "game",
        "icon": <BiPlayCircle />,
        "child": [
            {
                "name": "All game",
                "path": "/admin/game"
            },
            {
                "name": "Register",
                "path": "/admin/game/register"
            }
        ],
        "mobileOnly": false
    },
    {
        "name": "Training",
        "path": null,
        "judgementActive": "training",
        "icon": <BiBookBookmark />,
        "child": [
            {
                "name": "All training",
                "path": "/admin/training"
            },
            {
                "name": "Register",
                "path": "/admin/training/register"
            }
        ],
        "mobileOnly": false
    },
    {
        "name": "Chat",
        "path": null,
        "judgementActive": "chat",
        "icon": <BiChat />,
        "child": [
            {
                "name": "All chat",
                "path": "/admin/chat"
            }            
        ],
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

