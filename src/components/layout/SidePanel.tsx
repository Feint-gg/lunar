import { Link } from "react-router-dom";


interface Props {
    children: React.ReactNode;
}

const routes = [
    {
        name: "In Game",
        routes: [
            {
                name: "Champ Select",
                path: "/game/champ-select",
            },
            {
                name: "Champion",
                path: "/game/champion",
            },
            {
                name: "In Game",
                path: "/game/in-game",
            }
        ]
    },
    {
        
    }
]

export default function SidePanel({ children }: Props) {
    return (
        <div className="flex gap-5">
            <div style={{ height: "528px" }} className="w-40" />
            <div className="side-panel">
                {routes.map((route) => (
                    <div key={route.name}>
                        <div className="text-lg">{route.name}</div>
                        <div className="text-mute text pl-3 flex flex-col">
                            {route.routes?.map((route) => (
                                <Link to={route.path}>
                                    <a key={route.name}>
                                        {route.name}
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <main className="content">
                {children}
            </main>
        </div>
    )
}