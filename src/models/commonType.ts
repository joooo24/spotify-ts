export interface ExternalUrls {
    spotify: string;
}

export interface Image {
    height: number;
    url: string;
    width: number;
}

export interface Restriction {
    reason?: string;
}

export interface Followers {
    href: string | undefined;
    total: number;
}

export interface ExplicitContent {
    filter_enabled: boolean;
    filter_locked: boolean;
}

export interface Owner {
    display_name?: string;
    external_urls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    images?: Image[];
    type?: string;
    uri?: string;
}
