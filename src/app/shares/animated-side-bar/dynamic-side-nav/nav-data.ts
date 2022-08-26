import { INavData } from "./side-nav-data";

export const navData: INavData[] = [
    {
        routerLink: "/home",
        icon: "fal fa-home",
        label: "Dashboard"
    },
    {
        routerLink: "/home/tasks",
        icon: "fas fa-tasks",
        label: "Tasks",
        items: [
            {
                routerLink: '/home/tasks/completed',
                label: 'Completed',
            },
            {   routerLink: '/home/tasks/in-progress',
                label: 'In progress',
            },
        ]
    },
    {
        routerLink: "/home/approval-requests",
        icon: "fas fa-chalkboard-teacher",
        label: "Approval requests",
        items: [
            {
                routerLink: '/home/approval-requests/recalled',
                label: 'Recalled',
                items: [
                    {
                        routerLink: '/home/todos/completed',
                        label: 'In progress',
                    },
                    {
                        routerLink: '/home/todos/in-progress',
                        label: 'In progress',
                    },
                ]
            },
            {
                routerLink: '/home/approval-requests/reviewed',
                label: 'Reviewed',
                items: [
                    {
                        routerLink: '/home/todos/completed',
                        label: 'In progress',
                    },
                    {
                        routerLink: '/home/todos/in-progress',
                        label: 'In progress',
                    },
                ]
            },
        ]
    },
    {
        routerLink: "/home/todos",
        icon: "fas fa-clipboard-list-check",
        label: "Todos",
        items: [
            {
                routerLink: '/home/todos/completed',
                label: 'In progress',
            },
            {
                routerLink: '/home/todos/in-progress',
                label: 'In progress',
                items: [
                    {
                        routerLink: '/home/todos/completed',
                        label: 'In progress',
                    },
                    {
                        routerLink: '/home/todos/in-progress',
                        label: 'In progress',
                        items: [
                            {
                                routerLink: '/home/todos/completed',
                                label: 'In progress',
                            },
                            {
                                routerLink: '/home/todos/in-progress',
                                label: 'In progress',
                            },
                        ]
                    },
                    
                ]
            },
        ]
    }

    
]

