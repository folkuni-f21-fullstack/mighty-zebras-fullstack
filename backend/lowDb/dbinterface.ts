
export type Schema= {
    users: User[] ; 
    orders: Order[] ;
    menu: MenuItem[] ;
}

export type MenuItem = {
    name: string;
    desc: string;
    price: number;
    allergies: string;
    type: string;
}

export type CartItems = {
    name: string;
    price: number;
    amount: number;
}

export type CartProps = {
    cartItems: CartItems[];
    totalPrice: number;
}

export type User  = {
    name: string;
    email: string;
    accountId: string;
    phoneNumber: string;
    admin?: boolean;
    password: string;
}
export type LoginCreds = {
    name: string;
    password: string;
}

export type Guest = {
    name: string;
    email: string;
    phoneNumber: string
}

export type Order = {
    cart: CartProps;
    user: User;
    userComment?: string;
    adminComment?: string;
    locked?: boolean;
    completed?: boolean;
    orderPlaced?: string;
    orderCompleted?: string
    id?: string;
}

type defaultDictionaries = 'number' | 'alpha' | 'alpha_lower' | 'alpha_upper' | 'alphanum' | 'alphanum_lower' | 'alphanum_upper';

export type ShortUniqueIdOptions = {
    dictionary: string[] | defaultDictionaries;
    length: number;
  };
