import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Project, ProjectSchema } from "src/entities/project.schema";
import { User, UserSchema } from "src/entities/user.schema";
import { AuthModule } from "../auth/auth.module";
import { ProjectModule } from "../project/project.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Project.name, schema: ProjectSchema }
		]),
		AuthModule,
		ProjectModule
	],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
