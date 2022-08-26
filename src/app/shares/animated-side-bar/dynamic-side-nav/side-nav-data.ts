export interface INavData{
    routerLink: string;
    icon?: string;
    label?: string;
    expanded?: boolean;
    items?: INavData[];
}