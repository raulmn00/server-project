import { Injectable } from '@nestjs/common';
import { CreateAttendanceListDto } from './dto/create-attendance-list.dto';
import { UpdateAttendanceListDto } from './dto/update-attendance-list.dto';
import { AttendanceList } from './entities/attendance-list.entity';
import { ClassroomService } from 'src/classroom/classroom.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AttendanceListService {
    private _attendanceList: AttendanceList[] = [];
    constructor(private readonly classroomService: ClassroomService) {}

    async create(createAttendanceListDto: CreateAttendanceListDto): Promise<AttendanceList> {
        await this.classroomService.findOne(createAttendanceListDto.classroomId);
        const endDateToAttendance = 5 * 60 * 1000;
        const attendanceToday: AttendanceList = new AttendanceList();
        const formatedToday = new Date(Date.now()).toISOString().slice(0, 10);
        attendanceToday.id = randomUUID();
        attendanceToday.startDate = new Date(Date.now());
        attendanceToday.endDate = new Date(Date.now() + endDateToAttendance);
        attendanceToday.students = [];
        attendanceToday.day = formatedToday;
        this._attendanceList.push(attendanceToday);
        return Promise.resolve(attendanceToday);
    }

    async findAll() {
        return `This action returns all attendanceList`;
    }

    async findOne(id: number) {
        return `This action returns a #${id} attendanceList`;
    }

    async update(id: number, updateAttendanceListDto: UpdateAttendanceListDto) {
        return `This action updates a #${id} attendanceList`;
    }

    async remove(id: number) {
        return `This action removes a #${id} attendanceList`;
    }
}
