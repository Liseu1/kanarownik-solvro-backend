export class CreateUserDto {
  githubId: number;
  username: string;
  name: string;
  lastName: string;
  role: string; // participant/reviewer
  assignedReviewer: number;
  isActive: boolean;
}
