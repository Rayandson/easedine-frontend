export type RestaurantBody = {
  name: string;
  profileName: string;
  picture: string;
  cnpj: string;
  cover: string;
  themeColor: string;
  fontColor: string;
};

export type RestaurantResponse = {
  id: number;
  name: string;
  profileName: string;
  picture: string;
  cnpj: string;
  cover: string;
  themeColor: string;
  fontColor: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  restaurantCategories: {
    id: number;
    name: string;
    image: string;
  }[];
};

export type RestaurantInfo = {
  restaurantInfo: {
    id: number;
    name: string;
    profileName: string;
    picture: string;
    cnpj: string;
    cover: string;
    themeColor: string;
    fontColor: string;
    rating: number;
    address: {
      id: number;
      street: string;
      cep: string;
      city: string;
      country: string;
      neighborhood: string;
      number: string;
      restaurantId: number;
      state: string;
    };
    itemCategories: {
      id: number;
      name: string;
      items: {
        id: number;
        categoryId: number;
        description: string;
        type: string;
        image: string | null;
        itHasSubItems: boolean;
        itemName: string;
        orderCount: number;
        price: number | null;
        rating: number;
        restaurantId: number;
        SubItem:
          | []
          | {
              id: number;
              name: string;
              price: number;
              image: string | null;
              description: string;
              type: string;
              rating: number;
              orderCount: number;
              itemId: number;
              restaurantId: number;
              categoryId: number;
            }[];
      }[];
    }[];
    tables: {
      id: number;
      number: number;
    }[];
  };
  mostOrdered: {
    id: number;
    categoryId: number;
    description: string;
    type: string;
    image: string;
    itHasSubItems: false;
    itemName: string;
    orderCount: number;
    price: number;
    rating: number;
    restaurantId: number;
  }[];
};

export type MenuItemType = {
  id: number;
  categoryId: number;
  description: string;
  type: string;
  image: string | null;
  itHasSubItems: boolean;
  itemName: string;
  orderCount: number;
  price: number | null;
  rating: number;
  restaurantId: number;
  SubItem?:
    | []
    | {
        id: number;
        name: string;
        price: number;
        image: string | null;
        description: string;
        type: string;
        rating: number;
        orderCount: number;
        itemId: number;
        restaurantId: number;
        categoryId: number;
      }[];
};

export type MostOrdered = {
  id: number;
  categoryId: number;
  description: string;
  type: string;
  image: string;
  itHasSubItems: false;
  itemName: string;
  orderCount: number;
  price: number;
  rating: number;
  restaurantId: number;
}[];

export type OrderBody = {
  orderInfo: {
    userName?: string;
    userCpf?: string;
    total: number | undefined;
    userId?: number;
    restaurantId: number | undefined;
    tableId: number | undefined;
  },
  items: {
    itemId: number | undefined,
    quantity: number | undefined
  }[] | undefined
}

export type OrderResponse = {
  id: number;
  userName: string | null;
  userCpf: string | null;
  total: number;
  status: string;
  userId: number | null;
  restaurantId: number;
  tableId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type signUpBody = {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  password: string;
}

export type signInBody = {
  email: string;
  password: string
}