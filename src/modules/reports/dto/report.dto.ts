import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/entity/user.entity';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: number;

  @Transform(({ obj }) => {
    if (obj['user']) {
      return { id: obj['user'].id, email: obj['user'].email };
    }
  })
  @Expose()
  userData: any;
}
