import { SavePurchases } from "@/domain/usecases/save-purchases";
import Chance from "chance";

const chance = new Chance();

export const mockPurchases = (): SavePurchases.Params[] => [
  {
    id: chance.integer().toString(),
    date: new Date(),
    value: chance.integer({ min: 10 }),
  },
  {
    id: chance.integer().toString(),
    date: new Date(),
    value: chance.integer({ min: 10 }),
  },
];
