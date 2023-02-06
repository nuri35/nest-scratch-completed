import { Injectable, NotFoundException } from '@nestjs/common';
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

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOneBy({ id, approved: !approved });
    console.log(report);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}

// this.repo  <--  Report this is note for me to remember
//   .createQueryBuilder()
//   .relation(Report, 'user')
