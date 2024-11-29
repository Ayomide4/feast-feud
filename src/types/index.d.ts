interface User {
  userId: string;
  email: string;
  passwordHash: string;
  profileImg: string;
  dish: Dish;
}

interface Dish {
  dishId: string;
  dishName: string;
  category: string;
  user: User | undefined; //partial user, has name, profile img,
  images: string[];
  reviews: Review[];
  profileImg: ImageSourcePropType;
  dishImg: ImageSourcePropType;
}

interface Review {
  starRating: number;
  message: string;
  // userId: string; //anon user who sent it
}

interface Party {
  hostId: string;
  partyId: string;
  dishes: Dish[];
  endTime: Timestamp; //when the party ends
}
