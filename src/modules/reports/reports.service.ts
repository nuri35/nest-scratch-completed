import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entity/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../users/entity/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  async create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto as unknown as Report);
    report.user = user;
    const res = await this.repo.save(report);
    return res;
  }
}

// this.repo  <--  Report this is note for me bunu bırde ılgılı get ıstegınde yap kısı logın olmus o kısnın userId sı ıle ılgılı reportları getırebılsın
//   .createQueryBuilder()
//   .relation(Report, 'user')
