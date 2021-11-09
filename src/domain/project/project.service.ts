import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project } from "src/entities/project.schema";
import { User } from "src/entities/user.schema";
import { CreateProjectDto } from "./dto/createProject.dto";
import { EditProjectDto } from "./dto/edtiProject.dto";

@Injectable()
export class ProjectService {
	constructor(
		@InjectModel("User")
		private readonly userModel: Model<User>,

		@InjectModel("Project")
		private readonly projectModel: Model<Project>
	) {}
	// 프로젝트 생성
	async createProject(loginUser, createProjectDto: CreateProjectDto) {
		const findUser = await this.userModel.findOne({
			userId: loginUser.userId
		});
		const project: Project = new Project();
		project.projectName = createProjectDto.projectName;
		project.userId = findUser.userId;

		return new this.projectModel(project).save();
	}

	// 프로젝트 편집
	async editProject(
		loginUser,
		projectId: string,
		editProjectDto: EditProjectDto
	) {
		const project = await this.projectModel.findOne({
			_id: projectId
		});

		if (project.userId != loginUser.userId) throw new Error();

		project.projectName = editProjectDto.projectName;
		project.updateDt = new Date();
		return new this.projectModel(project).save();
	}
}
