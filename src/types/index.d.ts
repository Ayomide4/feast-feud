interface User {
  userId: string;
  email: string;
  passwordHash: string;
  profileImg: string;
  dish: Dish;
}

interface Dish {
  id: string;
  dishId: string;
  dishName: string;
  category: string;
  user: User | undefined; //partial user, has name, profile img,
  reviews: Review[];
  profileImg: ImageSourcePropType;
  dishImage: ImageSourcePropType;
}

interface Review {
  starRating: number;
  message: string;
  dish: Dish;
}

interface Party {
  hostId: string;
  partyId: string;
  dishes: Dish[];
  endTime: Timestamp; //when the party ends
}
