export type Product = {
    status: string;
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    age?: string;
    description?: string;
    date?: Date;
    created_at: Date;
    updated_at: Date;
    nik?: number;
    religion?: string;
    rt?: number;
    rw?: number;
    stock?: [
        {
            size: string;
            qty: number;
        },
    ]
}