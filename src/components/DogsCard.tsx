import { Dog } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bone, Heart } from "lucide-react";
import useAuthStore from "@/state/store";
import { v4 as uuidv4 } from "uuid";

interface DogCardProps {
  dogs: Dog[];
}

const DogsCard = ({ dogs }: DogCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useAuthStore();

  const toggleFavorite = (dog: Dog) => {
    if (favorites.includes(dog.id)) {
      removeFavorite(dog.id);
    } else {
      addFavorite(dog);
    }
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {dogs.map((dog) => (
        <Card
          key={uuidv4()}
          className="cursor-pointer overflow-hidden transition-all hover:shadow-xl rounded-3xl border-4 border-accent/30 hover:border-accent/50 hover:-translate-y-1 duration-300 md:w-72 xl:w-96 pt-0"
        >
          <div className="relative h-56 overflow-hidden">
            <img src={dog.img} alt={dog.breed} className="w-full h-full object-cover" />
            <Button
              variant="ghost"
              className={`absolute top-3 right-3 rounded-full bg-white shadow-lg ${
                favorites.includes(dog.id) ? "text-destructive" : "text-muted-foreground"
              }`}
              onClick={() => toggleFavorite(dog)}
            >
              <Heart className={favorites.includes(dog.id) ? "fill-current" : ""} size={20} />
            </Button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <h2 className="text-xl font-bold text-white">{dog.name}</h2>
            </div>
          </div>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Bone className="h-4 w-4 text-primary" />
              <p className="font-medium text-foreground text-lg">{dog.breed}</p>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className="px-3 py-1 text-lg">Age: {dog.age}</span>
              <span className="px-3 py-1 text-lg">ZIP: {dog.zip_code}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default DogsCard;
