export interface AddressComponent {
        long_name: string;
        short_name: string;
        types: string[];
    }

    export interface Location {
        lat: number;
        lng: number;
    }

    export interface Viewport {
        south: number;
        west: number;
        north: number;
        east: number;
    }

    export interface Geometry {
        location: Location;
        viewport: Viewport;
    }

    export interface PlusCode {
        compound_code: string;
        global_code: string;
    }

    export interface GooglePlace {
        address_components: AddressComponent[];
        adr_address: string;
        formatted_address: string;
        geometry: Geometry;
        icon: string;
        icon_background_color: string;
        icon_mask_base_uri: string;
        name: string;
        place_id: string;
        plus_code: PlusCode;
        reference: string;
        types: string[];
        url: string;
        utc_offset: number;
        vicinity: string;
        html_attributions: any[];
        utc_offset_minutes: number;
    }

