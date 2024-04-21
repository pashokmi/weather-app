export interface IUser {
    uid: string;
    email: string|null;
    emailVerified?: boolean;
    displayName: string;
    isAnonymous?: boolean;
    photoURL?: string;
    providerData?: {
        providerId: string;
        uid: string;
        displayName: string;
        email: string;
        phoneNumber: string | null;
        photoURL: string;
    }[];
    stsTokenManager?: {
        refreshToken: string;
        accessToken: string;
        expirationTime: number;
    };
    createdAt?: string;
    lastLoginAt?: string;
    apiKey?: string;
    appName?: string;
}

export interface CityData {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    rain?: {
        "1h": number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
