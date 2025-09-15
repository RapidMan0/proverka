export class Location {
  id: number;
  name: string;
  description?: string;

  constructor(partial: Partial<Location>) {
    Object.assign(this, partial);
  }
}
