export interface Beer {
  id: number;
  name: string;
  description: string;
  abv: number;
  image_url: string;
  favourite?: boolean;
}

export interface BeerDetails extends Beer {
  [key: string]: any;
}

export const beerMapper = (beerDetails: BeerDetails): Beer => {
  const { id, name, description, abv, image_url } = beerDetails;
  return { id, name, description, abv, image_url, favourite: false };
};
