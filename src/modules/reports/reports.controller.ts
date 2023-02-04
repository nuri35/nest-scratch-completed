import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }

  @Get()
  findAll() {
    return 'This action returns all reports';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} report`;
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return `This action updates a #${id} report`;
  }
}
